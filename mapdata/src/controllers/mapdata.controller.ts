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
import {Mapinfo} from '../models';
import {MapinfoRepository} from '../repositories';

export class MapdataController {
  constructor(
    @repository(MapinfoRepository)
    public mapinfoRepository : MapinfoRepository,
  ) {}

  @post('/mapinfos', {
    responses: {
      '200': {
        description: 'Mapinfo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mapinfo)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mapinfo, {
            title: 'NewMapinfo',
            exclude: ['id'],
          }),
        },
      },
    })
    mapinfo: Omit<Mapinfo, 'id'>,
  ): Promise<Mapinfo> {
    return this.mapinfoRepository.create(mapinfo);
  }

  @get('/mapinfos/count', {
    responses: {
      '200': {
        description: 'Mapinfo model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Mapinfo) where?: Where<Mapinfo>,
  ): Promise<Count> {
    return this.mapinfoRepository.count(where);
  }

  @get('/mapinfos', {
    responses: {
      '200': {
        description: 'Array of Mapinfo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Mapinfo, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Mapinfo) filter?: Filter<Mapinfo>,
  ): Promise<Mapinfo[]> {
    return this.mapinfoRepository.find(filter);
  }

  @patch('/mapinfos', {
    responses: {
      '200': {
        description: 'Mapinfo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mapinfo, {partial: true}),
        },
      },
    })
    mapinfo: Mapinfo,
    @param.where(Mapinfo) where?: Where<Mapinfo>,
  ): Promise<Count> {
    return this.mapinfoRepository.updateAll(mapinfo, where);
  }

  @get('/mapinfos/{id}', {
    responses: {
      '200': {
        description: 'Mapinfo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Mapinfo, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Mapinfo, {exclude: 'where'}) filter?: FilterExcludingWhere<Mapinfo>
  ): Promise<Mapinfo> {
    return this.mapinfoRepository.findById(id, filter);
  }

  @patch('/mapinfos/{id}', {
    responses: {
      '204': {
        description: 'Mapinfo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mapinfo, {partial: true}),
        },
      },
    })
    mapinfo: Mapinfo,
  ): Promise<void> {
    await this.mapinfoRepository.updateById(id, mapinfo);
  }

  @put('/mapinfos/{id}', {
    responses: {
      '204': {
        description: 'Mapinfo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() mapinfo: Mapinfo,
  ): Promise<void> {
    await this.mapinfoRepository.replaceById(id, mapinfo);
  }

  @del('/mapinfos/{id}', {
    responses: {
      '204': {
        description: 'Mapinfo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.mapinfoRepository.deleteById(id);
  }
}
