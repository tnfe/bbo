/**
 * @file Demo
 */
import bbo from '../dist/bbo.esm';

console.log(bbo.ua());

bbo.log('hello bbo', { color: '#fff', background: '#ff0000' });

// bbo.open(window.location.href)

bbo.loadImages({
  data: ['1.png', '2.png', '3.png'],
  step: function(num) {},
  compelte: function() {},
  needOneStep: true,
  path: '/images'
});

console.log(bbo.cookie().getJSON());
