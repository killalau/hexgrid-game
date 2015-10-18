import {expect} from 'chai';

import Cube from '../../../src/model/coordinate/Cube.js';
import {D,E,W,A,Z,X} from '../../../src/model/coordinate/Direction.js';

describe('Class Cube', () => {

  describe('basic function', () => {

    it('constructor', () => {
      let cube = null;

      cube = new Cube();
      expect(cube.x).to.equal(0);
      expect(cube.y).to.equal(0);
      expect(cube.z).to.equal(0);

      cube = new Cube(1,2,3);
      expect(cube.x).to.equal(1);
      expect(cube.y).to.equal(2);
      expect(cube.z).to.equal(3);
    });

    it('convertion', () => {
      expect(new Cube().toAxial(), 'to axial testing 1').to.deep.equal({ q:0, r:0 });
      expect(new Cube(-2,3,-1).toAxial(), 'to axial testing 2').to.deep.equal({ q:-2, r:-1 });
    });

    it('clone', () => {
      let cube1 = new Cube(1,2,3);
      let cube2 = cube1.clone();

      expect(cube1 !== cube2, 'is not the same object').to.be.true;
      expect(cube1, 'all values the same').to.deep.equal(cube2);

      cube2.x = 5;
      expect(cube2.x, 'modify cloned object').to.equal(5);
      expect(cube1.x, 'would not affect original object').to.equal(1);
      expect(cube1, 'so 2 objects are different now').to.not.deep.equal(cube2);
    });

    it('equal', () => {
      let cube1 = new Cube();
      let cube2 = new Cube(0,1,2);

      expect(cube1.equal(cube2)).to.be.false;

      cube1.y = 1;
      expect(cube1.equal(cube2)).to.be.false;

      cube1.z = 2;
      expect(cube1.equal(cube2)).to.be.true;
    });

    it('isValid', () => {
      expect(new Cube(1,2,3).isValid(), 'invalid cube').to.be.false;
      expect(new Cube(1,5,-6).isValid(), 'valid cube').to.be.true;
    });

    it('static function', () => {
      expect(Cube.Zero(), 'zero').to.deep.equal(new Cube(0,0,0));
      expect(Cube.Identity(), 'identity').to.deep.equal(new Cube(1,1,1));
    });

    it('math', () => {
      let cube = new Cube();
      expect(cube, 'init value')
        .to.deep.equal(new Cube(0,0,0));

      expect(cube.add(1).add(new Cube(5,3,0)), 'add')
        .to.deep.equal(new Cube(6,4,1));

      expect(cube, 'add is immultable')
        .to.deep.equal(new Cube(0,0,0));

      expect(cube.add(10).sub(5).sub(new Cube(2,-2,2)), 'sub')
        .to.deep.equal(new Cube(3,7,3));

      expect(cube, 'sub is immultable')
        .to.deep.equal(new Cube(0,0,0));

      expect(new Cube(1,2,3).mul(new Cube(1,1,-1)).mul(2).mul(new Cube(6,3,2)), 'mul')
        .to.deep.equal(new Cube(12,12,-12));

      expect(cube, 'mul is immultable')
        .to.deep.equal(new Cube(0,0,0));

      expect(new Cube(20,20,20).div(2).div(new Cube(1,-2,-4)), 'div')
        .to.deep.equal(new Cube(10,-5,-2.5));

      expect(cube, 'div is immultable')
        .to.deep.equal(new Cube(0,0,0));

      expect(new Cube(5,3,1).mul(new Cube()), 'mul with 0')
        .to.deep.equal(new Cube(0,0,0));
    });
  });

  describe('navagate', () => {

    it('neighbor', () => {
      let cube = new Cube();
      cube = cube.neighbor(E).neighbor(D);
      expect(cube, 'move 1').to.deep.equal(new Cube(2,-1,-1));

      cube = cube.neighbor(X).neighbor(X).neighbor(Z);
      expect(cube, 'move 2').to.deep.equal(new Cube(1,-3,2));

      cube = cube.neighbor(A).neighbor(W);
      expect(cube, 'move 2').to.deep.equal(new Cube(0,-1,1));
    });

    it('diagonal', () => {
      let cube = new Cube();
      cube = cube.diagonal(0).diagonal(1);
      expect(cube, 'move 1').to.deep.equal(new Cube(3, 0, -3));

      cube = cube.diagonal(2).diagonal(3).diagonal(3);
      expect(cube, 'move 2').to.deep.equal(new Cube(-2, 4, -2));

      cube = cube.diagonal(4).diagonal(5);
      expect(cube, 'move 3').to.deep.equal(new Cube(-2, 1, 1));
    });

    it('distance', () => {
      expect(new Cube(0,0,0).distance(new Cube(-3,4,-1)), 'check 1').to.equal(4);
      expect(new Cube(0,0,0).distance(new Cube(0,0,0)), 'check 2').to.equal(0);
      expect(new Cube(-3,1,2).distance(new Cube(4,-2,-2)), 'check 3').to.equal(7);
    });

  });

  describe('drawing', () => {

    it('line', () => {
      let line = [];
      let expectLine = [];

      expectLine = [
        new Cube(0,0,0), new Cube(-1,1,0), new Cube(-2,2,0),
        new Cube (-2,3,-1), new Cube(-3,4,-1), new Cube(-4,5,-1)
      ];
      line = new Cube(0,0,0).lineWith(new Cube(-4,5,-1));
      expect(line, 'line 1').to.deep.equal(expectLine);

      expectLine = [
        new Cube(0,1,-1), new Cube(-1,1,0), new Cube(-1,0,1),
        new Cube (-2,0,2), new Cube(-2,-1,3), new Cube(-3,-1,4)
      ];
      line = new Cube(0,1,-1).lineWith(new Cube(-3,-1,4));
      expect(line, 'line 2').to.deep.equal(expectLine);
    });

    it('range', () => {
      let result = [];
      let expectResult = [];

      expect(() => { new Cube(0,0,0).range(); }, 'range null')
        .to.throw(/^Expect positive number for range\(N\)/);

      expectResult = [
        new Cube(0,0,0)
      ];
      result = new Cube(0,0,0).range(0);
      expect(result, 'range 0').to.deep.have.members(expectResult);

      expectResult = [
        new Cube(1,0,-1),
        new Cube(1,1,-2), new Cube(2,0,-2), new Cube(0,1,-1),
        new Cube(2,-1,-1), new Cube(0,0,0), new Cube(1,-1,0)
      ];
      result = new Cube(1,0,-1).range(1);
      expect(result, 'range 1').to.deep.have.members(expectResult);

      expectResult = [
        new Cube(-3,2,1),new Cube(-2,1,1),new Cube(-1,0,1),
        new Cube(-4,2,2), new Cube(-3,1,2), new Cube(-2,0,2), new Cube(-1,-1,2),
        new Cube(-5,2,3), new Cube(-4,1,3), new Cube(-3,0,3), new Cube(-2,-1,3), new Cube(-1,-2,3),
        new Cube(-5,1,4), new Cube(-4,0,4), new Cube(-3,-1,4), new Cube(-2,-2,4),
        new Cube(-5,0,5), new Cube(-4,-1,5), new Cube(-3,-2,5)
      ];
      result = new Cube(-3,0,3).range(2);
      expect(result, 'range 2').to.deep.have.members(expectResult);
    });

    it('intercept', () => {
      let result = [];
      let expectResult = [];

      expectResult = [];
      result = new Cube(0,0,0).intercept(0, [new Cube(1,0,-1)]);
      expect(result, 'N 0, no intercept')
        .to.deep.have.members(expectResult);

      expectResult = [
        new Cube(1,1,-2)
      ];
      result = new Cube(1,1,-2).intercept(0, [new Cube(1,1,-2)]);
      expect(result, 'N 0, has intercept')
        .to.deep.have.members(expectResult);

      expectResult = [];
      result = new Cube(1,0,-1).intercept(1, [new Cube(-1,-1,2)]);
      expect(result, 'N 1, no intercept')
        .to.deep.have.members(expectResult);

      expectResult = [
        new Cube(2,-1,-1), new Cube(3,-2,-1)
      ];
      result = new Cube(3,-1,-2).intercept(1, [new Cube(2,-2,0)]);
      expect(result, 'N 1, has intercept')
        .to.deep.have.members(expectResult);

      expectResult = [
        new Cube(3,-2,-1)
      ];
      result = new Cube(3,-1,-2).intercept(1, [new Cube(2,-2,0), new Cube(3,-3,0)]);
      expect(result, 'N 1, multiple center, has intercept')
        .to.deep.have.members(expectResult);

    });

    it('rotate', () => {
      expect(new Cube(2,-3,1).rotateAt(), 'case 1: rotate clockwise')
        .to.deep.equal(new Cube(-1, -2, 3));

      expect(new Cube(2,-3,1).rotateAcwAt(), 'case 1: rotate anti-clockwise')
        .to.deep.equal(new Cube(3, -1, -2));

      expect(new Cube(0,-1,1).rotateAt(new Cube(0,-2,2)), 'case 2: rotate clockwise, with center')
        .to.deep.equal(new Cube(1,-2,1));

      expect(new Cube(0,-1,1).rotateAcwAt(new Cube(0,-2,2)), 'case 2: rotate anti-clockwise, with center')
        .to.deep.equal(new Cube(-1,-1,2));
    });

    it('ring', () => {
      let result = [];
      let expectResult = [];

      expectResult = [
        new Cube()
      ];
      result = new Cube().ring(0);
      expect(result, 'ring 0').to.deep.equal(expectResult);

      expectResult = [
        new Cube(-1,0,1), new Cube(0,-1,1), new Cube(1,-1,0),
        new Cube(1,0,-1), new Cube(0,1,-1), new Cube(-1,1,0)
      ];
      result = new Cube().ring(1);
      expect(result, 'ring 1').to.deep.equal(expectResult);

      expectResult = [
        new Cube(-2,0,2), new Cube(-1,-1,2), new Cube(0,-2,2),
        new Cube(1,-2,1), new Cube(2,-2,0), new Cube(2,-1,-1),
        new Cube(2,0,-2), new Cube(1,1,-2), new Cube(0,2,-2),
        new Cube(-1,2,-1), new Cube(-2,2,0), new Cube(-2,1,1)
      ];
      result = new Cube().ring(2);
      expect(result, 'ring 2').to.deep.equal(expectResult);

      expectResult = [
        new Cube(0,-3,3), new Cube(1,-4,3), new Cube(2,-4,2),
        new Cube(2,-3,1), new Cube(1,-2,1), new Cube(0,-2,2)
      ];
      result = new Cube(1,-3,2).ring(1);
      expect(result, 'ring 3').to.deep.equal(expectResult);
    });

    it('spiral', () => {
      let result = [];
      let expectResult = [];

      expectResult = [
        new Cube()
      ];
      result = new Cube().spiral(0);
      expect(result, 'spiral 0').to.deep.equal(expectResult);

      expectResult = [
        new Cube(),
        new Cube(-1,0,1), new Cube(0,-1,1), new Cube(1,-1,0),
        new Cube(1,0,-1), new Cube(0,1,-1), new Cube(-1,1,0)
      ];
      result = new Cube().spiral(1);
      expect(result, 'spiral 1').to.deep.equal(expectResult);

      expectResult = [
        new Cube(),
        new Cube(-1,0,1), new Cube(0,-1,1), new Cube(1,-1,0),
        new Cube(1,0,-1), new Cube(0,1,-1), new Cube(-1,1,0),
        new Cube(-2,0,2), new Cube(-1,-1,2), new Cube(0,-2,2),
        new Cube(1,-2,1), new Cube(2,-2,0), new Cube(2,-1,-1),
        new Cube(2,0,-2), new Cube(1,1,-2), new Cube(0,2,-2),
        new Cube(-1,2,-1), new Cube(-2,2,0), new Cube(-2,1,1)
      ];
      result = new Cube().spiral(2);
      expect(result, 'spiral 2').to.deep.equal(expectResult);

      expectResult = [
        new Cube(1,-3,2),
        new Cube(0,-3,3), new Cube(1,-4,3), new Cube(2,-4,2),
        new Cube(2,-3,1), new Cube(1,-2,1), new Cube(0,-2,2)
      ];
      result = new Cube(1,-3,2).spiral(1);
      expect(result, 'spiral 3').to.deep.equal(expectResult);
    });

  });

});
