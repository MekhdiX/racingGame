import { t } from 'common/dictionary';
import ForumList from 'components/ForumList';
import Layout from 'components/Layout';
import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router';

import { useDispatch, useSelector } from 'react-redux';
import { getAuthSelector, getForumTopicsSelector } from 'store/selectors';
import { Button } from 'semantic-ui-react';
import { ROUTES } from 'common';
import { getForumTopic } from 'store/actions/forumTopic';

const Forum: FC = () => {
  const history = useHistory();
  const isAuth = useSelector(getAuthSelector);
  const dispatch = useDispatch();
  const topics = useSelector(getForumTopicsSelector);

  useEffect(() => {
    dispatch(getForumTopic());
  }, []);

  return (
    <Layout title={t('forumTitle')}>
      <div style={{ paddingBottom: '8px' }}>
        {isAuth && (
          <Button primary onClick={() => history.push(ROUTES.FORUM_CREATE)}>
            {t('createTopic')}
          </Button>
        )}
      </div>
      <ForumList items={topics} />
    </Layout>
  );
};

export default Forum;
