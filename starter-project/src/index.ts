import { Point, Point2D } from './bloc/models';
import { Log } from './core/helpers';

const point = new Point2D(0, 0);
point.move(-2, 4);


const point2: Point = new Point2D(1, 1);
point.move(-3, 10);

Log(point, point2);
