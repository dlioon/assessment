import { RequestPatternType } from '@app/command/types/request-pattern.type';

export interface ICommand<ModuleType, ModuleActions> {
  send(
    params: RequestPatternType<ModuleType, ModuleActions>,
    data: any,
  ): Promise<any>;
}
