import { Module } from '@nestjs/common';
import { WorkerServerService } from './worker-server.service';

@Module({
  providers: [WorkerServerService],
  exports: [WorkerServerService],
})
export class WorkerServerModule {}
