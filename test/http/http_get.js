import bbo from '../bbo';

describe('httpGet', () => {
  test('bbo.httpGet() is a Function', () => {
    expect(bbo.httpGet).toBeInstanceOf(Function);
  });

  test('httpGet', () => {
    bbo.httpGet(
      'https://api.github.com/',
      (res) => {
        const cb = JSON.parse(res); // {message: "API...", documentation_url: "https://developer.github.com/v3/#rate-limiting"}

        expect(bbo.isObject(cb)).toBe(true);
      },
      console.log
    );
    //
  });
});
