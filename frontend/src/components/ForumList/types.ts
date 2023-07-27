import { ForumTopicResponse } from 'api/types';

export type Item = {
  id: number,
  name: string,
  answersCount: number,
  createdBy: string,
  date: string,
  category: string,
  active?: boolean,
};

export type Items = Item[];

export type OwnProps = {
  items: ForumTopicResponse
}
