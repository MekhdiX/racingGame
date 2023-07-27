import ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';

import { ModalWindow } from './ModalWindow';

describe(`MainMenu Component`, () => {
  ReactDOM.createPortal = jest.fn((element) => {
    return element;
  }) as any;

  it(`renders correctly when open`, () => {
    const tree = renderer
      .create(
        ModalWindow(
          true,
          'Title',
          'Text',
          () => {},
          () => {},
          'Ok',
          'Cancel'
        )
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders correctly when closed`, () => {
    const tree = renderer
      .create(
        ModalWindow(
          false,
          'Title',
          'Text',
          () => {},
          () => {},
          'Ok',
          'Cancel'
        )
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
