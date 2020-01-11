import babel from 'rollup-plugin-babel';
import banner from '../../banner';

import { DIST_UNIVERSAL, SRC } from '../../const';

export default {
  input: `${SRC}/index.js`,
  plugins: [babel()],
  output: {
    file: `${DIST_UNIVERSAL}/bbo.js`,
    format: 'umd',
    name: 'bbo',
    sourcemap: false,
    banner: banner
  }
};
