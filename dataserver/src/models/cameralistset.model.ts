import {Entity, model, property} from '@loopback/repository';

@model()
export class Cameralistset extends Entity {
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
  cameralistset: object[];


  constructor(data?: Partial<Cameralistset>) {
    super(data);
  }
}

export interface CameralistsetRelations {
  // describe navigational properties here
}

export type CameralistsetWithRelations = Cameralistset & CameralistsetRelations;
