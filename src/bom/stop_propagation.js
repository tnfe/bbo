const stopPropagation = (event) => {
  const e = event || window.event;
  const stop = e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
  return stop;
};

export default stopPropagation;
