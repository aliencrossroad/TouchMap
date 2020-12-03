import {Entity, model, property} from '@loopback/repository';

@model()
export class Sidomap extends Entity {
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
  sidoname: string;

  @property({
    type: 'number',
    required: true,
  })
  zoomlevel: number;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  cameralist: object[];


  constructor(data?: Partial<Sidomap>) {
    super(data);
  }
}

export interface SidomapRelations {
  // describe navigational properties here
}

export type SidomapWithRelations = Sidomap & SidomapRelations;
