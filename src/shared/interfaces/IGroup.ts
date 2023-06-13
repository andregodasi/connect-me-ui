import { Role } from '../enums/role.enum';
import { Event } from './IEvent';
import { PageOptions } from './IPageOptions';
import { User } from './IUser';

export interface GroupForm {
  uuid?: string;
  name: string;
  description: string;
  slug: string;
  coverUrl?: string;
  coverImage?: any;
}

export interface Group {
  uuid: string;
  name: string;
  description: string;
  coverUrl: string;
  slug: string;
  users: { user: User; role: Role }[];
  events: Event[];
}
export interface GroupFilters {
  q?: string;
  isFollowing?: boolean;
}

export interface GroupPageOptionWithFilters extends PageOptions, GroupFilters {}
