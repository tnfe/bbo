export default function construct() {
  let classs = arguments[0];
  return new (Function.prototype.bind.apply(classs, arguments))();
}
