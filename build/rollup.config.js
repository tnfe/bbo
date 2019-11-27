// #region rollup 插件
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
// #endregion

import { version } from '../package.json';

let banner = `
/*
 * PPO
 * +++++++++ a utility-belt library for JavaScript +++++++++
 * (c) 2011-2019 halld add
 * https://github.com/halldwang/ppo
 * version ${version}
 */
`;

// #region 插件
let plugins = [
  resolve(),
  commonjs(),
  json(),
  babel({
    exclude: 'node_modules/**',
    extensions: ['.js']
  })
];
// #endregion

export default [
  {
    input: 'src/index.js',
    output: {
      banner,
      file: `dist/ppo.min.js`,
      exports: 'named',
      format: 'umd',
      name: 'ppo',
      sourcemap: true
    },
    plugins: plugins.concat([
      terser({
        output: {
          comments(node, comment) {
            if (comment.type === 'comment2') {
              return /ppo.+v/i.test(comment.value);
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
        file: 'dist/ppo.esm.js',
        format: 'esm'
      },
      {
        banner,
        file: `dist/ppo.js`,
        exports: 'named',
        format: 'umd',
        name: 'ppo',
        sourcemap: true
      }
    ],
    plugins
  }
];
