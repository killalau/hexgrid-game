"use strict";

export default class Coordinate {
  validateClass(coor, className) {
    if(!(coor instanceof this.constructor)){
      throw new TypeError('Input argument is not instance of ' + (className || 'Coordinate'));
    }
  }

  validatePositiveNumber(n, functionName, argumentName){
    if(!(n>=0)){
      throw new RangeError(`Expect positive number for ${functionName}, but ${argumentName} is: ${n}`);
    }
  }

  clone() {
    return new this.constructor();
  }

  equal(coor) {
    this.validateClass(coor);
    return coor === this;
  }

  add(coor) {
    this.validateClass(coor);
    return this.clone();
  }

  sub(cube) {
    this.validateClass(coor);
    return this.clone();
  }

  mul(coor) {
    this.validateClass(coor);
    return this.clone();
  }

  div(coor) {
    this.validateClass(coor);
    return this.clone();
  }

  round() {
    return this.clone();
  }

  availableDirection() {
    return [];
  }

  directionCoordinate(dir) {
    let ret = this.availableDirection()[dir];
    if(!ret){
      throw new RangeError('Invalid direction: ' + dir);
    }
    return ret;
  }

  availableDiagonal() {
    return [];
  }

  diagonalCoordinate(dir) {
    let ret = this.availableDiagonal()[dir];
    if(!ret){
      throw new RangeError('Invalid diagonal direction: ' + dir);
    }
    return ret;
  }

  neighbor(dir) {
    return this.clone().add(this.directionCoordinate(dir));
  }

  diagonal(dir) {
    return this.clone().add(this.diagonalCoordinate(dir));
  }

  distance(coor) {
    this.validateClass(coor);
    return 0;
  }

  line(coor) {
    return [this];
  }

  range(N) {
    this.validatePositiveNumber(N, 'range(N)', 'N');
    return [this];
  }
}
