"use strict";

// Helpers
var slice = Array.prototype.slice,
    toString = Object.prototype.toString;

/**
 * Add two Numbers together
 * @param {Number} x First operand
 * @param {Number} y Second operand
 * @return {Number}
 */

function add(x, y) {
  return x + y;
}

/**
 * Subtract two Numbers from one another
 * @param  {Number} x First operand
 * @param  {Number} y Second operand
 * @return {Number}
 */

function subtract(x, y) {
  return x - y;
}

/**
 * Multiply two Numbers together
 * @param  {Number} x First operand
 * @param  {Number} y Second operand
 * @return {Number}
 */

function multiply(x, y) {
  return x * y;
}

/**
 * Divide two Numbers
 * @param  {Number} x First operand
 * @param  {Number} y Secodn operand
 * @return {Number}
 */

function divide(x, y) {
  return x / y;
}

/**
 * Square a Number
 * @param  {Number} x The operand
 * @return {Number}
 */

function square(x) {
  return x * x;
}

/**
 * Add up each `Number` in the `values` Array
 * @param  {Array} values An `Array` of `Numbers`
 * @return {Number}
 */

function sum() {
  var total = 0,
      values = slice.apply(arguments);
  for (var i = 0; i < values.length; i++) {
    total += values[i];
  }
  return total;
}

/**
 * Creates a simple comparison `Function`
 * @param  {Object} x   The `Object` to compare against
 * @return {Function}   A comparison `Function`
 */

function equals(x) {
  return function(element) {
    return x === element;
  };
}

// TODO: Comment and test
function forEach(array, action) {
  for (var i = 0; i < array.length; i++)
    action(array[i]);
}

// TODO: Comment and test
function reduce(combine, base, array) {
  forEach(array, function (element) {
    base = combine(base, element);
  });
  return base;
}

// TODO: Comment and test
function count(test, array) {
  return reduce(function(total, element) {
    return total + (test(element) ? 1 : 0);
  }, 0, array);
}

/**
 * Returns the composition of a list of functions,
 * where each function consumes the return value of
 * the function that follows. In math terms, composing
 * the functions f(), g(), and h() produces f(g(h())).
 * @return {Function} Returns a composed `Function`
 */

function compose() {
  // Turn functions into an Array
  var fns = slice.apply(arguments);
  return function() {
    // Note, these are not the same arguments
    // as above
    var args = slice.apply(arguments);
    for (var i = fns.length; --i >= 0; ) {
      // Set args equal to the return of each function
      // Then pass that value into the next function
      args = [fns[i].apply(this, args)];
    }
    return args[0];
  };
}

/**
 * Create a new function with the given arguments applied
 * @param  {Function} fn The function which receives the arguments
 * @return {Function}    A copy of the original function with the
 *                       arguments applied to it.
 */

function curry(fn) {
  var args = slice.call(arguments, 1);
  return function() {
    return fn.apply(null, args.concat(slice.apply(arguments)));
  };
}

/**
 * Wraps a `Function` with another `Function`. This allows
 * the wrapper function to intercept and manipulate the
 * return value of the orginal function.
 * @param  {Function} fn      The function to wrap
 * @param  {Function} wrapper The wrapper function
 * @return {Function}         Return the wrapped function
 */
function wrap(fn, wrapper) {
  return function() {
    var args = slice.apply(arguments);
    return wrapper.apply(this, [fn].concat(args));
  };
}

/**
 * Returns a `Function` which negates the result of the
 * passed in `Function`
 * @param  {Function} fn The function to negate
 * @return {Function}    The negated `Function`
 */
function negate(fn) {
  return function() {
    return !fn.apply(null, arguments);
  };
}

/**
 * !Experimental! This function isn't under test, it's
 * just really freakin' cool so I added it.
 * Creates a recursive function from one that isn't
 * @param  {Function} x A non-recursing function
 * @return {Function}   A recursive version of x
 */
function yCombinator(x) {
  return (function(procedure) {
    return x(function(arg) {
      return procedure(procedure)(arg);
    });
  })(function(procedure) {
    return x(function(arg) {
      return procedure(procedure)(arg);
    });
  });
}

/**
 * Inclusive range. `range(1, 3)` would return `[1,2,3]`
 * @param  {Number} start Starting value
 * @param  {Number} end   Ending value
 * @return {Array}
 */

function range(start, end) {
  var count = start - 1,
      res = [];
  while (count < end) {
    count += 1;
    res.push(count);
  }
  return res;
}

/**
 * Produces a set where each key evaluates to `true`
 * Duplicate keys are not possible
 * @param {Object} set    The `Object` to be made into a set
 * @param {Array} values  An `Array` of values to be made into set keys
 */

function addToSet(set, values) {
  for (var i = 0; i < values.length; i++)
  set[values[i]] = true;
}

/**
 * Removes items from the set
 * @param  {Object} set    The set `Object`
 * @param  {Array} values  Values to be removed from the set
 */

function removeFromSet(set, values) {
  for (var i = 0; i < values.length; i++)
  delete set[values[i]];
}

/**
 * Given a String, find the piece that is between `start` and `end`
 * @param  {String} string The String to search
 * @param  {String} start  The starting position
 * @param  {String} end    The ending position
 * @return {String}
 */

function between(string, start, end) {
  var startAt = string.indexOf(start) + start.length;
  var endAt = string.indexOf(end, startAt);
  if(startAt === -1 || endAt === -1) {
    return undefined;
  }
  return string.slice(startAt, endAt);
}