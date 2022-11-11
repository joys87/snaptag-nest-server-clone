import { WorkerServerModule } from '@app/worker-server';
import { IWorkerServer } from '@app/worker-server/worker-server.interface';
import { Module } from '@nestjs/common';
import { IndustriesModule } from 'src/industries/industries.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { TeamsModule } from 'src/teams/teams.module';
import { UsersModule } from 'src/users/users.module';
import { CalculateCodesService } from './calculate-codes.service';
import { EmbeddingService } from './embedding.service';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './repository/products.repository';

@Module({
  imports: [IndustriesModule, ProjectsModule, TeamsModule, UsersModule],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    EmbeddingService,
    ProductsRepository,
    CalculateCodesService,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
