import {Entity, model, property} from '@loopback/repository';

@model()
export class Mapinfo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  mapname: string;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  sidolist: object[];


  constructor(data?: Partial<Mapinfo>) {
    super(data);
  }
}

export interface MapinfoRelations {
  // describe navigational properties here
}

export type MapinfoWithRelations = Mapinfo & MapinfoRelations;
