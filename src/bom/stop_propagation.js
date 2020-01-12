const stopPropagation = (e) => {
  let _e = e || window.event;
  if (_e.stopPropagation) {
    _e.stopPropagation(); // W3C
  } else {
    _e.cancelBubble = true; // IE
  }
};

export default stopPropagation;
