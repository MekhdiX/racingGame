import { t } from 'common/dictionary';
import Layout from 'components/Layout';
import React, { FC, useState } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';
import { ForumErrors } from 'pages/ForumCreate/types';
import { FieldChangeEvent } from 'common/types';
import { validateName } from 'utils';
import { useStringField } from 'common/hooks/formHooks';
import some from 'lodash/some';

import { Forum as ForumAPI } from 'api/forum';
import { useHistory } from 'react-router';
import { useAuth } from 'common/hooks/authHook';
import { useSelector } from 'react-redux';
import { getUserSelector } from 'store/selectors';

const ForumCreate: FC = () => {
  useAuth();

  const history = useHistory();
  const [isSend, setIsSend] = useState(false);
  const [errors, setErrors] = useState<Partial<ForumErrors>>({});

  const [title, handleChangeTitle] = useStringField('');
  const [description, handleChangeDescription] = useStringField('');

  const user = useSelector(getUserSelector);

  const handleBlurTitle = (event: FieldChangeEvent): void => {
    const { name, value } = event.target;

    setErrors((prevState) => ({
      ...prevState,
      [name]: validateName(value),
    }));
  };

  const handleBlurDescription = (event: FieldChangeEvent): void => {
    const { name, value } = event.target;

    setErrors((prevState) => ({
      ...prevState,
      [name]: !value,
    }));
  };

  const handleSubmit = (): void => {
    if (title && description && !some(errors, Boolean)) {
      ForumAPI.create({ title, description, user: user.login }).then(() => setIsSend(true));
    }
  };

  return (
    <Layout title={t('forumTitle')}>
      <Button onClick={() => history.goBack()} secondary>
        {t('back')}
      </Button>
      <br />
      <br />
      {!isSend ? (
        <Form onSubmit={handleSubmit}>
          <Form.Input
            name="title"
            value={title}
            label={t('first_name')}
            placeholder={t('forum_title')}
            onChange={handleChangeTitle}
            onBlur={handleBlurTitle}
            error={errors.title}
          />
          <Form.TextArea
            name="description"
            value={description}
            type="text"
            label={t('message')}
            placeholder={t('message')}
            onChange={handleChangeDescription}
            style={{ minHeight: 120 }}
            onBlur={handleBlurDescription}
            error={errors.description}
          />
          <Button type="submit" color="blue" fluid>
            {t('send')}
          </Button>
        </Form>
      ) : (
        <Header as="h1" textAlign="center">
          {t('success')}
        </Header>
      )}
    </Layout>
  );
};

export default ForumCreate;
