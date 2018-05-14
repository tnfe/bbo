define(['./d.js'], function(d) {
	return {
		c: function() {
			d.d();
			d.d2();
			console.log('c');
		},

		c2: function() {
			console.log('c2')
		}
	};
});