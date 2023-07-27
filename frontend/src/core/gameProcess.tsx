import { leaderboard } from 'api/leaderboard';
import { UserInfoResponse } from 'api/types';
import { t } from 'common';
import { Car, Range, Road } from 'core';
import { getRandomIntInclusive, setNotificationError } from 'utils';

type InformAlert = (text: string, hide?: boolean) => Promise<void> | undefined;
type SetInfo = (score: number, level: number) => void;
type RestartModal = () => void;

export class GameProcess {
  private canvasRoad: HTMLCanvasElement;

  private readonly canvasWidth: number;

  private readonly canvasHeight: number;

  private requestAnimationId = 0;

  private curb = 150;

  private scale = 0.8;

  private level = 1;

  private paused = false;

  private carSpeedOriginal = 5;

  private carSpeed = this.carSpeedOriginal;

  score = 0;

  road: Road;

  cars: Car[] = [];

  lastFrameAt = 0;

  lastScoreIncreasedAt = 0;

  lastLevelIncreasedAt = 0;

  carGenerationInterval = 0;

  rangeX: Range;

  rangeY: Range;

  // Кол-во кадров в секунду
  fps: number = 1000 / 120;

  private informAlert: InformAlert;

  private setInfo: SetInfo;

  private restartModal: RestartModal;

  private user: UserInfoResponse;

  constructor(
    canvasWidth: number,
    canvasHeight: number,
    canvasRoad: HTMLCanvasElement,
    informAlert: InformAlert,
    setInfo: SetInfo,
    restartModal: RestartModal,
    user: UserInfoResponse
  ) {
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.canvasRoad = canvasRoad;

    this.road = new Road(this.canvasHeight);

    this.user = user;

    this.rangeX = { min: this.curb, max: this.canvasWidth - this.curb };
    this.rangeY = { min: 0, max: this.canvasHeight };

    this.informAlert = informAlert;
    this.setInfo = setInfo;
    this.restartModal = restartModal;
  }

  handleKeyUp = (event: KeyboardEvent): void => {
    const userCar = this.cars[0];
    // Перемещение автомобиля по оси X
    if (event.key === 'ArrowRight') {
      userCar.toRight();
    }
    if (event.key === 'ArrowLeft') {
      userCar.toLeft();
    }
    // Перемещение автомобиля по оси Y
    if (event.key === 'ArrowUp') {
      userCar.toUp();
    }
    if (event.key === 'ArrowDown') {
      userCar.toDown();
    }
  };

  handleMouseMove = (event: MouseEvent): void => {
    const userCar = this.cars[0];

    const x = event.movementX;
    const y = event.movementY;

    if (Math.abs(x) > Math.abs(y)) {
      // Перемещение автомобиля по оси X
      if (x > 0) {
        userCar.toRight();
      } else if (x < 0) {
        userCar.toLeft();
      }
    } else {
      // Перемещение автомобиля по оси Y
      // eslint-disable-next-line no-lonely-if
      if (y < 0) {
        userCar.toUp();
      } else if (y > 0) {
        userCar.toDown();
      }
    }
  };

  // Генерация автомобилей
  generateCar = (now: number): void => {
    const delay = now - this.carGenerationInterval;
    const speed = this.carSpeed;

    // Добавляем машину
    if (delay >= 1500) {
      this.cars.push(
        new Car(
          this.rangeX,
          this.rangeY,
          getRandomIntInclusive(this.rangeX.min, this.rangeX.max - this.curb),
          this.rangeY.min - this.curb,
          speed,
          this.scale
        )
      );
      this.carGenerationInterval = now;
    }
  };

  // Старт игры
  startGame(): void {
    const now = performance.now();
    this.lastFrameAt = now;
    this.carGenerationInterval = now;
    this.lastScoreIncreasedAt = now;
    this.lastLevelIncreasedAt = now;
    this.update(now);
    window.addEventListener('keydown', this.handleKeyUp);
  }

  // Остановка игры
  stopGame = (): void => {
    cancelAnimationFrame(this.requestAnimationId);
    window.removeEventListener('keydown', this.handleKeyUp);
  };

  // Пауза
  pauseGame(): void {
    this.paused = true;
  }

  // Перезапуск
  restartGame = (): void => {
    const now = performance.now();
    this.setLevel(1);
    this.carSpeed = this.carSpeedOriginal;
    this.score = 0;
    this.paused = false;
    this.lastFrameAt = now;
    this.lastScoreIncreasedAt = now;
    this.lastScoreIncreasedAt = now;
    this.lastLevelIncreasedAt = now;
    this.setInfo(this.score, this.level);

    // по полам что бы машинка по центру была
    const centerCarPositionX = this.rangeX.max / 2;
    this.cars[0].setPositionNoAnimation(centerCarPositionX, this.rangeY.max);

    // Удаляем все машины, кроме машинки юзера
    for (let i = 0; i < this.cars.length; i += 1) {
      if (!this.cars[i].userCar) {
        this.cars[i].cancelAction();
      }
    }

    this.cars = [this.cars[0]];
    this.cars[0].toUp();
  };

  // Каждые 2 секунды
  increaseScore(now: number): void {
    const delay = now - this.lastScoreIncreasedAt;

    if (delay >= 2000) {
      this.score += 1;

      this.lastScoreIncreasedAt = now;

      this.setInfo(this.score, this.level);
    }
  }

  // Каждые 20 секунд
  increaseLevel(now: number): void {
    const delay = now - this.lastLevelIncreasedAt;

    if (delay >= 20000) {
      this.setLevel(this.level + 1);
      this.lastLevelIncreasedAt = now;

      this.setInfo(this.score, this.level);
      this.updateCarSpeed();
    }
  }

  updateCarSpeed(): void {
    const speedUp = 1;

    this.carSpeed = this.carSpeedOriginal + speedUp * (this.level - 1);
  }

  // Перерисовка экрана
  private update = (now: number): void => {
    if (!this.paused) {
      const delay = now - this.lastFrameAt;
      if (delay > this.fps) {
        this.generateCar(now);
        this.increaseScore(now);
        this.increaseLevel(now);
        this.draw();
        this.lastFrameAt = now;
      }
    }
    this.requestAnimationId = requestAnimationFrame(this.update);
  };

  // Рисуем дорогу
  drawRoad = (ctx: CanvasRenderingContext2D): void => {
    this.road.update();
    for (let i = 0; i < 2; i += 1) {
      ctx.drawImage(
        this.road.image,
        0,
        0,
        this.road.image.width,
        this.road.image.height,
        0,
        this.road.y - this.road.height * i,
        this.canvasWidth,
        this.road.height
      );
    }
  };

  // Рисуем автомобили
  drawCars = (ctx: CanvasRenderingContext2D): void => {
    for (let i = 0; i < this.cars.length; i += 1) {
      ctx.drawImage(
        this.cars[i].getImage,
        0,
        0,
        this.cars[i].getImage.width,
        this.cars[i].getImage.height,
        this.cars[i].getX,
        this.cars[i].getY,
        this.cars[i].getImage.width * this.scale,
        this.cars[i].getImage.height * this.scale
      );
    }
  };

  // Заполняем холст
  draw = (): void => {
    const ctx = this.canvasRoad?.getContext('2d') as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.drawRoad(ctx);
    this.drawCars(ctx);

    for (let i = 1; i < this.cars.length; i += 1) {
      this.cars[i].toDown();

      // Перехватываем столкновения
      const value = this.cars[0].collide(this.cars[i]);
      if (value) {
        this.pauseGame();
        this.saveScore().then(() => {
          this.restartModal();
        });
      }

      // Удаляем машину которая пропала из виду
      if (this.cars[i].getY > this.rangeY.max) {
        this.cars[i].cancelAction();
        this.cars.splice(i, 1);
      }
    }
  };

  initGame(): void {
    this.cars = [];

    // Машина пользователя
    const speed = 2.5;
    this.cars.push(new Car(this.rangeX, this.rangeY, this.rangeX.max / 2, this.rangeY.max, speed, this.scale, true));

    this.startGame();

    // Показваем баннер в начале игры
    this.setLevel(this.level);

    this.cars[0].toUp();
  }

  setLevel(level: number): void {
    this.level = level;
    this.informAlert(`${t('level')} ${level}`);
  }

  async saveScore(): Promise<void> {
    try {
      await leaderboard.save(this.score, this.level, this.user);
    } catch (error) {
      setNotificationError(error);
    }
  }
}
