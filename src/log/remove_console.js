import noop from '../args/noop';
export default function removeConsole(clear) {
  try {
    if (!window.console) window.console = {};
    window.console.log = window.console.info = window.console.dir = window.console.warn = window.console.trace = noop;
    if (clear === 'clear' && window.console.clear) window.console.clear();
  } catch (e) {}
}
