"use strict";

import Hex from './Hex.js';
import Cube from './Cube.js';

export default class Axial extends Hex{
  static Identity() {
    return new Axial(1,1);
  }

  static Zero() {
    return new Axial();
  }

  constructor(q = 0, r = 0) {
    super();
    this.q = q || 0;
    this.r = r || 0;
  }

  validateClass(coor) {
    return super.validateClass(coor, 'Axial');
  }

  toCube() {
    return new Cube(this.q, -this.q-this.r || 0, this.r);
  }

  clone() {
    return new Axial(this.q, this.r);
  }

  equal(coor) {
    this.validateClass(coor);
    return coor.q === this.q && coor.r === this.r;
  }

  _math(coor, method){
    let isNum = !isNaN(coor);
    let q = coor, r = coor;
    if(!isNum){
      this.validateClass(coor);
      ({q, r} = coor);
    }
    let ret = this.clone();
    switch(method){
      case 'add':
        ret.q = ret.q + q || 0;
        ret.r = ret.r + r || 0;
        break;
      case 'sub':
        ret.q = ret.q - q || 0;
        ret.r = ret.r - r || 0;
        break;
      case 'mul':
        ret.q = ret.q * q || 0;
        ret.r = ret.r * r || 0;
        break;
      case 'div':
        ret.q = ret.q / q || 0;
        ret.r = ret.r / r || 0;
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
    return this.toCube().round().toAxial();
  }

  availableDirection() {
    // return [
    //    new Axial(+1,  0), new Axial(+1, -1), new Axial( 0, -1),
    //    new Axial(-1,  0), new Axial(-1, +1), new Axial( 0, +1)
    // ];
    return new Cube().availableDirection().map(c => c.toAxial());
  }

  availableDiagonal() {
    return new Cube().availableDiagonal().map(c => c.toAxial());
  }

  distance(coor) {
    return this.toCube().distance(coor.toCube());;
  }

  lineWith(coor) {
    return this.toCube().lineWith(coor.toCube()).map(c => c.toAxial());
  }

  range(N) {
    return this.toCube().range(N).map(c => c.toAxial());
  }

  intercept(N, otherCenters) {
    return this.toCube()
      .intercept(N, (otherCenters||[]).map(c => c.toCube()))
      .map(c => c.toAxial());
  }

  rotateAt(center){
    let c = center ? center.toCube() : center;
    return this.toCube().rotateAt(c).toAxial();
  }

  rotateAcwAt(center){
    let c = center ? center.toCube() : center;
    return this.toCube().rotateAcwAt(c).toAxial();
  }

  ring(N){
    return this.toCube().ring(N).map(c => c.toAxial());
  }

  spiral(N){
    return this.toCube().spiral(N).map(c => c.toAxial());
  }

}
