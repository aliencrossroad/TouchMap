import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'cameralist',
  connector: 'memory',
  localStorage: 'cameralist',
  file: '/data/cameralist.json'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class CameralistDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'cameralist';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.cameralist', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
