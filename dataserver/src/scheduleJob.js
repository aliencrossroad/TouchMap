import schedule from 'node-schedule';
import axios from 'axios';
import convert from  'fast-xml-parser';
import merge from  'deepmerge';
import fs from 'fs';
import { logger } from './wloggger';
import appRoot from 'app-root-path';

//도로공사 API를 호출하여 최신 CCTV 스트리밍 url로 갱신
function ScheduleStart(){

  let sidoDic = {
    "서울" : "서울특별시",
    "경기" : "경기도",
    "강원" : "강원도",
    "경남" : "경상남도",
    "경북" : "경상북도",
    "광주" : "광주광역시",
    "대구" : "대구광역시",
    "대전" : "대전광역시",
    "부산" : "부산광역시",
    "울산" : "울산광역시",
    "인천" : "인천광역시",
    "전남" : "전라남도",
    "전북" : "전라북도",
    "제주" : "제주특별자치도",
    "충남" : "충청남도",
    "충북" : "충청북도",
    "세종" : "세종특별자치시",
    
    "서울시" : "서울특별시",
    "광주시" : "광주광역시",
    "대구시" : "대구광역시",
    "대전시" : "대전광역시",
    "부산시" : "부산광역시",
    "울산시" : "울산광역시",
    "인천시" : "인천광역시",
    "제주도" : "제주특별자치도",
    "세종시" : "세종특별자치시",
    
    "서울특별시" : "서울특별시",
    "경기도" : "경기도",
    "강원도" : "강원도",
    "경상남도" : "경상남도",
    "경상북도" : "경상북도",
    "광주광역시" : "광주광역시",
    "대구광역시" : "대구광역시",
    "대전광역시" : "대전광역시",
    "부산광역시" : "부산광역시",
    "울산광역시" : "울산광역시",
    "인천광역시" : "인천광역시",
    "전라남도" : "전라남도",
    "전라북도" : "전라북도",
    "제주특별자치도" : "제주특별자치도",
    "충청남도" : "충청남도",
    "충청북도" : "충청북도",
    "세종특별자치시" : "세종특별자치시"
  };

  //스케줄러를 시작한다.
  const scheduled = schedule.scheduleJob(process.env.OPENAPI_SCHEDULEJOB, async () => {
  
    let status = 0;

    const openAPIFilePath = `${appRoot}${process.env.OPENAPI_FILE_PATH}`;
    const openAPIUrlits = process.env.OPENAPI_URL_ITS;
    const openAPIUrlex = process.env.OPENAPI_URL_EX;
    const kakaoAPI_coord2regioncode = process.env.KAKAOAPI_COORD2REGIONCODE;
    const kakaoAPI_REST_KEY = process.env.KAKAOAPI_REST_KEY;
    const openAPIRetryCount = process.env.OPENAPI_RETRY;

    logger.info("Start CCTV Scheduling");

    let data;
    let data1;
    let data2;
    let dataList = new Array();
    let axiosTimeout = {
      timeout : 1000 * 60 * 40
    }

    //도로공사 국도 데이터 
    for(let i=1;i<=openAPIRetryCount;i++) {
      status = await axios.get(openAPIUrlits, axiosTimeout)
                .then(async (response) => {
                    data1 = response.data;
                    return response.status;
                })
                .catch((error) => {
                    return error.message;
                });

      if( status == 200 ) {
        break;
      } else {
        logger.error(`CCTV Scheduling openAPIUrlits ${status}`);
        if( i == openAPIRetryCount){
          return;
        }
      }
    }

    //도로공사 고속도로 데이터
    for(let i=1;i<=openAPIRetryCount;i++) {
      status = await axios.get(openAPIUrlex, axiosTimeout)
                        .then(async (response) => {
                            data2 = response.data;
                            return response.status;
                        })
                        .catch((error) => {
                            return error.message;
                        })

      if( status == 200 ) {
        break;
      } else {
        logger.error(`CCTV Scheduling openAPIUrlex ${status}`);
        if( i == openAPIRetryCount){
          return;
        }
      }
    }
    
    // 고속도로와 국도 데이터를 합친다.
    data1 = convert.parse(data1);
    data2 = convert.parse(data2);
    data = merge(data1,data2).response.data;

    //카카오 로컬 REST api로 CCTV좌표를 주소로 변환한 데이터를 가져와 업데이트한다.
    for(let i in data) {
      let newRow = {
        name: "",
        url: "",
        lan: 0,
        lon: 0,
        visible: true,
        sidocode: 1,
        sidoname: ""
      };

      newRow.name = data[i].cctvname
      newRow.url = data[i].cctvurl;
      newRow.lan = data[i].coordy;
      newRow.lon = data[i].coordx;

      let kakaoapi = `${kakaoAPI_coord2regioncode}?x=${newRow.lon}&y=${newRow.lan}`;
      status = await axios.get(kakaoapi, {headers: { "Authorization": "KakaoAK " + kakaoAPI_REST_KEY }})
                        .then(async (response) => {
                          if(response.status == 200){
                            newRow.sidoname = response.data.documents[0].region_1depth_name;
                            newRow.sidoname = sidoDic[newRow.sidoname];
                            dataList.push(newRow);
                          }
                          return response.status;
                        })
                        .catch((error) => {
                          logger.error(`CCTV Scheduling coord2regioncode ${error.message}`);
                          return error.response.status;
                        });
      if( status == 429 ) {
        //카카오 API 쿼터 소진 후 사용 제한 상태
        return;
      }
    }
  
    try {
      //파일로 저장한다.
      dataList = JSON.stringify(dataList);
      fs.writeFileSync(openAPIFilePath, dataList);
    } catch(error) {
      logger.error(`CCTV Scheduling writeFileSync ${error.message}`);
    }
    logger.info("End CCTV Scheduling");
  })
};

export default ScheduleStart;