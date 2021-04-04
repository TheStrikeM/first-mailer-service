import {Injectable, Logger} from '@nestjs/common';
import {RedisService} from "nestjs-redis";
import {Interval} from "@nestjs/schedule";

type Mail = {
  email: string,
  message: string
}

@Injectable()
export class AppService {

  private readonly logger: Logger = new Logger("Mailer")

  constructor(
      private readonly redisService: RedisService
  ) {
  }


  @Interval(1000)
  public async sendMessage(): Promise<void> {
    const client = this.redisService.getClient()
    const res: string = await client.lpop('queue:mail.send')
    const mail: Mail = JSON.parse(res)
    if(!mail) {
      return;
    }

    this.logger.log(`Sender mail to: ${mail.email} with message: ${mail.message}`)
  }
}
