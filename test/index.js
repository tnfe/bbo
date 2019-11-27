/**
 * @file Demo
 */
import ppo from '../dist/ppo.esm';

console.log(ppo.ua());

ppo.log('hello ppo', { color: '#fff', background: '#ff0000' });

// ppo.open(window.location.href)

ppo.loadImages({
  data: ['1.png', '2.png', '3.png'],
  step: function(num) {},
  compelte: function() {},
  needOneStep: true,
  path: '/images'
});

console.log(ppo.cookie().getJSON());
