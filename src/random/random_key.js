const randomKey = (len = 32) => {
  /** Removed confusing characters 'oOLl,9gq,Vv,Uu,I1' **/
  let possible = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  let key = '';
  for (let i = 0; i < len; i++) {
    key += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return key;
};

export default randomKey;
