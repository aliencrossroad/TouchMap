import {DefaultCrudRepository} from '@loopback/repository';
import {Sidolist, SidolistRelations} from '../models';
import {SidolistDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SidolistRepository extends DefaultCrudRepository<
  Sidolist,
  typeof Sidolist.prototype.id,
  SidolistRelations
> {
  constructor(
    @inject('datasources.sidolist') dataSource: SidolistDataSource,
  ) {
    super(Sidolist, dataSource);
  }
}
