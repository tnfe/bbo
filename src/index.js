import chain from './chain/chain';
import ChainWrapper from './chain/wrapper';
import functions from './functions';

function bbo(subject) {
  return new ChainWrapper(subject, false);
}

Object.assign(bbo, functions, {
  chain: chain
});

export default bbo;
