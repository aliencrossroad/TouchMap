import {Entity, model, property} from '@loopback/repository';

@model()
export class Camera extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  url?: string;

  @property({
    type: 'number',
    required: true,
  })
  lan: number;

  @property({
    type: 'number',
    required: true,
  })
  lon: number;

  @property({
    type: 'boolean',
    required: true,
  })
  visible: boolean;


  constructor(data?: Partial<Camera>) {
    super(data);
  }
}

export interface CameraRelations {
  // describe navigational properties here
}

export type CameraWithRelations = Camera & CameraRelations;
