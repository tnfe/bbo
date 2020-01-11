/************************************************************************
 * Mobile
 *************************************************************************/

/**
 * lock touch in mobile phone
 */
var lockTouch = () => {
  document.addEventListener('touchmove', function (e) {
    e.preventDefault();
  }, !1);
  document.addEventListener('touchstart', preventDefault, !1);
  document.addEventListener('touchend', preventDefault, !1);

  function not(e, tag) {
    return e.target.tagName !== tag.toUpperCase() && e.target.tagName !== tag.toLowerCase();
  }

  function preventDefault(e) {
    if (not(e, 'input') && not(e, 'textarea') && not(e, 'select') && not(e, 'menus')) e.preventDefault();
  }
};

export { lockTouch };
