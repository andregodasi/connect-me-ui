import { Event, EventForm } from '@/shared/interfaces/IEvent';
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

export async function findByIdentifierEvent(uuid: string) {
  return api.get(`/event/${uuid}`).then((res) => res.data);
}

export async function saveEvent(eventForm: EventForm) {
  if (eventForm.uuid) {
    return api.patch(`/event/${eventForm.uuid}`, eventForm);
  }
  delete eventForm.uuid;
  return api.post('/event', eventForm);
}
