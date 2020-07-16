import bbo from '../bbo';

describe('trash', () => {
  test('bbo.trash is a Object', () => {
    expect(bbo.trash).toBeInstanceOf(Object);
  });

  test('bbo.trash.log is a Function', () => {
    expect(bbo.trash.log).toBeInstanceOf(Function);
  });

  test('bbo.trash.clear is a Function', () => {
    expect(bbo.trash.clear).toBeInstanceOf(Function);
  });

  test('bbo.trash is a Object', () => {
    expect(bbo.trash).toBeInstanceOf(Object);
  });

  test('trash the log', () => {
    const trash = bbo.trash;

    trash['name'] = 'abc';
    trash['end'] = [];
    trash['cache'] = {};
    expect(bbo.hasOwnProperty(trash, 'name')).toBe(true);
  });
});
