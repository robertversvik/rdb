var when = require('a').when;
var c = {};

when('./purify_not_number',c)
	.it('should throw with message').assertEqual(c.expected,c.thrownMsg);