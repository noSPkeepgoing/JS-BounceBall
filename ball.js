export class Ball {
  constructor(stageWidth, stageHeight, radius, speed) {
    this.radius = radius;
    this.v = speed;
    this.vx = this.v;
    this.vy = this.v;

    const diameter = this.radius * 2;
    // 공의 원점의 위치를 반지름 ~ 화면크기-반지름 사이에 랜덤으로 배치
    this.x = this.radius + Math.random() * (stageWidth - diameter);
    this.y = this.radius + Math.random() * (stageHeight - diameter);
  }

  // 공을 화면에 그려줌
  draw(ctx, stageWidth, stageHeight) {
    window.addEventListener('mousedown', (event) => this.catchDownBall(event));
    window.addEventListener('mouseup', (event) =>
      this.catchUpBall(event, stageWidth)
    );

    this.x += this.vx;
    this.y += this.vy;

    this.bounceBall(stageWidth, stageHeight);

    ctx.fillStyle = '#B4302C';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  // 공이 윈도우에 부딪히면 방향을 바꿈
  bounceBall(stageWidth, stageHeight) {
    const minX = this.radius;
    const maxX = stageWidth - this.radius;
    const minY = this.radius;
    const maxY = stageHeight - this.radius;

    if (this.x <= minX || this.x >= maxX) {
      this.vx *= -1;
      this.x += this.vx;
    } else if (this.y <= minY || this.y >= maxY) {
      this.vy *= -1;
      this.y += this.vy;
    }
  }

  // 화면을 붙잡았을 때
  catchDownBall(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.vx = 0;
    this.vy = 0;
  }

  // 화면을 놓았을 때
  // 공이 떨어지는 느낌?
  catchUpBall(e, stageWidth) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.vy = this.v;

    if (this.x >= stageWidth / 2) {
      this.vx = -this.v;
    } else if (this.x < stageWidth / 2) {
      this.vx = this.v;
    }
  }
}
