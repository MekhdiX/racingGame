import road from 'assets/Road.png';

export class Road {
  y = 0;

  // Размер дороги
  height: number;

  // Фотография дороги
  image = new Image();

  // Скорость движения дороги
  private speed = 25;

  constructor(height: number) {
    this.height = height;
    this.image.onload = () => {
      this.update();
    };

    this.image.src = road;
  }

  // Рисуем дорогу
  update(): void {
    this.y += this.speed;

    // Если значение Y больше высоты страницы рисуем дорогу с начала
    if (this.y > this.height) {
      this.y = this.speed;
    }
  }
}
