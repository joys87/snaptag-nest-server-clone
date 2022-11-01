import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TeamsController } from './teams/teams.controller';
import { TeamsModule } from './teams/teams.module';
import { TeamsService } from './teams/teams.service';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [PrismaModule, TeamsModule, ProjectsModule],
  controllers: [AppController, TeamsController],
  providers: [AppService, TeamsService],
})
export class AppModule {}
