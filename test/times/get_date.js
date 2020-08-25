import bbo from '../bbo';

describe('getDate', function() {
  test('getDate is a Function', () => {
    expect(bbo.getDate).toBeInstanceOf(Function);
  });

  test('number of milliseconds', () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    let yyyy = today.getFullYear();

    let hh = String(today.getHours()).padStart(2, '0');
    let ms = String(today.getMinutes()).padStart(2, '0');
    let ss = String(today.getSeconds()).padStart(2, '0');
    let expectDefalut = `${yyyy}/${mm}/${dd} ${hh}:${ms}:${ss}`;
    expect(bbo.getDate()).toBe(expectDefalut);

    let expectNew = `${yyyy}-${mm}-${dd} ${hh}-${ms}-${ss}`;
    expect(bbo.getDate('-', '-')).toBe(expectNew);
  });
});
