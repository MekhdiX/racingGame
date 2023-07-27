import './Game.css';

import b_ from 'b_';
import { t } from 'common';
import { ModalWindow } from 'components/ModalWindow';
import { GameProcess } from 'core';
import debounce from 'lodash/debounce';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { AppState } from 'store/types';
import { animate } from 'utils';
import { UserInfoResponse } from 'api/types';

type Props = Partial<RouteComponentProps> & { theme: string, user: UserInfoResponse };

type State = {
  fullscreenMode: boolean;
  modalStatus: boolean;
  alertText: string;
  level: number;
  score: number;
  restartModalStatus: boolean;
};

interface Document extends HTMLDocument {
  mozPointerLockElement: any;
  webkitPointerLockElement: any;
}

interface Canvas extends HTMLCanvasElement {
  mozRequestPointerLock: any;
  webkitRequestPointerLock: any;
}

const b = b_.with('game');

class GameComponent extends PureComponent<Props, State> {
  canvasWidth = 800;

  canvasHeight = window.innerHeight;

  canvasRoad = React.createRef<HTMLCanvasElement>();

  gameProcess?: GameProcess;

  private readonly formRef: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      alertText: '',
      fullscreenMode: false,
      modalStatus: false,
      level: 0,
      score: 0,
      restartModalStatus: false,
    };
    this.formRef = React.createRef();
  }

  componentDidMount(): void {
    const canvasRoad = this.canvasRoad?.current as HTMLCanvasElement;
    this.gameProcess = new GameProcess(
      this.canvasWidth,
      this.canvasHeight,
      canvasRoad,
      this.alert.bind(this),
      this.setInfo.bind(this),
      this.restartModal.bind(this),
      this.props.user
    );
    this.gameProcess.initGame();
    window.addEventListener('keyup', this.handleKeyUp);
    this.addPointerLock(canvasRoad);
  }

  componentWillUnmount(): void {
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  setInfo(score: number, level: number): void {
    this.setState({
      score,
      level,
    });
  }

  addPointerLock = (canvasElem: HTMLCanvasElement): void => {
    // eslint-disable-next-line no-param-reassign
    canvasElem.requestPointerLock =
      canvasElem.requestPointerLock || (canvasElem as Canvas).mozRequestPointerLock || (canvasElem as Canvas).webkitRequestPointerLock;

    canvasElem.addEventListener('click', () => {
      if (!this.isPointerLockedElem()) {
        canvasElem.requestPointerLock();
      } else {
        document.exitPointerLock();
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const debounceMouseHandler = debounce(this.gameProcess?.handleMouseMove ?? (() => {}), 10);

    const pointerLockCallback = () => {
      const havePointerLock =
        'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

      if (!havePointerLock) {
        // eslint-disable-next-line no-console
        console.warn('Ваш браузер не поддерживает Pointer Lock');
        return;
      }

      if (this.gameProcess?.handleMouseMove) {
        if (this.isPointerLockedElem()) {
          document.addEventListener('mousemove', debounceMouseHandler, false);
        } else {
          document.removeEventListener('mousemove', debounceMouseHandler, false);
        }
      }
    };

    document.addEventListener('pointerlockchange', pointerLockCallback, false);
    document.addEventListener('mozpointerlockchange', pointerLockCallback, false);
    document.addEventListener('webkitpointerlockchange', pointerLockCallback, false);
  };

  isPointerLockedElem = (): boolean => {
    const canvasElem = this.canvasRoad?.current as HTMLCanvasElement;

    return (
      canvasElem === (document as Document).pointerLockElement ||
      canvasElem === (document as Document).mozPointerLockElement ||
      canvasElem === (document as Document).webkitPointerLockElement
    );
  };

  handleKeyUp = (event: KeyboardEvent): void => {
    if (event.code === 'Escape') {
      this.exit();
    }
  };

  exit = (): void => {
    this.gameProcess?.stopGame();
    this.setState({
      modalStatus: true,
    });
  };

  toggleFullScreen = (): void => {
    if (!document.fullscreenElement) {
      this.setState({
        fullscreenMode: true,
      });
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      this.setState({
        fullscreenMode: false,
      });
      document.exitFullscreen();
    }
  };

  alert(text: string, hide = true): Promise<void> | undefined {
    this.setState({ alertText: text });

    const form = this.formRef.current;

    if (!form) {
      return;
    }

    // eslint-disable-next-line consistent-return
    return new Promise<void>((resolve) => {
      form.style.setProperty('display', 'flex');
      animate(
        (timing) => timing,
        (progressOne) => {
          form.style.setProperty('top', `${progressOne * 50}%`);
          form.style.setProperty('opacity', `${progressOne}`);
          if (progressOne === 1) {
            if (!hide) return;

            setTimeout(() => {
              // Двигаем баннер вниз
              animate(
                (timing) => timing,
                (progressTwo) => {
                  form.style.setProperty('top', `${50 + progressTwo * 50}%`);
                  form.style.setProperty('opacity', `${1 - progressTwo}`);
                  if (progressTwo === 1) {
                    // Убираем баннер
                    form.style.setProperty('display', 'none');

                    resolve();
                  }
                },
                500
              );
            }, 500);
          }
        },
        1000
      );
    });
  }

  restartModal(): void {
    this.setState({
      restartModalStatus: true,
    });
  }

  renderModalWindow(): JSX.Element {
    const { history } = this.props;
    const { modalStatus } = this.state;
    return ModalWindow(
      modalStatus,
      t('quitGame'),
      t('closeMessage'),
      () => {
        this.setState({
          modalStatus: false,
        });
        this.gameProcess?.startGame();
      },
      () => {
        history?.push('/home');
      },
      t('ok'),
      t('cancel')
    );
  }

  renderRestartModal(): JSX.Element {
    const { history } = this.props;
    const { restartModalStatus, score } = this.state;
    return ModalWindow(
      restartModalStatus,
      t('gameOver'),
      `${t('gameOverScore')} ${score}`,
      () => {
        this.setState({
          restartModalStatus: false,
        });
        history?.push('/home');
      },
      () => {
        this.setState({
          restartModalStatus: false,
        });
        this.gameProcess?.restartGame();
      },
      t('restart'),
      t('exit')
    );
  }

  render(): JSX.Element {
    const { fullscreenMode, alertText, level, score } = this.state;
    const { theme } = this.props;
    const modal = this.renderModalWindow();
    return (
      <div className={`${b()} ${theme}`}>
        {modal}
        {this.renderRestartModal()}
        <div ref={this.formRef} className={b('alert')}>
          <h1>{alertText}</h1>
        </div>
        <div className={b('column', { position: 'left' })} />
        <div className={b('column', { position: 'center' })}>
          <canvas className={b('road')} id="road" ref={this.canvasRoad} width={this.canvasWidth} height={this.canvasHeight} />
        </div>
        <div className={b('column', { position: 'right' })}>
          <div className={b('bar', { position: 'top' })}>
            <Button color="blue" onClick={this.toggleFullScreen}>
              {t(fullscreenMode ? 'normalScreen' : 'fullScreen')}
            </Button>
            <Button color="red" onClick={this.exit}>
              {t('exit')}
            </Button>
          </div>
          <div className={b('info')}>
            <div className={b('info-item')}>Level: {level}</div>
            <div className={b('info-item', { size: 'small' })}>Score: {score}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  theme: state.theme,
  user: state.user,
});

export const Game = connect(mapStateToProps)(GameComponent);
