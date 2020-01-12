/**
 * trigger event
 * https://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
 */
const trigger = (element, event, eventType) => {
  if (document.createEventObject) {
    let e = document.createEventObject();
    return element.fireEvent('on' + event, e);
  } else {
    let e = document.createEvent(eventType || 'HTMLEvents');
    e.initEvent(event, true, true);
    element.dispatchEvent(e);
  }
};

export default trigger;
