var when = require('a').when;
var c = {};

when(c)
	.it('should return new id').assertEqual(c.id, c.returned)
	;
