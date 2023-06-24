import { Page } from '@/shared/interfaces/IPage';
import { api } from './api';
import { Comment } from '@/shared/interfaces/IComment';
import { PageOptions } from '@/shared/interfaces/IPageOptions';

export async function getPaginatedPublicComments(
  type: 'event' | 'group',
  uuid: string,
  page: PageOptions,
): Promise<Page<Comment>> {
  return api
    .get<Page<Comment>>(
      `/${type}/${uuid}/comment/public-paginated/?page=${page.page}`,
    )
    .then((res) => res.data);
}

export async function getPaginatedMyComments(
  page: number,
  uuidEntity: string,
  type: 'event' | 'group',
): Promise<Page<Comment>> {
  return api
    .get<Page<Comment>>(
      `/${type}/${uuidEntity}/comment/paginated/?page=${page}`,
    )
    .then((res) => res.data);
}

export async function createComment({
  type,
  uuid,
  comment,
}: {
  type?: string;
  uuid?: string;
  comment: any;
}) {
  return api.post(`/${type}/${uuid}/comment`, { ...comment });
}

export async function deleteComment({
  type,
  uuidEntity,
  uuidComment,
  reasonDeleted,
}: {
  type?: 'event' | 'group';
  uuidEntity?: string;
  uuidComment?: string;
  reasonDeleted?: string;
}) {
  return api.put(`/${type}/${uuidEntity}/comment/${uuidComment}`, {
    reasonDeleted,
  });
}
