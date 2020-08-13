import bbo from '../bbo';
describe('jsonp', () => {
  const url = './';
  // const url = 'https://view.inews.qq.com/g2/getOnsInfo?name=wuwei_ww_ww_share_action';
  // window.URL.createObjectURL = jest.fn();
  // afterEach(() => {
  //   window.URL.createObjectURL.mockReset();
  // });
  // const url = URL.createObjectURL('callback({a: 1});');

  test('bbo.jsonp() is a Function', () => {
    expect(bbo.jsonp).toBeInstanceOf(Function);
  });

  it('should pass only url', () => {
    bbo.jsonp(url);
  }, 9999);

  it('should pass example', () => {
    bbo.jsonp(
      url,
      {
        name: 'callback'
      },
      (err, data) => {
        expect(bbo.has(data, 'data')).toBe(true);
      }
    );
  }, 9999);

  it('should pass example 2', () => {
    bbo.jsonp(
      url,
      (err, data) => {
        expect(bbo.has(data, 'data')).toBe(true);
      },
      {
        name: 'callback'
      }
    );
  }, 9999);

  it('should pass example 3', () => {
    bbo.jsonp(
      url,
      (err, data) => {
        expect(bbo.has(data, 'data')).toBe(true);
      },
      {
        name: 'callback',
        timeout: 1,
        prefix: 'bbo',
        param: {
          a: 1,
          b: 2
        }
      }
    );
  }, 9999);
});
