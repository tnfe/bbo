define(['./b.js', './c.js'], function(b, c) {
  return {
    a: function() {
      b.b();
      c.c();

      console.log('a');
    }
  };
});