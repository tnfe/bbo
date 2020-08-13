import bbo from '../bbo';

describe('uuid', () => {
  test('bbo.uuid() is a Function', () => {
    expect(bbo.uuid).toBeInstanceOf(Function);
  });

  test('bbo.uuid()', () => {
    const regUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
    for (let i = 0; i < 1000; i++) {
      expect(regUuid.test(bbo.uuid())).toBe(true);
    }
  });
});
