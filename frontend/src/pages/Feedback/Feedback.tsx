import React, { FC, useState } from 'react';
import { Button, Container, Form, Header } from 'semantic-ui-react';
import Layout from 'components/Layout';
import { t } from 'common';
import { useStringField } from 'common/hooks/formHooks';

import './Feedback.css';
import { FieldChangeEvent } from 'common/types';
import { validateEmail, validateName } from 'utils';
import { FeedbackErrors } from './types';
import some from 'lodash/some';
import { Feedback as FeeadBackAPI } from 'api/feedback';
import { useAuth } from 'common/hooks/authHook';

const Feedback: FC = () => {
  useAuth();

  const [isSend, setIsSend] = useState(false);
  const [errors, setErrors] = useState<Partial<FeedbackErrors>>({});

  const [name, handleChangeName] = useStringField('');
  const [email, handleChangeEmail] = useStringField('');
  const [text, handleChangeMessage] = useStringField('');

  const handleBlurName = (event: FieldChangeEvent): void => {
    const { name, value } = event.target;

    setErrors((prevState) => ({
      ...prevState,
      [name]: validateName(value),
    }));
  };

  const handleBlurEmail = (event: FieldChangeEvent): void => {
    const { name, value } = event.target;

    setErrors((prevState) => ({
      ...prevState,
      [name]: validateEmail(value),
    }));
  };

  const handleBlurMessage = (event: FieldChangeEvent): void => {
    const { name, value } = event.target;

    setErrors((prevState) => ({
      ...prevState,
      [name]: !value,
    }));
  };

  const handleSubmit = (): void => {
    if (name && email && text && !some(errors, Boolean)) {
      FeeadBackAPI.send({ name, email, text }).then(() => setIsSend(true));
    }
  };

  return (
    <Layout transparent>
      <Container className="feedback">
        {!isSend ? (
          <>
            <Header as="h1" textAlign="center">
              {t('feedbackTitle')}
            </Header>
            <Form onSubmit={handleSubmit}>
              <Form.Input
                name="name"
                value={name}
                label={t('first_name')}
                placeholder={t('first_name')}
                onChange={handleChangeName}
                onBlur={handleBlurName}
                error={errors.name}
              />
              <Form.Input
                name="email"
                value={email}
                type="email"
                label={t('email')}
                placeholder={t('email')}
                onChange={handleChangeEmail}
                onBlur={handleBlurEmail}
                error={errors.email}
              />
              <Form.TextArea
                name="text"
                value={text}
                type="text"
                label={t('message')}
                placeholder={t('message')}
                onChange={handleChangeMessage}
                style={{ minHeight: 120 }}
                onBlur={handleBlurMessage}
                error={errors.text}
              />
              <Button type="submit" color="blue" fluid>
                {t('send')}
              </Button>
            </Form>
          </>
        ) : (
          <Header as="h1" textAlign="center">
            {t('feedbackMessage')}
          </Header>
        )}
      </Container>
    </Layout>
  );
};

export default Feedback;
