import { BadRequestException, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { ICommand } from '@app/command/interfaces/command.interface';
import { RequestPatternType } from '@app/command/types/request-pattern.type';

@Injectable()
export abstract class CommandService<ModuleType, ModuleActions>
  implements ICommand<ModuleType, ModuleActions>
{
  protected constructor(protected readonly client: ClientProxy) {}

  async send(
    { module, cmd }: RequestPatternType<ModuleType, ModuleActions>,
    data,
  ): Promise<any> {
    const { error, ...response } = await firstValueFrom(
      this.client.send(
        {
          module,
          cmd,
        },
        data,
      ),
    );

    if (error) {
      throw new BadRequestException(error.message);
    }

    return response;
  }
}
