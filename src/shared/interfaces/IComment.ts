import { User } from './IUser';

export interface Comment {
  uuid: string;
  user: User;
  text: string;
  starts: number;
  reasonDeleted: string;
}
