import {Entity, model, property} from '@loopback/repository';

@model()
export class Sidolist extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  sidolist: object[];


  constructor(data?: Partial<Sidolist>) {
    super(data);
  }
}

export interface SidolistRelations {
  // describe navigational properties here
}

export type SidolistWithRelations = Sidolist & SidolistRelations;
