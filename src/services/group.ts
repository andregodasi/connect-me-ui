import { Group, GroupForm } from '@/shared/interfaces/IGroup';
import { Page } from '@/shared/interfaces/IPage';
import { api } from './api';

export async function saveGroup(groupForm: GroupForm) {
  if (groupForm.id) {
    return api.patch(`/group/${groupForm.id}`, groupForm);
  }
  return api.post('/group', groupForm);
}

export async function getMyGroups() {
  return api.get('/group/my').then((res) => res.data);
}

export async function findByIdentifierGroup(uuid: string) {
  return api.get(`/group/${uuid}`).then((res) => res.data);
}

export async function getPaginatedGroups(page: number): Promise<Page<Group>> {
  return api
    .get<Page<Group>>(`/group/paginated?page=${page}`)
    .then((res) => res.data);
}
