import {DefaultCrudRepository} from '@loopback/repository';
import {Mapinfo, MapinfoRelations} from '../models';
import {SaveonairDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SaveonairRepository extends DefaultCrudRepository<
  Mapinfo,
  typeof Mapinfo.prototype.id,
  MapinfoRelations
> {
  constructor(
    @inject('datasources.saveonair') dataSource: SaveonairDataSource,
  ) {
    super(Mapinfo, dataSource);
  }
}
