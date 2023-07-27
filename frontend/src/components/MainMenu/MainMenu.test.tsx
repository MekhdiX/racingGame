import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReactRouter from 'react-router';
import * as renderer from 'react-test-renderer';
import store from 'store';

import MainMenu from './MainMenu';

describe(`MainMenu Component`, () => {
  it(`'Home' tab active when uri is /home`, () => {
    jest.spyOn(ReactRouter, 'useLocation').mockImplementation(
      () =>
        ({
          pathname: '/home',
        } as any)
    );

    const tree = renderer
      .create(
        <Provider store={store}>
          <MainMenu />
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`'Forum' tab active when uri is /forum`, () => {
    jest.spyOn(ReactRouter, 'useLocation').mockImplementation(
      () =>
        ({
          pathname: '/forum',
        } as any)
    );

    const tree = renderer
      .create(
        <Provider store={store}>
          <MainMenu />
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`changes location when clicking on item from /forum to /home`, () => {
    let pushedLocation: string | undefined;
    const container = document.createElement('div');

    jest.spyOn(ReactRouter, 'useLocation').mockImplementation(
      () =>
        ({
          pathname: '/forum',
        } as any)
    );

    jest.spyOn(ReactRouter, 'useHistory').mockImplementation(
      () =>
        ({
          push: (path: string) => (pushedLocation = path),
        } as any)
    );

    ReactDOM.render(
      <Provider store={store}>
        <MainMenu />
      </Provider>,
      container
    );

    // click on item
    const item = container.querySelector('.main-menu__item') as HTMLElement;
    item.click();

    expect(pushedLocation).toStrictEqual('/home');
  });
});
