/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function(functions) {
	return function(x) {
        var result = x
        for (var i = 0; i < functions.length; i++) {
            result = functions[functions.length - 1 - i](result)
        }
        return result
    }
};

/**
 * const fn = compose([x => x + 1, x => 2 * x])
 * fn(4) // 9
 */