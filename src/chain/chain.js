import ChainWrapper from 'chain/wrapper';

export default function chain(subject) {
  return new ChainWrapper(subject, true);
}
