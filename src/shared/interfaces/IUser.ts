import { Status } from '../enums/status.enum';

export interface User {
  uuid: string;
  name: string;
  nickname: string;
  status: Status;
}
