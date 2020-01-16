export default function capwords(str) {
  //   example 1: capwords('kevin van  zonneveld')
  //   returns 1: 'Kevin Van  Zonneveld'
  //   example 2: capwords('HELLO WORLD')
  //   returns 2: 'HELLO WORLD'

  let pattern = /^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g;
  return String(str).replace(pattern, function($1) {
    return $1.toUpperCase();
  });
}
