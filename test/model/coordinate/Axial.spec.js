import {expect} from 'chai';

import Axial from '../../../src/model/coordinate/Axial.js';
import Cube from '../../../src/model/coordinate/Cube.js';
import {D,E,W,A,Z,X} from '../../../src/model/coordinate/Direction.js';

describe('Class Axial', () => {

  describe('basic function', () => {

    it('constructor', () => {
      let axial = null;

        axial = new Axial();
        expect(axial.q).to.equal(0);
        expect(axial.r).to.equal(0);

        axial = new Axial(1,2);
        expect(axial.q).to.equal(1);
        expect(axial.r).to.equal(2);
    });

    it('convertion', () => {
      let cube = null;

      cube = new Axial().toCube();
      expect(cube, 'to cube testing 1').to.deep.equal({ x:0, y:0, z:0 });
      expect(cube.isValid(), 'to cube is valid').to.be.true;

      cube = new Axial(-2,3).toCube();
      expect(cube, 'to cube testing 2').to.deep.equal({ x:-2, y:-1, z:3 });
      expect(cube.isValid(), 'to cube is valid').to.be.true;
    });

    it('clone', () => {
      let axial1 = new Axial(1,2);
      let axial2 = axial1.clone();

      expect(axial1 !== axial2, 'is not the same object').to.be.true;
      expect(axial1, 'all values the same').to.deep.equal(axial2);

      axial2.r = 5;
      expect(axial2.r, 'modify cloned object').to.equal(5);
      expect(axial1.r, 'would not affect original object').to.equal(2);
      expect(axial1, 'so 2 objects are different now').to.not.deep.equal(axial2);
    });

    it('equal', () => {
      let axial1 = new Axial();
      let axial2 = new Axial(1,2);

      expect(axial1.equal(axial2)).to.be.false;

      axial1.q = 1;
      expect(axial1.equal(axial2)).to.be.false;

      axial1.r = 2;
      expect(axial1.equal(axial2)).to.be.true;
    });

    it('static function', () => {
      expect(Axial.Zero(), 'zero').to.deep.equal(new Axial(0,0));
      expect(Axial.Identity(), 'identity').to.deep.equal(new Axial(1,1));
    });

    it('math', () => {
      let axial = new Axial();
      expect(axial, 'init value')
        .to.deep.equal(new Axial(0,0));

      expect(axial.add(1).add(new Axial(5,3)), 'add')
        .to.deep.equal(new Axial(6,4));

      expect(axial, 'add is immultable')
        .to.deep.equal(new Axial(0,0));

      expect(axial.add(10).sub(5).sub(new Axial(2,-2)), 'sub')
        .to.deep.equal(new Axial(3,7));

      expect(axial, 'sub is immultable')
        .to.deep.equal(new Axial(0,0));

      expect(new Axial(1,2).mul(new Axial(1,-1)).mul(2).mul(new Axial(3,2)), 'mul')
        .to.deep.equal(new Axial(6,-8));

      expect(axial, 'mul is immultable')
        .to.deep.equal(new Axial(0,0));

      expect(new Axial(20,20).div(2).div(new Axial(1,-2)), 'div')
        .to.deep.equal(new Axial(10,-5));

      expect(axial, 'div is immultable')
        .to.deep.equal(new Axial(0,0));

      expect(new Axial(5,3).mul(new Axial()), 'mul with 0')
        .to.deep.equal(new Axial(0,0));
    });
  });

  describe('navagate', () => {

    it('neighbor', () => {
      let axial = new Axial();
      axial = axial.neighbor(E).neighbor(D);
      expect(axial, 'move 1').to.deep.equal(new Axial(2,-1));

      axial = axial.neighbor(X).neighbor(X).neighbor(Z);
      expect(axial, 'move 2').to.deep.equal(new Axial(1,2));

      axial = axial.neighbor(A).neighbor(W);
      expect(axial, 'move 2').to.deep.equal(new Axial(0,1));
    });

    it('diagonal', () => {
      let axial = new Axial();
      axial = axial.diagonal(0).diagonal(1);
      expect(axial, 'move 1').to.deep.equal(new Axial(3, -3));

      axial = axial.diagonal(2).diagonal(3).diagonal(3);
      expect(axial, 'move 2').to.deep.equal(new Axial(-2, -2));

      axial = axial.diagonal(4).diagonal(5);
      expect(axial, 'move 3').to.deep.equal(new Axial(-2, 1));
    });

    it('distance', () => {
      expect(new Axial(0,0).distance(new Axial(-3,-1)), 'check 1').to.equal(4);
      expect(new Axial(0,0).distance(new Axial(0,0)), 'check 2').to.equal(0);
      expect(new Axial(-3,2).distance(new Axial(4,-2)), 'check 3').to.equal(7);
    });

  });

  describe('drawing', () => {

    it('line', () => {
      let line = [];
      let expectLine = [];

      expectLine = [
        new Axial(0,0), new Axial(-1,0), new Axial(-2,0),
        new Axial (-2,-1), new Axial(-3,-1), new Axial(-4,-1)
      ];
      line = new Axial(0,0).lineWith(new Axial(-4,-1));
      expect(line, 'line 1').to.deep.equal(expectLine);

      expectLine = [
        new Axial(0,-1), new Axial(-1,0), new Axial(-1,1),
        new Axial (-2,2), new Axial(-2,3), new Axial(-3,4)
      ];
      line = new Axial(0,-1).lineWith(new Axial(-3,4));
      expect(line, 'line 2').to.deep.equal(expectLine);
    });

    it('range', () => {
      let result = [];
      let expectResult = [];

      expect(() => { new Axial(0,0,0).range(); }, 'range null')
        .to.throw(/^Expect positive number for range\(N\)/);

      expectResult = [
        new Axial(0,0)
      ];
      result = new Axial(0,0).range(0);
      expect(result, 'range 0').to.deep.have.members(expectResult);

      expectResult = [
        new Axial(1,-1),
        new Axial(1,-2), new Axial(2,-2), new Axial(0,-1),
        new Axial(2,-1), new Axial(0,0), new Axial(1,0)
      ];
      result = new Axial(1,-1).range(1);
      expect(result, 'range 1').to.deep.have.members(expectResult);

      expectResult = [
        new Axial(-3,1),new Axial(-2,1),new Axial(-1,1),
        new Axial(-4,2), new Axial(-3,2), new Axial(-2,2), new Axial(-1,2),
        new Axial(-5,3), new Axial(-4,3), new Axial(-3,3), new Axial(-2,3), new Axial(-1,3),
        new Axial(-5,4), new Axial(-4,4), new Axial(-3,4), new Axial(-2,4),
        new Axial(-5,5), new Axial(-4,5), new Axial(-3,5)
      ];
      result = new Axial(-3,3).range(2);
      expect(result, 'range 2').to.deep.have.members(expectResult);
    });

    it('intercept', () => {
      let result = [];
      let expectResult = [];

      expectResult = [];
      result = new Axial(0,0).intercept(0, [new Axial(1,-1)]);
      expect(result, 'N 0, no intercept')
        .to.deep.have.members(expectResult);

      expectResult = [
        new Axial(1,-2)
      ];
      result = new Axial(1,-2).intercept(0, [new Axial(1,-2)]);
      expect(result, 'N 0, has intercept')
        .to.deep.have.members(expectResult);

      expectResult = [];
      result = new Axial(1,-1).intercept(1, [new Axial(-1,2)]);
      expect(result, 'N 1, no intercept')
        .to.deep.have.members(expectResult);

      expectResult = [
        new Axial(2,-1), new Axial(3,-1)
      ];
      result = new Axial(3,-2).intercept(1, [new Axial(2,0)]);
      expect(result, 'N 1, has intercept')
        .to.deep.have.members(expectResult);

      expectResult = [
        new Axial(3,-1)
      ];
      result = new Axial(3,-2).intercept(1, [new Axial(2,0), new Axial(3,0)]);
      expect(result, 'N 1, multiple center, has intercept')
        .to.deep.have.members(expectResult);

    });

    it('rotate', () => {
      expect(new Axial(2,1).rotateAt(), 'case 1: rotate clockwise')
        .to.deep.equal(new Axial(-1,3));

      expect(new Axial(2,1).rotateAcwAt(), 'case 1: rotate anti-clockwise')
        .to.deep.equal(new Axial(3,-2));

      expect(new Axial(0,1).rotateAt(new Axial(0,2)), 'case 2: rotate clockwise, with center')
        .to.deep.equal(new Axial(1,1));

      expect(new Axial(0,1).rotateAcwAt(new Axial(0,2)), 'case 2: rotate anti-clockwise, with center')
        .to.deep.equal(new Axial(-1,2));
    });

    it('ring', () => {
      let result = [];
      let expectResult = [];

      expectResult = [
        new Axial()
      ];
      result = new Axial().ring(0);
      expect(result, 'ring 0').to.deep.equal(expectResult);

      expectResult = [
        new Axial(-1,1), new Axial(0,1), new Axial(1,0),
        new Axial(1,-1), new Axial(0,-1), new Axial(-1,0)
      ];
      result = new Axial().ring(1);
      expect(result, 'ring 1').to.deep.equal(expectResult);

      expectResult = [
        new Axial(-2,2), new Axial(-1,2), new Axial(0,2),
        new Axial(1,1), new Axial(2,0), new Axial(2,-1),
        new Axial(2,-2), new Axial(1,-2), new Axial(0,-2),
        new Axial(-1,-1), new Axial(-2,0), new Axial(-2,1)
      ];
      result = new Axial().ring(2);
      expect(result, 'ring 2').to.deep.equal(expectResult);

      expectResult = [
        new Axial(0,3), new Axial(1,3), new Axial(2,2),
        new Axial(2,1), new Axial(1,1), new Axial(0,2)
      ];
      result = new Axial(1,2).ring(1);
      expect(result, 'ring 3').to.deep.equal(expectResult);
    });

    it('spiral', () => {
      let result = [];
      let expectResult = [];

      expectResult = [
        new Axial()
      ];
      result = new Axial().spiral(0);
      expect(result, 'spiral 0').to.deep.equal(expectResult);

      expectResult = [
        new Axial(),
        new Axial(-1,1), new Axial(0,1), new Axial(1,0),
        new Axial(1,-1), new Axial(0,-1), new Axial(-1,0)
      ];
      result = new Axial().spiral(1);
      expect(result, 'spiral 1').to.deep.equal(expectResult);

      expectResult = [
        new Axial(),
        new Axial(-1,1), new Axial(0,1), new Axial(1,0),
        new Axial(1,-1), new Axial(0,-1), new Axial(-1,0),
        new Axial(-2,2), new Axial(-1,2), new Axial(0,2),
        new Axial(1,1), new Axial(2,0), new Axial(2,-1),
        new Axial(2,-2), new Axial(1,-2), new Axial(0,-2),
        new Axial(-1,-1), new Axial(-2,0), new Axial(-2,1)
      ];
      result = new Axial().spiral(2);
      expect(result, 'spiral 2').to.deep.equal(expectResult);

      expectResult = [
        new Axial(1,2),
        new Axial(0,3), new Axial(1,3), new Axial(2,2),
        new Axial(2,1), new Axial(1,1), new Axial(0,2)
      ];
      result = new Axial(1,2).spiral(1);
      expect(result, 'spiral 3').to.deep.equal(expectResult);
    });

  });

});
