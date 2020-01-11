/**
 * Math
 */
var math = {
  /**
   * https://locutus.io/php/
   */
  // eslint-disable-next-line max-params
  numberFormat: (number, decimals, decPoint, thousandsSep) => {
    //   example 1: bbo.math.numberFormat(1234.56)
    //   returns 1: '1,235'
    //   example 2: bbo.math.numberFormat(1234.56, 2, ',', ' ')
    //   returns 2: '1 234,56'
    //   example 3: bbo.math.numberFormat(1234.5678, 2, '.', '')
    //   returns 3: '1234.57'
    //   example 4: bbo.math.numberFormat(67, 2, ',', '.')
    //   returns 4: '67,00'
    //   example 5: bbo.math.numberFormat(1000)
    //   returns 5: '1,000'
    //   example 6: bbo.math.numberFormat(67.311, 2)
    //   returns 6: '67.31'
    //   example 7: bbo.math.numberFormat(1000.55, 1)
    //   returns 7: '1,000.6'
    //   example 8: bbo.math.numberFormat(67000, 5, ',', '.')
    //   returns 8: '67.000,00000'
    //   example 9: bbo.math.numberFormat(0.9, 0)
    //   returns 9: '1'
    //  example 10: bbo.math.numberFormat('1.20', 2)
    //  returns 10: '1.20'
    //  example 11: bbo.math.numberFormat('1.20', 4)
    //  returns 11: '1.2000'
    //  example 12: bbo.math.numberFormat('1.2000', 3)
    //  returns 12: '1.200'
    //  example 13: bbo.math.numberFormat('1 000,50', 2, '.', ' ')
    //  returns 13: '100 050.00'
    //  example 14: bbo.math.numberFormat(1e-8, 8, '.', '')
    //  returns 14: '0.00000001'
    var _number = String(number).replace(/[^0-9+\-Ee.]/g, '');

    var _decimals = decimals;
    var n = !isFinite(Number(_number)) ? 0 : Number(_number);
    var prec = !isFinite(Number(_decimals)) ? 0 : Math.abs(_decimals);
    var sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep;
    var dec = typeof decPoint === 'undefined' ? '.' : decPoint;
    var s = '';

    var toFixedFix = function (n, prec) {
      if (String(n).indexOf('e') === -1) {
        return Number(Math.round(n + 'e+' + prec) + 'e-' + prec);
      } else {
        var arr = String(n).split('e');
        var sig = '';

        if (Number(arr[1]) + prec > 0) {
          sig = '+';
        }

        return Number(Math.round(Number(arr[0]) + 'e' + sig + (Number(arr[1]) + prec)) + 'e-' + prec).toFixed(prec);
      }
    }; // @todo: for IE parseFloat(0.55).toFixed(0) = 0;


    s = (prec ? toFixedFix(n, prec).toString() : String(Math.round(n))).split('.');

    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }

    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }

    return s.join(dec);
  }
};

export { math };
