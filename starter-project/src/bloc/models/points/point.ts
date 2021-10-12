export interface Point {
  x: number;
  y: number;
}

export class Point2D implements Point {
  /**
   *
   */
  constructor(public x: number, public y: number) {}

  move(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }
}
