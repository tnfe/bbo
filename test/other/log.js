import bbo from '../bbo';

describe('log', () => {
  test('bbo.log is a Function', () => {
    expect(bbo.log).toBeInstanceOf(Function);
  });

  test('base example', () => {
    const cookie = 'cookie';
    bbo.log(cookie, { color: '#fff', background: '#ff0000' });
    const el = document.getElementById('_bbo_log');
    expect(el.innerHTML).toEqual(cookie);
  });
});
