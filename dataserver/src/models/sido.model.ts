import {Entity, model, property} from '@loopback/repository';

@model()
export class Sido extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  sidoname: number;

  @property({
    type: 'number',
    required: true,
  })
  zoomlevel: number;


  constructor(data?: Partial<Sido>) {
    super(data);
  }
}

export interface SidoRelations {
  // describe navigational properties here
}

export type SidoWithRelations = Sido & SidoRelations;
