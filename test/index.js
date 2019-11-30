import bbo from '../dist/bbo.esm';

// console.log(bbo.ua());

bbo.log('hello bbo', { color: '#fff', background: '#ff0000' });

bbo.loadImages({
  data: ['1.png', '2.png', '3.png'],
  step: function(num) {},
  complete: function() {},
  needOneStep: true,
  path: '/images'
});

// console.log(bbo.cookie().getJSON());

// console.log(bbo);

// console.log(bbo.array.allEqual([1, 2, 3, 4, 5, 6])); // false
// console.log(bbo.array.allEqual([1, 1, 1, 1])); // true

console.log(bbo.array);
