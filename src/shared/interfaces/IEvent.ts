import { Group } from './IGroup';

export interface Event {
  uuid?: string;
  name: string;
  description: string;
  initialDate: Date;
  finishDate: Date;
  address: string;
  limitParticipants: number;
  group?: Group;
}
