import { PageMeta } from './IPageMeta';

export interface Page<T> {
  data: T[];
  meta: PageMeta;
}
