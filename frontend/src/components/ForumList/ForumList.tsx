import { ROUTES } from 'common/consts';
import { t } from 'common/dictionary';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

import { OwnProps } from './types';

const ForumList: FC<OwnProps> = ({ items }: OwnProps) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>{t('question')}</Table.HeaderCell>
        <Table.HeaderCell />
        <Table.HeaderCell />
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {items
        .map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>
              <Link to={ROUTES.FORUM_VIEW.replace(':id', item.id.toString())}>{item.title}</Link>
              <br/>
              <span>{item.description}</span>
            </Table.Cell>
            <Table.Cell>
              by <strong>{item.user}</strong>
            </Table.Cell>
          </Table.Row>
        ))}
    </Table.Body>
  </Table>
);
export default ForumList;
