import carImage from 'assets/car.png';
import userCarImage from 'assets/usercar.png';
import { animate } from 'utils';

export type Range = {
  min: number;
  max: number;
};

export class Car {
  private speed;

  private scale;

  private animateId = 0;

  public userCar: boolean;

  // Координаты расположения автомобиля
  private y = 0;

  private x = 0;

  // Максимальные значения для перемещения автомобиля
  private rangeX: Range;

  private rangeY: Range;

  // Сам автомобиль (фотография)
  private image = new Image();

  constructor(rangeX: Range, rangeY: Range, x: number, y: number, speed: number, scale: number, userCar = false) {
    this.rangeY = rangeY;
    this.rangeX = rangeX;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.userCar = userCar;
    this.scale = scale;
    this.image.src = carImage;

    if (this.userCar) {
      this.image.src = userCarImage;
    }
  }

  get getImage(): HTMLImageElement {
    return this.image;
  }

  get getX(): number {
    return this.x;
  }

  get getY(): number {
    return this.y;
  }

  get getCarHeight(): number {
    return this.image.height * this.scale;
  }

  get getCarWidth(): number {
    return this.image.width * this.scale;
  }

  // Изменеие положения автомобиля по оси X
  private setX = (value: number, animateId: number): void => {
    this.animateId = animateId;

    let x = this.x + value;
    if (x < this.rangeX.min) {
      x = this.rangeX.min;
    } else if (x > this.rangeX.max - this.getCarWidth) {
      x = this.rangeX.max - this.getCarWidth;
    }

    this.x = x;
  };

  // Изменеие положения автомобиля по оси Y
  private setY = (value: number, animateId: number): void => {
    this.animateId = animateId;

    let y = this.y + value;

    if (this.userCar) {
      if (y < this.rangeY.min) {
        y = this.rangeY.min;
      } else if (y > this.rangeY.max - this.getCarHeight) {
        y = this.rangeY.max - this.getCarHeight;
      }
    }

    this.y = y;
  };

  setPositionNoAnimation(x?: number, y?: number): void {
    if (x !== undefined) {
      this.x = x;
    }
    if (y !== undefined) {
      this.y = y;
    }
  }

  // Cтолкновение
  collide = (car: Car): boolean => {
    let hit = false;
    if (this.y < car.y + car.getCarHeight && this.y + this.getCarHeight > car.y) {
      if (this.x + this.getCarWidth > car.x && this.x < car.x + car.getCarWidth) {
        hit = true;
      }
    }
    return hit;
  };

  duration = 300;

  // Методы для перемещения автомобиля
  toLeft = (): void => {
    cancelAnimationFrame(this.animateId);
    animate((time: number) => time + this.speed, this.setX, this.duration, -1);
  };

  toRight = (): void => {
    cancelAnimationFrame(this.animateId);
    animate((time: number) => time + this.speed, this.setX, this.duration, 1);
  };

  toUp = (): void => {
    cancelAnimationFrame(this.animateId);
    animate((time: number) => time + this.speed, this.setY, this.duration, -1);
  };

  toDown = (): void => {
    cancelAnimationFrame(this.animateId);
    animate((time: number) => time + this.speed, this.setY, this.duration, 1);
  };

  cancelAction = (): void => {
    cancelAnimationFrame(this.animateId);
  };
}
