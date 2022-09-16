import { Event } from '@/shared/interfaces/IEvent';
import { Page } from '@/shared/interfaces/IPage';
import { api } from './api';

export async function getPaginatedEvents(page: number): Promise<Page<Event>> {
  return api
    .get<Page<Event>>(`/event/paginated?page=${page}`)
    .then((res) => res.data);
}

export async function getPaginatedMyEvents(page: number): Promise<Page<Event>> {
  return api
    .get<Page<Event>>(`/event/my/paginated?page=${page}`)
    .then((res) => res.data);
}
