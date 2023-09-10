/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
var createCounter = function(init) {
    var current = init

    return {
        increment: function() {
            return ++current
        },
        decrement: function() {
            return --current
        },
        reset: function() { 
            return current = init
        }
    }
    
};

/**
 * const counter = createCounter(5)
 * counter.increment(); // 6
 * counter.reset(); // 5
 * counter.decrement(); // 4
 */