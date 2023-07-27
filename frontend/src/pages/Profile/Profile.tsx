import './Profile.css';

import { InputChangeEvent, t } from 'common';
import { useThunkAction } from 'common/hooks/actionHooks';
import { useAuth } from 'common/hooks/authHook';
import Layout from 'components/Layout';
import React, { FC, memo, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Container, Form, Image } from 'semantic-ui-react';
import { changeAvatarAction, changeUserInfoAction } from 'store/actions/user';
import { getUserSelector } from 'store/selectors';
import { validateEmail, validateLoginAndPassword, validateName, validatePhone } from 'utils';

import { Profile, ProfileErrors } from './types';

const Profile: FC = memo(() => {
  useAuth();

  const [profile, setProfile] = useState<Profile>({});
  const [errors, setErrors] = useState<ProfileErrors>({});

  const fileInput = useRef<HTMLInputElement>(null);

  const profileState = useSelector(getUserSelector);

  const changeUserInfo = useThunkAction(changeUserInfoAction);
  const changeAvatar = useThunkAction(changeAvatarAction);

  useEffect(() => {
    setProfile({ ...profileState });
  }, [profileState]);

  const handleSaveProfile = (): void => {
    changeUserInfo(profile);
  };

  const handleUserInput = (event: InputChangeEvent): void => {
    const { id, value } = event.target;

    setProfile((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleBlur = (isValid: boolean) => (event: InputChangeEvent): void => {
    const { id } = event.target;

    setErrors((prevState) => ({ ...prevState, [id]: isValid }));
  };

  const handleFocus = (event: InputChangeEvent): void => {
    const { id } = event.target;

    setErrors((prevState) => ({ ...prevState, [id]: false }));
  };

  const handleUserAvatar = (event: InputChangeEvent): void => {
    if (event.target.files && event.target.files?.length > 0) {
      const img = event.target.files[0];
      const formData = new FormData();

      formData.append('avatar', img, img.name);

      changeAvatar(formData);
    }
  };

  return (
    <Layout transparent verticalAlign>
      <Container className="profile">
        <div className="profile__form">
          <Form id="form">
            <div className="profile__avatar">
              <Image
                onClick={() => {
                  fileInput.current?.click();
                }}
                className="profile__avatar-image"
                src={profile?.avatar || 'https://more-show.ru/upload/not-available.png'}
                size="small"
                bordered
              />
              <input style={{ display: 'none' }} type="file" ref={fileInput} onChange={handleUserAvatar} />
              <h3>{profile?.display_name}</h3>
            </div>
            <Form.Input
              id="display_name"
              label={t('display_name')}
              fluid
              onChange={handleUserInput}
              value={profile?.display_name || ''}
              error={errors?.display_name}
              onBlur={handleBlur(validateName(profile?.display_name || ''))}
              onFocus={handleFocus}
            />
            <Form.Input
              id="second_name"
              label={t('second_name')}
              fluid
              value={profile?.second_name || ''}
              onChange={handleUserInput}
              error={errors?.second_name}
              onBlur={handleBlur(validateName(profile?.second_name || ''))}
              onFocus={handleFocus}
            />
            <Form.Input
              id="first_name"
              label={t('first_name')}
              fluid
              onChange={handleUserInput}
              value={profile?.first_name || ''}
              error={errors?.first_name}
              onBlur={handleBlur(validateName(profile?.first_name || ''))}
              onFocus={handleFocus}
            />
            <Form.Input
              id="login"
              label={t('login')}
              fluid
              onChange={handleUserInput}
              value={profile?.login || ''}
              error={errors?.login}
              onBlur={handleBlur(validateLoginAndPassword(profile?.login || ''))}
              onFocus={handleFocus}
            />
            <Form.Input
              id="email"
              label={t('email')}
              fluid
              onChange={handleUserInput}
              value={profile?.email || ''}
              error={errors?.email}
              onBlur={handleBlur(validateEmail(profile?.email || ''))}
              onFocus={handleFocus}
            />
            <Form.Input
              id="phone"
              label={t('phone')}
              fluid
              onChange={handleUserInput}
              value={profile?.phone || ''}
              error={errors?.phone}
              onBlur={handleBlur(validatePhone(profile?.phone || ''))}
              onFocus={handleFocus}
            />
            <Button onClick={handleSaveProfile} color="blue" type="button" fluid>
              {t('saveButton')}
            </Button>
          </Form>
        </div>
      </Container>
    </Layout>
  );
});

export default Profile;
