import { Item as ForumItem } from 'components/ForumList/types';

export type ForumItems = (ForumItem & {
  categoryId?: string,
})[]