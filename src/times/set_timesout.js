import args from '../args/args';
/**
 * setInterval func fix times
 * https://stackoverflow.com/questions/2956966/javascript-telling-setinterval-to-only-fire-x-amount-of-times
 */
export default function setTimesout() {
  let func = arguments[0];
  let delay = arguments[1] === undefined ? 0 : parseFloat(arguments[1]);
  let times = arguments[2] === undefined ? 1 : parseInt(arguments[2], 10);
  let _args = arguments.length > 3 ? args(arguments, 3) : null;
  let target = {
    index: 0,
    times: times,
    over: false
  };

  let id = setInterval(function() {
    target.index++;
    if (target.index > times) {
      clearInterval(id);
    } else {
      if (target.index === times) target.over = true;
      func.apply(target, _args);
    }
  }, delay);

  return id;
}
