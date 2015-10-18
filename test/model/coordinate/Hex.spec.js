import {expect} from 'chai';

import Point from '../../../src/model/illustration/Point.js';
import Hex from '../../../src/model/illustration/Hex.js';

function round(v = 0, dp = 4){
  return Math.round(v * Math.pow(10, dp)) / Math.pow(10, dp);
}

describe('Class Hex', () => {

  describe('constructor', () => {

    it('default value', () => {
      let hex = new Hex();
      expect(hex.x).to.equal(0);
      expect(hex.y).to.equal(0);
      expect(hex.size).to.equal(1);
      expect(hex.isFlat).to.equal(true);
    });

    it('init value', () => {
      let hex = new Hex(1, 2, 3, false);
      expect(hex.x).to.equal(1);
      expect(hex.y).to.equal(2);
      expect(hex.size).to.equal(3);
      expect(hex.isFlat).to.equal(false);
    });

  });

  describe('dimention', () => {

    it('width and height', () => {
      let hex;

      hex = new Hex();
      expect(hex.width).to.equal(2);
      expect(hex.height).to.equal(Math.sqrt(3)/2 * 2);

      hex = new Hex(10, 10, 15, true);
      expect(hex.width).to.equal(30);
      expect(hex.height).to.equal(Math.sqrt(3)/2 * 30);

      hex = new Hex(0, 0, 1, false);
      expect(hex.width).to.equal(Math.sqrt(3)/2 * 2);
      expect(hex.height).to.equal(2);

      hex = new Hex(10, 10, 15, false);
      expect(hex.width).to.equal(Math.sqrt(3)/2 * 30);
      expect(hex.height).to.equal(30);
    });

  });

  describe('conners', () => {

    it('flat topped', () => {
      let w = (new Hex(0, 0, 0.5, true)).width;
      let h = (new Hex(0, 0, 0.5, true)).height;
      let hex1 = new Hex(0.5 * w, h, 0.5 * w, true);
      let conners1 = hex1.conners;
      let c1 = [
        {x:1, y:1},
        {x:0.75, y:1.5},
        {x:0.25, y:1.5},
        {x:0, y:1},
        {x:0.25, y:0.5},
        {x:0.75, y:0.5}
      ];
      conners1.forEach((v, i) => {
        expect(round(v.x)).to.equal(round(c1[i].x * w));
        expect(round(v.y)).to.equal(round(c1[i].y * h));
      });

      let hex2 = new Hex(1.25 * w, 0.5 * h, 0.5 * w, true);
      let conners2 = hex2.conners;
      let c2 = [
        {x:1.75, y:0.5},
        {x:1.5, y:1},
        {x:1, y:1},
        {x:0.75, y: 0.5},
        {x:1, y:0},
        {x:1.5, y:0}
      ];
      conners2.forEach((v, i) => {
        expect(round(v.x)).to.equal(round(c2[i].x * w));
        expect(round(v.y)).to.equal(round(c2[i].y * h));
      });
    });

    it('pointy topped', () => {

      let w = (new Hex(0, 0, 0.5, false)).width;
      let h = (new Hex(0, 0, 0.5, false)).height;
      let hex1 = new Hex(1 * w, 0.5 * h, 0.5, false);
      let conners1 = hex1.conners;
      let c1 = [
        {x:1.5, y:0.75},
        {x:1, y:1},
        {x:0.5, y:0.75},
        {x:0.5, y:0.25},
        {x:1, y:0},
        {x:1.5, y:0.25}
      ];

      conners1.forEach((v, i) => {
        expect(round(v.x)).to.equal(round(c1[i].x * w));
        expect(round(v.y)).to.equal(round(c1[i].y * h));
      });

    });

  });

});
