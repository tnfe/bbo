define(['./d.js', './test.html'], function(d, html) {
	return {
		c: function() {
			d.d();
			document.write(html);
			console.log('c');
		}
	};
});