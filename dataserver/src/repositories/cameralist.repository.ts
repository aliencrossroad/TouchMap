import {DefaultCrudRepository} from '@loopback/repository';
import {Cameralist, CameralistRelations} from '../models';
import {CameralistDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CameralistRepository extends DefaultCrudRepository<
  Cameralist,
  typeof Cameralist.prototype.id,
  CameralistRelations
> {
  constructor(
    @inject('datasources.cameralist') dataSource: CameralistDataSource,
  ) {
    super(Cameralist, dataSource);
  }
}
