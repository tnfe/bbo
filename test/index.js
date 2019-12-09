import bbo from '../dist/bbo.esm';

// console.log(bbo.ua());

bbo.log('hello bbo', { color: '#fff', background: '#ff0000' });

bbo.loadImages({
  data: ['1.png', '2.png', '3.png'],
  step: (num) => {},
  complete: () => {},
  needOneStep: true,
  path: '/images'
});

// console.log(bbo.cookie().getJSON());

// console.log(bbo);

// console.log(bbo.array.allEqual([1, 2, 3, 4, 5, 6])); // false
// console.log(bbo.array.allEqual([1, 1, 1, 1])); // true

console.log(bbo.array, bbo.string);

console.log(
  bbo.math.numberFormat(1000),
  bbo.math.numberFormat(1234.5678, 2, '.', ''),
  bbo.math.numberFormat(67000, 5, ',', '.'),
  bbo.math.numberFormat(1e-8, 8, '.', '')
);

console.log(bbo.math.floor(8723321.4));

console.log(
  bbo.array.column(
    [{ name: 'Alex', value: 1 }, { name: 'Elvis', value: 2 }, { name: 'Michael', value: 3 }],
    'name'
  )
);

console.log(
  bbo.array.search('zonneveld', { firstname: 'kevin', middle: 'van', surname: 'zonneveld' })
);

const res = {
  data: {
    article: [
      {
        articleId: 0,
        title: 'title'
      }
    ]
  },
  response: {
    code: '0',
    msg: 'success'
  }
};

console.log(bbo.get(res, 'response'));

console.log(bbo.objectParam({ a: 1, b: 2 }));
