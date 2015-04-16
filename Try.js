"use strict";

var Try = function Try(value, error) {
	this.value = value;
	this.error = error;
}

Try.prototype.match = function match(success, failure) {
	if (!this.error) {
		return success && success.call(this, this.value);
	} else {
		return failure && failure.call(this, this.error);
	}
}

Try.Attempt = function(fn) {
	var params = [].slice.call(arguments, 1);
	try {
		return new Try(fn.apply(this, params), null);
	} catch (e) {
		return new Try(null, e);
	}
}

module.exports = {
	Try: Try
}