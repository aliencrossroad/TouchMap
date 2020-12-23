import {Entity, model, property} from '@loopback/repository';

@model()
export class Cameralist extends Entity {
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
  name: string;

  @property({
    type: 'array',
    itemType: 'object',
    required: false,
  })
  cameralist: object[];


  constructor(data?: Partial<Cameralist>) {
    super(data);
  }
}

export interface CameralistRelations {
  // describe navigational properties here
}

export type CameralistWithRelations = Cameralist & CameralistRelations;
