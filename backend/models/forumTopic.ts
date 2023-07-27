import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';

import { ForumComment } from './forumComment';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'forum_topics',
})
export class ForumTopic extends Model<ForumTopic> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  user: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  description: string;

  @HasMany(() => ForumComment)
  comments: ForumComment[];
}
