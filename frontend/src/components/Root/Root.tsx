import { ROUTES } from 'common';
import { useAuth } from 'common/hooks/authHook';
import React, { FC, memo } from 'react';
import { Redirect } from 'react-router';

const Root: FC = memo(() => {
  useAuth();

  return <Redirect to={ROUTES.HOME} />;
});

export default Root;
