define(['./b.js'], function(b) {
  return {
    a: function() {
      b.b();
      b.b2();
      console.log('a');
    },

    a2: function() {
      console.log('a2')
    }
  };
});