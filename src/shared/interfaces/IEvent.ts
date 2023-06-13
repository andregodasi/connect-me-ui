import { Group } from './IGroup';
import { PageOptions } from './IPageOptions';
import { User } from './IUser';
import type { Dayjs } from 'dayjs';

export interface Event {
  uuid?: string;
  name: string;
  description: string;
  initialDate: Date;
  finishDate: Date;
  address: string;
  coverUrl: string;
  isPublised: boolean;
  limitParticipants: number;
  group?: Group;
  users?: { user: User }[];
}

export interface EventForm {
  uuid?: string;
  uuidGroup: string;
  name: string;
  slug: string;
  description: string;
  initialDate?: Date;
  finishDate?: Date;
  eventDate?: Dayjs[];
  address: string;
  limitParticipants: number;
  coverUrl?: string;
  coverImage?: File;
}
export interface EventFilters {
  q?: string;
  isFollowing?: boolean;
  isSubscribed?: boolean;
}

export interface EventPageOptionWithFilters extends PageOptions, EventFilters {}
