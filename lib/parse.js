'use strict';

/*
* regular expressions
*
* except space:                 ^([^\"\'\s][^\s]*)
* quoted with double quotation: ^\"((\"\"|\\\"|[^\"])*)\"
* quoted with single quotation: ^\'((\'\'|\\\'|[^\'])*)\'
*
*/
var re = /^(([^\"\'\s][^\s]*)|\"((\"\"|\\\"|[^\"])*)\"|\'((\'\'|\\\'|[^\'])*)\')/
  , startFromSpace = /^\s+/
  , endOfLine = /^$/;

module.exports = exports = function(line){
	var args = [];
	// trim a line
	var rest = line.replace(/^\s+/, '').replace(/\s+$/, '');
	while (rest.length > 0) {
		// If a space string isn't at the beginning of rest string, throw error.
		if (startFromSpace.test(rest) && !endOfLine.test(rest)) {
			throw new Error('Incorrect argument');
		}

		// take a argument
		var match = re.exec(rest)[1];
		if (match) args.push(match.replace(/(^(\"|\')|(\"|\')$)/g, '').replace(/\"\"/g, '\"').replace(/\'\'/g, '\''));

		// cut argument and space string.
		rest = rest.substr(match.length).replace(startFromSpace, '');
	}
	return args;
};
