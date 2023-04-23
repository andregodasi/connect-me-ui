import {
  Group,
  GroupForm,
  GroupPageOptionWithFilters,
} from '@/shared/interfaces/IGroup';
import { Page } from '@/shared/interfaces/IPage';
import { api } from './api';

export async function saveGroup(groupForm: GroupForm) {
  if (groupForm.uuid) {
    return api.patch(`/group/${groupForm.uuid}`, groupForm);
  }
  delete groupForm.uuid;
  return api.post('/group', groupForm);
}

export async function saveGroupWithFile(groupForm: GroupForm) {
  const formData = new FormData();
  Object.entries(groupForm).forEach((values) => {
    if (values[1]) {
      formData.append(values[0], values[1]);
    }
  });

  if (groupForm.uuid) {
    return api.patch(`/group/${groupForm.uuid}`, formData);
  }

  return api.post('/group', formData);
}

export async function getMyGroups() {
  return api.get('/group/my').then((res) => res.data);
}

export async function findByIdentifierGroup(uuid: string) {
  return api.get(`/group/${uuid}`).then((res) => res.data);
}

export async function getPaginatedGroups(
  pageOptions: GroupPageOptionWithFilters
): Promise<Page<Group>> {
  return api
    .get<Page<Group>>(`/group/paginated`, { params: { ...pageOptions } })
    .then((res) => res.data);
}

export async function followGrpup(groupUUID: string) {
  return api.post('/group/follow', { uuid: groupUUID });
}

export async function unfollowGroup(groupUUID: string) {
  return api.delete(`/group/unfollow/${groupUUID}`);
}
