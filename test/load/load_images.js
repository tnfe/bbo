import bbo from '../bbo';

const dataTest1 = ['ad/001.gif', 'ad/002.gif', 'ad/003.gif', 'ad/004.gif', 'ad/005.gif'];
const dataTest2 = [];
const dataTest3 = ['ad/001.gif', 'ad/002.gif', 'ad/003.gif', 'ad/004.gif', 'ad/006.gif'];
const path = 'https://mat1.gtimg.com/news/images/';

describe('loadImages', () => {
  test('bbo.loadImages() is a Function', () => {
    expect(bbo.loadImages).toBeInstanceOf(Function);
  });

  test('bbo.loadImages() all load', () => {
    let ready = null;
    bbo.loadImages({
      data: dataTest1,
      step: (num) => {
        if (num === 100) {
          ready = true;
        }
      },
      complete: () => {
        expect(ready).toBe(true);
      },
      needOneStep: true,
      path: path
    });
  });

  test('bbo.loadImages() data nil', () => {
    let ready = null;
    bbo.loadImages({
      data: dataTest2,
      step: (num) => {
        if (num === 100) {
          ready = true;
        }
      },
      complete: () => {
        expect(ready).toBe(true);
      },
      needOneStep: true,
      path: path
    });
  });

  test('bbo.loadImages() needOneStep false', () => {
    let ready = null;
    bbo.loadImages({
      data: dataTest3,
      step: (num) => {
        if (num === 100) {
          ready = true;
        }
      },
      complete: () => {
        expect(ready).toBe(true);
      },
      needOneStep: false,
      path: path
    });
  });
});
