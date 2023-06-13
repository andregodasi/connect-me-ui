import {
  Event,
  EventForm,
  EventPageOptionWithFilters,
} from '@/shared/interfaces/IEvent';
import { Page } from '@/shared/interfaces/IPage';
import { api } from './api';

export async function getPaginatedEvents(
  pageOptions: EventPageOptionWithFilters,
): Promise<Page<Event>> {
  return api
    .get<Page<Event>>(`/event/paginated`, { params: { ...pageOptions } })
    .then((res) => res.data);
}

export async function getPaginatedMyEvents(page: number): Promise<Page<Event>> {
  return api
    .get<Page<Event>>(`/event/my/paginated?page=${page}`)
    .then((res) => res.data);
}

export async function getPaginatedMyEventsByGroup(
  page: number,
  groudUUID: string,
): Promise<Page<Event>> {
  return api
    .get<Page<Event>>(`/event/my/group/${groudUUID}?page=${page}`)
    .then((res) => res.data);
}

export async function findByIdentifierEvent(eventUUID: string) {
  return api.get(`/event/${eventUUID}`).then((res) => res.data);
}

export async function saveEvent(eventForm: EventForm) {
  const formData = new FormData();
  Object.entries(eventForm).forEach((values) => {
    if (values[1]) {
      formData.append(values[0], values[1]);
    }
  });

  formData.delete('eventDate');
  if (eventForm.uuid) {
    return api.patch(`/event/${eventForm.uuid}`, formData);
  }

  formData.delete('uuid');
  return api.post('/event', formData);
}

export async function createSubscription(eventUUID: string) {
  return api.post('/event/subscribe', { uuid: eventUUID });
}

export async function unsubscribe(eventUUID: string) {
  return api.delete(`/event/unsubscribe/${eventUUID}`);
}

export async function getPaginatedMyCommentsByMyEvent(
  page: number,
  eventUUID: string,
): Promise<Page<Comment>> {
  return api
    .get<Page<Comment>>(`/event/${eventUUID}/comment/paginated/?page=${page}`)
    .then((res) => res.data);
}

export async function publishEvent(groupUUID: string) {
  return api.put(`event/${groupUUID}/publish`);
}

export async function deleteEvent(eventUUID: string) {
  return api.delete(`/event/${eventUUID}`);
}
