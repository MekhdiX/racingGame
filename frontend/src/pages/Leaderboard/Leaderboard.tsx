import './Leaderboard.css';

import { LeaderboardResponseItem } from 'api/types';
import Layout from 'components/Layout';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Image, Label, List, Menu } from 'semantic-ui-react';
import { getLeaderboardSelector } from 'store/selectors';
import { useAuth } from 'common/hooks/authHook';
import { useThunkAction } from 'common/hooks/actionHooks';
import { getLeaderboard } from 'store/actions/leaderboard';
import anonymous from '../../assets/anonymous.png';

const Leaderboard: FC = () => {
  useAuth();

  const leaders = useSelector(getLeaderboardSelector);
  const getLeaderboardAction = useThunkAction(getLeaderboard);

  useEffect(() => getLeaderboardAction(), []);

  return (
    <Layout className="leaderboard" transparent>
      <div className="leaderboard__top">
        <div className="leaderboard__top-bar">
          <Menu color="blue" inverted widths={3}>
            <Menu.Item name="All time" />
          </Menu>
        </div>
        <div className="leaderboard__list">
          <List divided verticalAlign="middle">
            {leaders?.map((item: LeaderboardResponseItem, index: number) => (
              <List.Item key={index}>
                <Label color="blue">{index + 1}</Label>
                <Image avatar src={item.data.avatar ? item.data.avatar : anonymous} />
                <List.Content>{item.data.login}</List.Content>
                <List.Content floated="right">
                  <Label color="blue">
                    Очки
                    <Label.Detail>{item.data.casablanca_score}</Label.Detail>
                  </Label>
                  <Label color="black">
                    Уровень
                    <Label.Detail>{item.data.level}</Label.Detail>
                  </Label>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
