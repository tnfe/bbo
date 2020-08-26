import bbo from '../bbo';

describe('construct', () => {
  class Dog {
    constructor(name) {
      this.name = name;
    }
  }
  class Cat {
    constructor(name) {
      this.name = name;
    }
  }

  class Goose {
    constructor(name) {
      this.name = name;
    }
  }

  class Elephant {
    constructor(name) {
      this.name = name;
    }
  }
  test('base example', () => {
    let classs = [Dog, Cat, Goose, Elephant];
    let randomClass = bbo.random(classs);
    let animal = bbo.construct(randomClass, 'animal', 300);
    expect(animal.name).toBe('animal');
  });
});
