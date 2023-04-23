import { Group } from './IGroup';
import { PageOptions } from './IPageOptions';
import { User } from './IUser';

export interface Event {
  uuid?: string;
  name: string;
  description: string;
  initialDate: Date;
  finishDate: Date;
  address: string;
  limitParticipants: number;
  group?: Group;
  users?: { user: User }[];
}

export interface EventForm {
  uuid?: string;
  idGroup: string;
  name: string;
  slug: string;
  description: string;
  initialDate: Date;
  finishDate: Date;
  address: string;
  limitParticipants: number;
}

export interface EventPageOptionWithFilters extends PageOptions, EventFilters {}

export interface EventFilters {
  q?: string;
  isFollowing?: boolean;
  isSubscribed?: boolean;
}
