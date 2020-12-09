import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'saveonair',
  connector: 'memory',
  localStorage: 'onairmapinfo',
  file: 'OnAirMapInfo.json'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class SaveonairDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'saveonair';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.saveonair', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
