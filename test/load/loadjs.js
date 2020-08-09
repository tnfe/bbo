import bbo from '../bbo';

describe('loadjs', () => {
  test('bbo.loadjs() is a Function', () => {
    expect(bbo.loadjs).toBeInstanceOf(Function);
  });

  test('bbo.loadjs()', () => {
    const url = 'https://mat1.gtimg.com/www/js/libs/bbo.min.js';
    let ready = null;

    bbo.loadjs(url);

    bbo.loadjs(url, 'js_id', () => {
      ready = true;
      expect(ready).toBe(true);
    });

    bbo.loadjs(
      url,
      () => {
        ready = true;
        expect(ready).toBe(true);
      },
      'js_id'
    );
  });
});
