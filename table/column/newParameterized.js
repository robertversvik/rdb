var newCollection = require('../../newCollection');

function _new(text) {
	var optionalParams = [];
	var c = {};
	
	for (var i = 1; i < arguments.length; i++) {
		optionalParams.push(arguments[i]);
	};
	
	c.parameters = newCollection.apply(null, optionalParams);
	
	c.sql = function() {
		return text;
	};

	c.prepend = function(other) {				
		if (other.hasOwnProperty('sql')) 
			return prependParameterized(other);
		else
			return prependText(other);			
	};

	function prependParameterized(other) {		
		var params = [other.sql() + text];
		var otherParameters = other.parameters.toArray();			
		params = params.concat(otherParameters).concat(optionalParams);
		return newParameterized(params);
	}

	function prependText(other) {
		var params = [other + text].concat(optionalParams);
		return newParameterized(params);
	}

	function newParameterized(params) {
		return require('./newParameterized').apply(null, params);		
	}
	
	return c;
}


module.exports = _new;
