var encoded = {};
var arg = 'foo';
var argPercent = '%foo%';
var firstPart = '_2.columnName LIKE ';
var optionalAlias = {};
var alias = '_2';

function act(c) {	
	var mock = c.mock;
	c.expected = {};
	c.extractAlias.expect(optionalAlias).return(alias);
	encoded.prepend = mock();	
	encoded.prepend.expect(firstPart).return(c.expected);
	c.column.encode = mock();
	c.column.encode.expect(argPercent).return(encoded);	
	c.returned = c.sut(c.column,arg,optionalAlias);
}

act.base = '../req';
module.exports = act;