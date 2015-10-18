"use strict";

import Point from './model/illustration/Point.js'
import Hex from './model/illustration/Hex.js'

import Direction from './model/coordinate/Direction.js';
import Coordinate from './model/coordinate/Coordinate.js';
import HexCoor from './model/coordinate/Hex.js';
import Cube from './model/coordinate/Cube.js';
import Axial from './model/coordinate/Axial.js';

export default {
  illustration: {
    Point,
    Hex: Hex
  },
  coordinate: {
    Direction,
    Coordinate,
    HexCoor,
    Cube,
    Axial
  }
}
