import Layout from 'components/Layout/Layout';
import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { Provider } from 'react-redux';
import * as renderer from 'react-test-renderer';
import store from 'store';
import history from 'store/history';

describe(`Layout Component`, () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Layout>
              <div>Hello world</div>
            </Layout>
          </ConnectedRouter>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders correctly with title prop`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Layout title="Title">
              <div>Hello world</div>
            </Layout>
          </ConnectedRouter>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders correctly with all props`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Layout title="Title" transparent className="class-name" verticalAlign>
              <div>Hello world</div>
            </Layout>
          </ConnectedRouter>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
