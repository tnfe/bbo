import babel from 'rollup-plugin-babel';

import banner from '../../banner';
// import { uglify } from 'rollup-plugin-uglify';
import { terser } from 'rollup-plugin-terser';
import { DIST_UNIVERSAL, SRC } from '../../const';

export default {
  input: `${SRC}/index.js`,
  plugins: [
    babel(),
    terser()
    // uglify({
    //   output: {
    //     comments: /^!/
    //   }
    // })
  ],
  output: {
    file: `${DIST_UNIVERSAL}/bbo.min.js`,
    format: 'umd',
    name: 'bbo',
    sourcemap: true,
    banner: banner
  }
};
