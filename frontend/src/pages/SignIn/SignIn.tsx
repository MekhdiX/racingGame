import './SignIn.css';

import { useThunkAction } from 'common/hooks/actionHooks';
import { useAuth } from 'common/hooks/authHook';
import { useStringField } from 'common/hooks/formHooks';
import Layout from 'components/Layout';
import React, { FC, memo, useState } from 'react';
import { Button, Container, Form, Header } from 'semantic-ui-react';
import { signInAction, signInYandexAction } from 'store/actions/auth';
import { validateLoginAndPassword } from 'utils';

import { FieldErrors } from './types';
import { FieldChangeEvent } from 'common/types';
import { t } from 'common';

const SignIn: FC = memo(() => {
  useAuth();

  const [login, handleChangeLogin] = useStringField('');
  const [password, handleChangePassword] = useStringField('');

  const [errors, setErrors] = useState<Partial<FieldErrors>>({});

  const signIn = useThunkAction(signInAction);

  const signInYandex = useThunkAction(signInYandexAction);

  const handleBlur = (event: FieldChangeEvent): void => {
    const { name, value } = event.target;

    setErrors((prevState) => ({
      ...prevState,
      [name]: validateLoginAndPassword(value),
    }));
  };

  const handleSubmit = (): void => {
    signIn({ login, password });
  };

  const handleYandexOAuth = (): void => {
    signInYandex();
  };

  return (
    <Layout transparent verticalAlign>
      <Container className="sign">
        <Header as="h1" textAlign="center">
          {t('signinTitle')}
        </Header>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            name="login"
            value={login}
            label={t('login')}
            placeholder={t('login')}
            onChange={handleChangeLogin}
            onBlur={handleBlur}
            error={errors.login}
          />
          <Form.Input
            name="password"
            value={password}
            type="password"
            label={t('password')}
            placeholder={t('password')}
            onChange={handleChangePassword}
            onBlur={handleBlur}
            error={errors.password}
          />
          <Button type="submit" color="blue" fluid>
            {t('signinButton')}
          </Button>
          <div className="yandex_oauth" onClick={handleYandexOAuth}>
            <div>Войти через </div>
            <div className="yandex_logo" />
          </div>
          <div className="sign__link">
            <a href="/signup">{t('signupButton')}</a>
          </div>
        </Form>
      </Container>
    </Layout>
  );
});

export default SignIn;
