import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Cameralist} from '../models';
import {CameralistRepository} from '../repositories';

export class CameralistController {
  constructor(
    @repository(CameralistRepository)
    public cameralistRepository : CameralistRepository,
  ) {}

  @post('/cameralist', {
    responses: {
      '200': {
        description: 'Cameralist model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cameralist)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cameralist, {
            title: 'NewCameralist',
            exclude: ['id'],
          }),
        },
      },
    })
    cameralist: Omit<Cameralist, 'id'>,
  ): Promise<Cameralist> {
    return this.cameralistRepository.create(cameralist);
  }

  @get('/cameralist/count', {
    responses: {
      '200': {
        description: 'Cameralist model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Cameralist) where?: Where<Cameralist>,
  ): Promise<Count> {
    return this.cameralistRepository.count(where);
  }

  @get('/cameralist', {
    responses: {
      '200': {
        description: 'Array of Cameralist model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Cameralist, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Cameralist) filter?: Filter<Cameralist>,
  ): Promise<Cameralist[]> {
    return this.cameralistRepository.find(filter);
  }

  @patch('/cameralist', {
    responses: {
      '200': {
        description: 'Cameralist PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cameralist, {partial: true}),
        },
      },
    })
    cameralist: Cameralist,
    @param.where(Cameralist) where?: Where<Cameralist>,
  ): Promise<Count> {
    return this.cameralistRepository.updateAll(cameralist, where);
  }

  @get('/cameralist/{id}', {
    responses: {
      '200': {
        description: 'Cameralist model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cameralist, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Cameralist, {exclude: 'where'}) filter?: FilterExcludingWhere<Cameralist>
  ): Promise<Cameralist> {
    return this.cameralistRepository.findById(id, filter);
  }

  @patch('/cameralist/{id}', {
    responses: {
      '204': {
        description: 'Cameralist PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cameralist, {partial: true}),
        },
      },
    })
    cameralist: Cameralist,
  ): Promise<void> {
    await this.cameralistRepository.updateById(id, cameralist);
  }

  @put('/cameralist/{id}', {
    responses: {
      '204': {
        description: 'Cameralist PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cameralist: Cameralist,
  ): Promise<void> {
    await this.cameralistRepository.replaceById(id, cameralist);
  }

  @del('/cameralist/{id}', {
    responses: {
      '204': {
        description: 'Cameralist DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.cameralistRepository.deleteById(id);
  }
}
