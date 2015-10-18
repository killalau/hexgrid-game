"use strict";

import Point from './Point.js';

export default class Hex {
  constructor(x = 0, y = 0, size = 1, isFlat = true){
    this.x = x;
    this.y = y;
    this.size = size;
    this.isFlat = isFlat;
  }

  get width(){
    return this.isFlat ? this.size * 2 : Math.sqrt(3) / 2 * this.height;
  }

  get height(){
    return this.isFlat ? Math.sqrt(3) / 2 * this.width : this.size * 2;
  }

  get horiz(){
    return this.isFlat ? this.width * 3 / 4 : this.width;
  }

  get vert(){
    return this.isFlat ? this.height : this.height * 3 / 4;
  }

  get conners(){
    return [0, 1, 2, 3, 4, 5].map(i => this.connerAt(i));
  }

  connerAt(i){
    var angle_deg = 60 * i + (this.isFlat ? 0 : 30);
    var angle_rad = Math.PI / 180 * angle_deg;
    var x = this.x + this.size * Math.cos(angle_rad);
    var y = this.y + this.size * Math.sin(angle_rad);
    return new Point(x, y);
  }
}
