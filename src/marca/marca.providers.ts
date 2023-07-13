import { DataSource } from 'typeorm';
import { Marca } from './marca.entity';

export const marcaProviders = [
  {
    provide: 'MARCA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Marca),
    inject: ['DATA_SOURCE'],
  },
];