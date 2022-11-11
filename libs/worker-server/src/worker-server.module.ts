import { Global, Module } from '@nestjs/common';
import { IWorkerServer } from './worker-server.interface';
import { WorkerServerService } from './worker-server.service';

@Global()
@Module({
  providers: [
    {
      provide: IWorkerServer,
      useClass: WorkerServerService,
    },
  ],
  exports: [IWorkerServer],
})
export class WorkerServerModule {}
