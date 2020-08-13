import bbo from '../bbo';
const url = './img.png';
describe('checkImageSize', () => {
  test('bbo.checkImageSize() is a Function', () => {
    expect(bbo.checkImageSize).toBeInstanceOf(Function);
  });

  test('should pass example 1', () => {
    bbo.checkImageSize(url, { enabledNatural: true, ratio: 2 }, (res) => {
      expect(res).toEqual({ width: 50, height: 50 });
    });

    bbo.checkImageSize(url, { enabledNatural: false }, (res) => {
      expect(res).toEqual({ width: 100, height: 100 });
    });

    bbo.checkImageSize(url, { enabledMaxSize: true }, (res) => {
      expect(res).toEqual({ width: 100, height: 100 });
    });
  });

  test('should pass example 2', () => {
    const data = new Uint8Array([
      137,
      80,
      78,
      71,
      13,
      10,
      26,
      10,
      0,
      0,
      0,
      13,
      73,
      72,
      68,
      82,
      0,
      0,
      0,
      8,
      0,
      0,
      0,
      8,
      8,
      2,
      0,
      0,
      0,
      75,
      109,
      41,
      220,
      0,
      0,
      0,
      34,
      73,
      68,
      65,
      84,
      8,
      215,
      99,
      120,
      173,
      168,
      135,
      21,
      49,
      0,
      241,
      255,
      15,
      90,
      104,
      8,
      33,
      129,
      83,
      7,
      97,
      163,
      136,
      214,
      129,
      93,
      2,
      43,
      2,
      0,
      181,
      31,
      90,
      179,
      225,
      252,
      176,
      37,
      0,
      0,
      0,
      0,
      73,
      69,
      78,
      68,
      174,
      66,
      96,
      130
    ]);
    const blob = new Blob(data, { type: 'image/png' });
    // const url = URL.createObjectURL(blob);
    // let img = new Image();
    // img.src = url;

    bbo.checkImageSize(blob, { enabledNatural: false }, (res) => {
      expect(res).toEqual({ width: 100, height: 100 });
    });
  });
});
