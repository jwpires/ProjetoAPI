import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { marcaProviders } from './marca.providers';
import { MarcaService } from './marca.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...marcaProviders,
    MarcaService,
  ],
})
export class MarcaModule {}