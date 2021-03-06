let Ajv = require('ajv');
let inspect = require('util').inspect;

function defineColumn(column, table) {
	var c = {};

	c.string = function() {
		require('./column/string')(table, column);
		return c;
	};

	c.json = function() {
		require('./column/json')(column);
		return c;
	};

	c.guid = function() {
		require('./column/guid')(column);
		return c;
	};

	c.date = function() {
		require('./column/date')(column);
		return c;
	};

	c.numeric = function(optionalPrecision,optionalScale) {
		require('./column/numeric')(column,optionalPrecision,optionalScale);
		return c;
	};

	c.boolean = function() {
		require('./column/boolean')(column);
		return c;
	};

	c.binary = function() {
		require('./column/binary')(column);
		return c;
	};

	c.default = function(value) {
		column.default = value;
		return c;
	};

	c.as = function(alias) {
		var oldAlias = column.alias;
		delete table[oldAlias];
		table[alias] = column;
		column.alias = alias;
		return c;
	};

	c.dbNull = function(value) {
		column.dbNull = value;
		return c;
	};

	c.serializable = function(value) {
		column.serializable = value;
		return c;
	};

	c.validate = function(value) {
		column.validate = value;
		return c;
	};

	c.JSONSchema = function(schema, options) {
		let ajv = new Ajv(options);
		let validate = ajv.compile(schema);
		column.validate = _validate;

		function _validate(value) {
			let valid = validate(value);
			if (!valid) {
				let e = new Error(`Column ${table._dbName}.${column._dbName} violates JSON Schema: ${inspect(validate.errors, false, 10)}`);
				e.errors = validate.errors;
				throw e;
			}
		}
		return c;
	};

	return c;
}

module.exports = defineColumn;