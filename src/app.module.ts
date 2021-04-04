import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import {RedisModule} from "nestjs-redis";
import {ScheduleModule} from "@nestjs/schedule"

@Module({
  imports: [
    RedisModule.register({
      url: 'redis://localhost:10000/1'
    }),
    ScheduleModule.forRoot()
  ],
  providers: [AppService],
})
export class AppModule {}
