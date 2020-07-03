import { PRINTABLE_ASCII } from '../const';
import bbo from '../bbo';

describe('startsWith', function() {
  it('should return true for a valid starting string', function() {
    expect(bbo.startsWith('Hello World!', '')).toBe(true);
    expect(bbo.startsWith('Hello World!', 'H')).toBe(true);
    expect(bbo.startsWith('Hello World!', 'He')).toBe(true);
    expect(bbo.startsWith('Hello World!', 'Hel')).toBe(true);
    expect(bbo.startsWith('Hello World!', 'Hell')).toBe(true);
    expect(bbo.startsWith('Hello World!', 'Hello')).toBe(true);
    expect(bbo.startsWith('Hello World!', 'Hello ')).toBe(true);
    expect(bbo.startsWith('Hello World!', 'Hello W')).toBe(true);
    expect(bbo.startsWith('Hello World!', 'Hello Wo')).toBe(true);
    expect(bbo.startsWith('Hello World!', 'Hello Wor')).toBe(true);
    expect(bbo.startsWith('Hello World!', 'Hello Worl')).toBe(true);
    expect(bbo.startsWith('Hello World!', 'Hello World')).toBe(true);
    expect(bbo.startsWith('Hello World!', 'Hello World!')).toBe(true);
    expect(bbo.startsWith('Привет Мир!', 'Привет')).toBe(true);
    expect(bbo.startsWith('', '')).toBe(true);
    expect(bbo.startsWith(PRINTABLE_ASCII, ' ')).toBe(true);
  });

  it('should return false for an invalid starting string', function() {
    expect(
      bbo.startsWith('The shadows betray you, because they belong to me!', 'belong to me!')
    ).toBe(false);
    expect(bbo.startsWith('The shadows betray you, because they belong to me!', 'he shadows')).toBe(
      false
    );
    expect(bbo.startsWith('They belong to me!', 'hey belong to me!')).toBe(false);
    expect(bbo.startsWith('They belong to me!', 'belong')).toBe(false);
    expect(bbo.startsWith('', 'The shadows')).toBe(false);
  });

  it('should return false for an invalid starting string and position', function() {
    expect(
      bbo.startsWith('The shadows betray you, because they belong to me!', 'The shadows betray you')
    ).toBe(true);
    expect(bbo.startsWith('They belong to me', 'They belong to me!', '!')).toBe(false);
  });

  it('should return false for an invalid starting number', function() {
    expect(bbo.startsWith(1000, 11)).toBe(false);
    expect(bbo.startsWith(1250, 10)).toBe(false);
    expect(bbo.startsWith('916', 90)).toBe(false);
  });
});
