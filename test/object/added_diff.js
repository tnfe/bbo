import bbo from '../bbo';

describe('addedDiff', () => {
  describe('base case', () => {
    describe('equal', () => {
      test.each([
        ['int', 1],
        ['string', 'a'],
        ['boolean', true],
        ['null', null],
        ['undefined', undefined],
        ['object', { a: 1 }],
        ['array', [1]],
        ['function', () => ({})],
        ['date', new Date()]
      ])('returns empty object when given values of type %s are equal', (type, value) => {
        expect(bbo.addedDiff(value, value)).toEqual({});
      });
    });

    describe('not equal and not object', () => {
      test.each([
        [1, 2],
        ['a', 'b'],
        [true, false],
        ['hello', null],
        ['hello', undefined],
        [null, undefined],
        [undefined, null],
        [null, { a: 1 }],
        ['872983', { areaCode: '+44', number: '872983' }],
        [100, () => ({})],
        [() => ({}), 100],
        [new Date('2017-01-01'), new Date('2017-01-02')]
      ])('returns empty object when values are not equal (%s, %s)', (lhs, rhs) => {
        expect(bbo.addedDiff(lhs, rhs)).toEqual({});
      });
    });
  });

  describe('recursive case', () => {
    describe('object', () => {
      test('returns empty object when given objects are updated', () => {
        expect(bbo.addedDiff({ a: 1 }, { a: 2 })).toEqual({});
      });

      test('returns empty object when right hand side has deletion', () => {
        expect(bbo.addedDiff({ a: 1, b: 2 }, { a: 1 })).toEqual({});
      });

      test('returns subset of right hand side value when a key value has been added to the root', () => {
        expect(bbo.addedDiff({ a: 1 }, { a: 1, b: 2 })).toEqual({ b: 2 });
      });

      test('returns subset of right hand side value when a key value has been added deeply', () => {
        expect(bbo.addedDiff({ a: { b: 1 } }, { a: { b: 1, c: 2 } })).toEqual({ a: { c: 2 } });
      });

      test('returns subset of right hand side with added date', () => {
        expect(bbo.addedDiff({}, { date: new Date('2016') })).toEqual({ date: new Date('2016') });
      });
    });

    describe('arrays', () => {
      test('returns empty object when array is updated', () => {
        expect(bbo.addedDiff([1], [2])).toEqual({});
      });

      test('returns empty object when right hand side array has deletions', () => {
        expect(bbo.addedDiff([1, 2, 3], [1, 3])).toEqual({});
      });

      test('returns subset of right hand side array as object of indices to value when right hand side array has additions', () => {
        expect(bbo.addedDiff([1, 2, 3], [1, 2, 3, 9])).toEqual({ 3: 9 });
      });

      test('returns subset of right hand side with added date', () => {
        expect(bbo.addedDiff([], [new Date('2016')])).toEqual({ 0: new Date('2016') });
      });
    });

    describe('object create null', () => {
      test('returns subset of right hand side value when a key value has been added to the root', () => {
        const lhs = Object.create(null);
        const rhs = Object.create(null);
        lhs.a = 1;
        rhs.a = 1;
        rhs.b = 2;
        expect(bbo.addedDiff(lhs, rhs)).toEqual({ b: 2 });
      });

      test('returns subset of right hand side value when a key value has been added deeply', () => {
        const lhs = Object.create(null);
        const rhs = Object.create(null);
        lhs.a = { b: 1 };
        rhs.a = { b: 1, c: 2 };
        expect(bbo.addedDiff(lhs, rhs)).toEqual({ a: { c: 2 } });
      });

      test('returns subset of right hand side with added date', () => {
        const lhs = Object.create(null);
        const rhs = Object.create(null);
        rhs.date = new Date('2016');
        expect(bbo.addedDiff(lhs, rhs)).toEqual({ date: new Date('2016') });
      });
    });
  });
});
