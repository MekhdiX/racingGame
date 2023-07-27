import './SignUp.css';

import { InputChangeEvent, ROUTES, t } from 'common';
import { useThunkAction } from 'common/hooks/actionHooks';
import { useAuth } from 'common/hooks/authHook';
import { useStringField } from 'common/hooks/formHooks';
import Layout from 'components/Layout';
import React, { FC, memo, useState } from 'react';
import { Button, Container, Form, Header } from 'semantic-ui-react';
import { signUpAction } from 'store/actions/auth';
import { setNotificationError, validateEmail, validateLoginAndPassword, validateName, validatePhone } from 'utils';

import { FieldErrors } from './types';

const SignUp: FC = memo(() => {
  useAuth();

  const [first_name, handleChangeFirstName] = useStringField('');
  const [second_name, handleChangeSecondName] = useStringField('');
  const [login, handleChangeLogin] = useStringField('');
  const [email, handleChangeEmail] = useStringField('');
  const [phone, handleChangePhone] = useStringField('');
  const [password, handleChangePassword] = useStringField('');
  const [password_confirm, handleChangePasswordConfirm] = useStringField('');

  const [errors, setErrors] = useState<Partial<FieldErrors>>({});

  const signUp = useThunkAction(signUpAction);

  const handleBlur = (event: InputChangeEvent): void => {
    const { name, value } = event.target;

    switch (name) {
      case 'first_name':
      case 'second_name':
        setErrors((prevState) => ({
          ...prevState,
          [name]: validateName(value),
        }));
        break;
      case 'login':
      case 'password':
      case 'password_confirm':
        setErrors((prevState) => ({
          ...prevState,
          [name]: validateLoginAndPassword(value),
        }));
        break;
      case 'email':
        setErrors((prevState) => ({
          ...prevState,
          [name]: validateEmail(value),
        }));
        break;
      case 'phone':
        setErrors((prevState) => ({
          ...prevState,
          [name]: validatePhone(value),
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (): void => {
    if (password !== password_confirm) {
      setNotificationError({ message: t('passwordsNotMatch') } as Error);
    } else {
      signUp({ first_name, second_name, login, email, phone, password });
    }
  };

  return (
    <Layout transparent verticalAlign>
      <Container className="sign">
        <Header as="h1" textAlign="center">
          {t('signupTitle')}
        </Header>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            name="first_name"
            value={first_name}
            label={t('first_name')}
            placeholder={t('first_name')}
            onChange={handleChangeFirstName}
            onBlur={handleBlur}
            error={errors.first_name}
          />
          <Form.Input
            name="second_name"
            value={second_name}
            label={t('second_name')}
            placeholder={t('second_name')}
            onChange={handleChangeSecondName}
            onBlur={handleBlur}
            error={errors.second_name}
          />
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
            name="email"
            value={email}
            type="email"
            label={t('email')}
            placeholder={t('email')}
            onChange={handleChangeEmail}
            onBlur={handleBlur}
            error={errors.email}
          />
          <Form.Input
            name="phone"
            value={phone}
            label={t('phone')}
            placeholder={t('phone')}
            onChange={handleChangePhone}
            onBlur={handleBlur}
            error={errors.phone}
          />
          <Form.Input
            autoComplete="true"
            name="password"
            value={password}
            type="password"
            label={t('password')}
            placeholder={t('password')}
            onChange={handleChangePassword}
            onBlur={handleBlur}
            error={errors.password}
          />
          <Form.Input
            autoComplete="true"
            name="password_confirm"
            value={password_confirm}
            type="password"
            label={t('password_confirm')}
            placeholder={t('password_confirm')}
            onChange={handleChangePasswordConfirm}
            onBlur={handleBlur}
            error={errors.password_confirm}
          />

          <Button type="submit" color="blue" fluid>
            {t('signupButton')}
          </Button>
          <div className="sign__link">
            <a href={ROUTES.SIGNIN}>{t('signinTitle')}</a>
          </div>
        </Form>
      </Container>
    </Layout>
  );
});

export default SignUp;
