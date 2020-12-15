import {DefaultCrudRepository} from '@loopback/repository';
import {Cameralistset, CameralistsetRelations} from '../models';
import {CameralistDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CameralistsetRepository extends DefaultCrudRepository<
  Cameralistset,
  typeof Cameralistset.prototype.id,
  CameralistsetRelations
> {
  constructor(
    @inject('datasources.cameralist') dataSource: CameralistDataSource,
  ) {
    super(Cameralistset, dataSource);
  }
}
