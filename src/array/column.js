/**
 * discuss at: https://locutus.io/php/array_column/
 */
export default function column(input, ColumnKey, IndexKey = null) {
  let _input = input;
  if (_input !== null && (typeof _input === 'object' || Array.isArray(_input))) {
    let newArray = [];
    if (typeof _input === 'object') {
      let tempArray = [];
      for (let key of Object.keys(_input)) {
        tempArray.push(_input[key]);
      }
      _input = tempArray;
    }
    if (Array.isArray(_input)) {
      for (let key of _input.keys()) {
        if (IndexKey && _input[key][IndexKey]) {
          if (ColumnKey) {
            newArray[_input[key][IndexKey]] = _input[key][ColumnKey];
          } else {
            newArray[_input[key][IndexKey]] = _input[key];
          }
        } else {
          if (ColumnKey) {
            newArray.push(_input[key][ColumnKey]);
          } else {
            newArray.push(_input[key]);
          }
        }
      }
    }
    return { ...newArray };
  }
}
