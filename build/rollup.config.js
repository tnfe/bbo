import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

import { version } from '../package.json';

let banner = `
/*
 * bbo
 * +++++++++ a utility-belt library for JavaScript +++++++++
 * (c) 2011-2019 tnfe
 * https://github.com/tnfe/bbo.git
 * version ${version}
 */
`;

let plugins = [
  resolve(),
  commonjs(),
  json(),
  babel({
    exclude: 'node_modules/**',
    extensions: ['.js']
  })
];

export default [
  {
    input: 'src/index.js',
    output: {
      banner,
      file: `dist/bbo.min.js`,
      exports: 'named',
      format: 'umd',
      name: 'bbo',
      sourcemap: true
    },
    plugins: plugins.concat([
      terser({
        output: {
          comments(node, comment) {
            if (comment.type === 'comment2') {
              return /bbo.+v/i.test(comment.value);
            }
          }
        }
      })
    ])
  },
  {
    input: 'src/index.js',
    output: [
      {
        banner,
        exports: 'named',
        file: 'dist/bbo.esm.js',
        format: 'esm'
      },
      {
        banner,
        file: `dist/bbo.js`,
        exports: 'named',
        format: 'umd',
        name: 'bbo',
        sourcemap: true
      }
    ],
    plugins
  }
];
