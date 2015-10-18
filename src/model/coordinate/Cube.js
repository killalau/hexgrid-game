"use strict";

import Hex from './Hex.js';
import Axial from './Axial.js';

export default class Cube extends Hex {
  static Identity() {
    return new Cube(1,1,1);
  }

  static Zero() {
    return new Cube();
  }

  constructor(x = 0, y = 0, z = 0) {
    super();
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  validateClass(coor) {
    return super.validateClass(coor, 'Cube');
  }

  toAxial() {
    return new Axial(this.x, this.z);
  }

  clone() {
    return new Cube(this.x, this.y, this.z);
  }

  equal(coor) {
    this.validateClass(coor);
    return coor.x === this.x && coor.y === this.y && coor.z === this.z;
  }

  isValid() {
    return this.x + this.y + this.z === 0;
  }

  _math(coor, method){
    let isNum = !isNaN(coor);
    let x = coor, y = coor, z = coor;
    if(!isNum){
      this.validateClass(coor);
      ({x, y, z} = coor);
    }
    let ret = this.clone();
    switch(method){
      case 'add':
        ret.x = ret.x + x || 0;
        ret.y = ret.y + y || 0;
        ret.z = ret.z + z || 0;
        break;
      case 'sub':
        ret.x = ret.x - x || 0;
        ret.y = ret.y - y || 0;
        ret.z = ret.z - z || 0;
        break;
      case 'mul':
        ret.x = ret.x * x || 0;
        ret.y = ret.y * y || 0;
        ret.z = ret.z * z || 0;
        break;
      case 'div':
        ret.x = ret.x / x || 0;
        ret.y = ret.y / y || 0;
        ret.z = ret.z / z || 0;
        break;
    }
    return ret;
  }

  add(coor) {
    return this._math(coor, 'add');
  }

  sub(coor) {
    return this._math(coor, 'sub');
  }

  mul(coor) {
    return this._math(coor, 'mul');
  }

  div(coor) {
    return this._math(coor, 'div');
  }

  round() {
    let rx = Math.round(this.x) || 0;
    let ry = Math.round(this.y) || 0;
    let rz = Math.round(this.z) || 0;
    let xDiff = Math.abs(rx - this.x);
    let yDiff = Math.abs(ry - this.y);
    let zDiff = Math.abs(rz - this.z);

    if(xDiff > yDiff && xDiff > zDiff){
      rx = -ry-rz || 0;
    }else if(yDiff > zDiff){
      ry = -rx-rz || 0;
    }else{
      rz = -rx-ry || 0;
    }
    return new Cube(rx, ry, rz);
  }

  availableDirection() {
    return [
      new Cube(+1, -1,  0), new Cube(+1,  0, -1), new Cube( 0, +1, -1),
      new Cube(-1, +1,  0), new Cube(-1,  0, +1), new Cube( 0, -1, +1)
    ];
  }

  availableDiagonal() {
    return [
      new Cube(+2, -1, -1), new Cube(+1, +1, -2), new Cube(-1, +2, -1),
      new Cube(-2, +1, +1), new Cube(-1, -1, +2), new Cube(+1, -2, +1)
    ];
  }

  distance(coor) {
    this.validateClass(coor);
    return (
      Math.abs(this.x - coor.x) +
      Math.abs(this.y - coor.y) +
      Math.abs(this.z - coor.z)
    ) / 2;
  }

  lineWith(coor) {
    function cubeInt(a, b, t){
      return new Cube(a.x + (b.x - a.x) * t,
                      a.y + (b.y - a.y) * t,
                      a.z + (b.z - a.z) * t);
    }
    let N = this.distance(coor);
    let results = [];
    for(let i = 0; i <= N; i++){
      results.push(cubeInt(this, coor, 1 / N * i).round());
    }
    return results;
  }

  range(N) {
    super.range(N);
    return this.intercept(N);
  }

  intercept(N, otherCenters) {
    this.validatePositiveNumber(N, 'intercept(N, otherCenters)', 'N');
    if(otherCenters != null && !Array.isArray(otherCenters)){
      throw new RangeError('Expect array for intercept(N, otherCenters), but otherCenters is: ' + otherCenters);
    }
    let results = [];
    let centers = [this].concat(otherCenters||[]);
    let xs = centers.map(h => h.x);
    let ys = centers.map(h => h.y);
    let zs = centers.map(h => h.z);
    let minX = Math.max.apply(Math, xs.map(v => v - N));
    let maxX = Math.min.apply(Math, xs.map(v => v + N));
    let minY = Math.max.apply(Math, ys.map(v => v - N));
    let maxY = Math.min.apply(Math, ys.map(v => v + N));
    let minZ = Math.max.apply(Math, zs.map(v => v - N));
    let maxZ = Math.min.apply(Math, zs.map(v => v + N));

    for(let x = minX; x <= maxX; x++){
      let loopYMin = Math.max(minY, -x-maxZ);
      let loopYMax = Math.min(maxY, -x-minZ);
      for(let y = loopYMin; y <= loopYMax; y++){
        let z = -x-y;
        results.push(new Cube(x || 0, y || 0, z || 0));
      }
    }
    return results;
  }

  _rotate(center, dir){
    let clockwise = dir >= 0;
    let c = center;
    if(c == null){
      c = new Cube();
    }
    this.validateClass(c);

    let vector = this.sub(c);
    let [x,y,z] = Object.keys(vector).map(key => (vector[key])* -1 || 0);
    if(clockwise){
      return new Cube(z, x, y).add(c);
    }else{
      return new Cube(y, z, x).add(c);
    }
  }

  rotateAt(center){
    return this._rotate(center, 1);
  }

  rotateAcwAt(center){
    return this._rotate(center, -1);
  }

  ring(N){
    this.validatePositiveNumber(N, 'ring(N)', 'N');
    let results = [];

    if(N === 0){
      results.push(this);
    }else{
      let cur = this.directionCoordinate(4).mul(N).add(this);
      for(let i = 0; i < 6; i++){
        for(let j = 0; j < N; j++){
          results.push(cur);
          cur = cur.neighbor(i);
        }
      }
    }
    return results;
  }

  spiral(N){
    this.validatePositiveNumber(N, 'spiral(N)', 'N');
    let results = [this];
    for(let k = 1; k <= N; k++){
      results = results.concat(this.ring(k));
    }
    return results;
  }
}
