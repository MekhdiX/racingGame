import ForumList from 'components/ForumList';
import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { Provider } from 'react-redux';
import * as renderer from 'react-test-renderer';
import store from 'store';
import history from 'store/history';

describe(`ForumList Component`, () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <ForumList
              items={[
                {
                  id: 1,
                  user: 'USER',
                  title: 'TITLE',
                  description: 'DESCR',
                  comments: [],
                },
              ]}
            />
          </ConnectedRouter>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
