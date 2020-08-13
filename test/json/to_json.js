import bbo from '../bbo';

describe('toJson', () => {
  test('bbo.toJson() is a Function', () => {
    expect(bbo.toJson).toBeInstanceOf(Function);
  });

  test('should pass example', () => {
    const a = '{"a":"[Function function () {}]"}';
    const b = '{"a":1,"b":"[Circular ~]"}';
    const res = "{ code: 0 , msg: 'msg' , data: {} }";

    expect(bbo.toJson(a)).toEqual({
      a: '[Function function () {}]'
    });

    expect(bbo.toJson(b)).toEqual({
      a: 1,
      b: '[Circular ~]'
    });

    expect(bbo.toJson(res)).toEqual({ code: 0, msg: 'msg', data: {} });

    expect(bbo.toJson()).toEqual(null);

    expect(
      bbo.toJson({
        a: 1,
        b: 2
      })
    ).toEqual({
      a: 1,
      b: 2
    });
  });
});
