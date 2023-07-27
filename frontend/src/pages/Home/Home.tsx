import './Home.css';

import { ROUTES, t } from 'common';
import Layout from 'components/Layout';
import React, { FC, memo } from 'react';
import { useHistory } from 'react-router';
import { Button } from 'semantic-ui-react';

const Home: FC = memo(() => {
  const history = useHistory();

  const handleClick = () => history.push(ROUTES.GAME);

  return (
    <Layout className="home" transparent>
      <Button onClick={handleClick} color="green" className="home__button">
        {t('to_begin')}
      </Button>
    </Layout>
  );
});

export default Home;
