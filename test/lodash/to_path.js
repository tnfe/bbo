import lodashStable from 'lodash';
import assert from 'assert';
import { symbol } from '../const';
import bbo from '../bbo';

describe('toPath', function() {
  it('should convert a string to a path', function() {
    assert.deepStrictEqual(bbo.toPath('a.b.c'), ['a', 'b', 'c']);
    assert.deepStrictEqual(bbo.toPath('a[0].b.c'), ['a', '0', 'b', 'c']);
  });

  it('should coerce array elements to strings', function() {
    let array = ['a', 'b', 'c'];

    lodashStable.each([array, lodashStable.map(array, Object)], function(value) {
      let actual = bbo.toPath(value);
      expect(actual).toStrictEqual(array);
      assert.notStrictEqual(actual, array);
    });
  });

  it('should return new path array', function() {
    assert.notStrictEqual(bbo.toPath('a.b.c'), bbo.toPath('a.b.c'));
  });

  it('should not coerce symbols to strings', function() {
    if (Symbol) {
      let object = Object(symbol);
      lodashStable.each([symbol, object, [symbol], [object]], function(value) {
        let actual = bbo.toPath(value);
        assert.ok(lodashStable.isSymbol(actual[0]));
      });
    }
  });

  it('should handle complex paths', function() {
    let actual = bbo.toPath('a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g');
    assert.deepStrictEqual(actual, ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g']);
  });

  // it('should handle consecutive empty brackets and dots', function() {
  //   let expected = ['', 'a'];
  //   assert.deepStrictEqual(bbo.toPath('.a'), expected);
  //   assert.deepStrictEqual(bbo.toPath('[].a'), expected);

  //   expected = ['', '', 'a'];
  //   assert.deepStrictEqual(bbo.toPath('..a'), expected);
  //   assert.deepStrictEqual(bbo.toPath('[][].a'), expected);

  //   expected = ['a', '', 'b'];
  //   assert.deepStrictEqual(bbo.toPath('a..b'), expected);
  //   assert.deepStrictEqual(bbo.toPath('a[].b'), expected);

  //   expected = ['a', '', '', 'b'];
  //   assert.deepStrictEqual(bbo.toPath('a...b'), expected);
  //   assert.deepStrictEqual(bbo.toPath('a[][].b'), expected);

  //   expected = ['a', ''];
  //   assert.deepStrictEqual(bbo.toPath('a.'), expected);
  //   assert.deepStrictEqual(bbo.toPath('a[]'), expected);

  //   expected = ['a', '', ''];
  //   assert.deepStrictEqual(bbo.toPath('a..'), expected);
  //   assert.deepStrictEqual(bbo.toPath('a[][]'), expected);
  // });
});
