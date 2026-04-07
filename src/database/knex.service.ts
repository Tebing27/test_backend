import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import knex, { Knex } from 'knex';
import config from './knexfile';

@Injectable()
export class KnexService implements OnModuleDestroy {
  private readonly _knex: Knex;
  private readonly logger = new Logger(KnexService.name);

  constructor() {
    this.logger.log('Initializing Knex Connection');
    this._knex = knex(config);
  }

  get connection(): Knex {
    return this._knex;
  }

  async onModuleDestroy() {
    await this._knex.destroy();
  }
}
