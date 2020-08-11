import bbo from '../bbo';

describe('httpPost', () => {
  test('bbo.httpPost() is a Function', () => {
    expect(bbo.httpPost).toBeInstanceOf(Function);
  });

  test('httpPost', () => {
    bbo.httpPost(
      'https://api.github.com/users',
      'hrout',
      (res) => {
        const cb = JSON.parse(res);
        expect(bbo.isObject(cb)).toBe(true);
      },
      (error) => {
        console.log(error);
      }
    );
  });
});
