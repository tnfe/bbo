import babel from 'rollup-plugin-babel';
import banner from '../../banner';

import { DIST_MODULE_ES, SRC } from '../../const';

export default {
  input: `${SRC}/index.js`,
  plugins: [babel()],
  output: {
    file: `${DIST_MODULE_ES}/index.js`,
    format: 'es',
    name: 'bbo',
    sourcemap: false,
    banner: banner
  }
};
