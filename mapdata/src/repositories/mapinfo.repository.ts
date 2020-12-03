import {DefaultCrudRepository} from '@loopback/repository';
import {Mapinfo, MapinfoRelations} from '../models';
import {MapdataDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MapinfoRepository extends DefaultCrudRepository<
  Mapinfo,
  typeof Mapinfo.prototype.id,
  MapinfoRelations
> {
  constructor(
    @inject('datasources.mapdata') dataSource: MapdataDataSource,
  ) {
    super(Mapinfo, dataSource);
  }
}
