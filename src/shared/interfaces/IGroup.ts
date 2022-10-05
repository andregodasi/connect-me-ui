import { Event } from './IEvent';
import { User } from './IUser';

export interface GroupForm {
  uuid?: string;
  name: string;
  description: string;
  slug: string;
}

export interface Group {
  uuid: string;
  name: string;
  description: string;
  slug: string;
  users: [User[]];
  events: Event[];
}
