"use strict";

import Direction from './Direction.js';
import Coordinate from './Coordinate.js';

export default class Hex extends Coordinate {

  constructor() {
    super();
  }

  toAxial() {
    return this;
  }

  toCube() {
    return this;
  }

  directionCoordinate(dir) {
    return super.directionCoordinate(Direction[dir]);
  }
}
