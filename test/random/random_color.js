import bbo from '../bbo';

describe('randomColor', () => {
  test('bbo.randomColor() is a Function', () => {
    expect(bbo.randomColor).toBeInstanceOf(Function);
  });

  test('should pass example', () => {
    const isColor = (strColor) => {
      let s = new Option().style;
      s.color = strColor;
      let test1 = s.color === strColor;
      let test2 = /^#[0-9A-F]{6}$/i.test(strColor);
      if (test1 === true || test2 === true) {
        return true;
      } else {
        return false;
      }
    };

    const num = 20;
    for (let i = 0; i < num.length; i++) {
      expect(isColor(bbo.randomColor())).toBe(true);
    }
    const testColor = bbo.randomColor();
    expect(isColor(testColor)).toBe(true);
    expect(isColor('red')).toBe(true);
    expect(isColor('reds')).toBe(false);
    expect(isColor('#ff0000')).toBe(true);
    expect(isColor('#ff000011')).toBe(false);
  });
});
