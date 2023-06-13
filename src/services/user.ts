import {
  Group,
  GroupForm,
  GroupPageOptionWithFilters,
} from '@/shared/interfaces/IGroup';
import { Page } from '@/shared/interfaces/IPage';
import { api } from './api';
import { Follower } from '@/shared/interfaces/IFollower';
import { Subscriber } from '@/shared/interfaces/ISubscribers';
import { ProfileForm, ProfilePayload, User } from '@/shared/interfaces/IUser';
import { AxiosInstance } from 'axios';

export async function getPaginatedMyFollowersByMyGroup(
  page: number,
  groudUUID: string
): Promise<Page<Follower>> {
  return api
    .get<Page<Follower>>(`/user/my-group/${groudUUID}/paginated?page=${page}`)
    .then((res) => res.data);
}

export async function getPaginatedMySubscribersByMyEvent(
  page: number,
  eventUUID: string
): Promise<Page<Subscriber>> {
  return api
    .get<Page<Subscriber>>(`/user/my-event/${eventUUID}/paginated?page=${page}`)
    .then((res) => res.data);
}

export async function getCurrentProfile(): Promise<User> {
  return api.get<User>(`/user/current/profile`).then((res) => res.data);
}

export async function saveProfile(profilePayload: ProfilePayload) {
  return api.put(`/user/current/profile`, profilePayload);
}

export async function getCurrentProfileSSR(
  apiSSR: AxiosInstance
): Promise<User> {
  return apiSSR.get<User>(`/user/current/profile`).then((res) => res.data);
}

export async function uploadPhoto(photo: File) {
  const formData = new FormData();

  formData.append('photo', photo);

  return api.post('/user/photo', formData);
}

export async function getProfileSSR(
  apiSSR: AxiosInstance,
  identifier: string
): Promise<User> {
  return apiSSR
    .get<User>(`/user/${identifier}/profile`)
    .then((res) => res.data);
}
