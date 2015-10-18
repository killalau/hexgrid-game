import {expect} from 'chai';

import Point from '../../../src/model/illustration/Point.js';

describe('Class Point', () => {

  describe('constructor', () => {

    it('default value', () => {
      let p = new Point();
      expect(p.x).to.equal(0);
      expect(p.y).to.equal(0);
    });

    it('init value', () => {
      let p1 = new Point(2);
      expect(p1.x).to.equal(2);
      expect(p1.y).to.equal(0);

      let p2 = new Point(3.5,4.5);
      expect(p2.x).to.equal(3.5);
      expect(p2.y).to.equal(4.5);
    });

  });

});
