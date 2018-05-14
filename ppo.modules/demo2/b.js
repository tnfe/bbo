define(['./a.js'], function(a) {
	return {
		b: function() {
			a.a2();
			console.log('b');
		},

		b2: function() {

			console.log('b2')
		}
	};
});