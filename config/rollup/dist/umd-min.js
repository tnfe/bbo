import babel from 'rollup-plugin-babel';

import banner from '../../banner';
import { terser } from 'rollup-plugin-terser';
import { DIST_UNIVERSAL, SRC } from '../../const';

export default {
  input: `${SRC}/index.js`,
  plugins: [babel(), terser()],
  output: {
    file: `${DIST_UNIVERSAL}/bbo.min.js`,
    format: 'umd',
    name: 'bbo',
    sourcemap: true,
    banner: banner
  }
};
