define(['./c.js'], function(c) {
	return {
		d: function() {
			c.c2();
			console.log('d');
		},

		d2: function() {

			console.log('d2')
		}
	};
});