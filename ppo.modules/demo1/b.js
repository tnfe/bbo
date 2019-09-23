define(['./test.json'], function(data) {
  return {
    b: function() {
      console.log(data.name);
      console.log('b');
    }
  };
});