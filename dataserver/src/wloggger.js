import appRoot from 'app-root-path';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

const logDir = `${appRoot}/logs`;  // 디렉토리 설정
const { combine, timestamp, printf } = winston.format;

//로그 포멧 설정
const logFormat = printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */

const logger = winston.createLogger({
    format: combine(
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      logFormat,
    ),
    transports: [
      // info 레벨 로그를 저장할 파일 설정
      new winstonDaily({
        level: 'info',
        datePattern: 'YYYY-MM-DD',
        dirname: logDir,
        filename: `%DATE%.log`,
        maxsize: 10000000, //최대 10M까지 
        maxFiles: 5,  // 5개 로그 파일 저장
        zippedArchive: false,
        json: false
      }),
      // error 레벨 로그를 저장할 파일 설정
      new winstonDaily({
        level: 'error',
        datePattern: 'YYYY-MM-DD',
        dirname: logDir + '/error',  // error.log 파일은 /logs/error 저장 
        filename: `%DATE%.error.log`,
        maxsize: 10000000, //최대 10M까지
        maxFiles: 5, // 5개 로그 파일 저장
        zippedArchive: false,
        json: false
      }),
    ],
  });

// Production 환경이 아닌 경우인데...이럴 경우가 있을까...ㅎ
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),  // 색깔 넣어서 출력 이쁘당..
        winston.format.simple(),  // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
      )
    }));
}
  
export { logger };
  