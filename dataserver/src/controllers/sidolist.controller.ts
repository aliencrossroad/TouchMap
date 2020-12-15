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
import {Sidolist} from '../models';
import {SidolistRepository} from '../repositories';

export class SidolistController {
  constructor(
    @repository(SidolistRepository)
    public sidolistRepository : SidolistRepository,
  ) {}

  @post('/sidolist', {
    responses: {
      '200': {
        description: 'Sidolist model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sidolist)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sidolist, {
            title: 'NewSidolist',
            exclude: ['id'],
          }),
        },
      },
    })
    sidolist: Omit<Sidolist, 'id'>,
  ): Promise<Sidolist> {
    return this.sidolistRepository.create(sidolist);
  }

  @get('/sidolist/count', {
    responses: {
      '200': {
        description: 'Sidolist model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Sidolist) where?: Where<Sidolist>,
  ): Promise<Count> {
    return this.sidolistRepository.count(where);
  }

  @get('/sidolist', {
    responses: {
      '200': {
        description: 'Array of Sidolist model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Sidolist, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Sidolist) filter?: Filter<Sidolist>,
  ): Promise<Sidolist[]> {
    return this.sidolistRepository.find(filter);
  }

  @patch('/sidolist', {
    responses: {
      '200': {
        description: 'Sidolist PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sidolist, {partial: true}),
        },
      },
    })
    sidolist: Sidolist,
    @param.where(Sidolist) where?: Where<Sidolist>,
  ): Promise<Count> {
    return this.sidolistRepository.updateAll(sidolist, where);
  }

  @get('/sidolist/{id}', {
    responses: {
      '200': {
        description: 'Sidolist model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Sidolist, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Sidolist, {exclude: 'where'}) filter?: FilterExcludingWhere<Sidolist>
  ): Promise<Sidolist> {
    return this.sidolistRepository.findById(id, filter);
  }

  @patch('/sidolist/{id}', {
    responses: {
      '204': {
        description: 'Sidolist PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sidolist, {partial: true}),
        },
      },
    })
    sidolist: Sidolist,
  ): Promise<void> {
    await this.sidolistRepository.updateById(id, sidolist);
  }

  @put('/sidolist/{id}', {
    responses: {
      '204': {
        description: 'Sidolist PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() sidolist: Sidolist,
  ): Promise<void> {
    await this.sidolistRepository.replaceById(id, sidolist);
  }

  @del('/sidolist/{id}', {
    responses: {
      '204': {
        description: 'Sidolist DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.sidolistRepository.deleteById(id);
  }
}
