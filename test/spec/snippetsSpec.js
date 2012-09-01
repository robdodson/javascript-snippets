"use strict";

describe('Snippets', function() {

    describe('sum', function() {
        it('should return a Number', function() {
            var total = sum(1, 2, 3, 4, 5);
            expect(sp.isNumber(total)).toBe(true);
        });

        it('should return a total', function() {
            var total = sum(1, 2, 3, 4, 5);
            expect(total).toBe(15);
        });
    });

    describe('equals', function() {
        it('should return a Function', function() {
            var equalsTen = equals(10);
            expect(sp.isFunction(equalsTen)).toBe(true);
        });

        describe('equality function', function() {
            it('should determine equality', function() {
                var equalsTen = equals(10);
                expect(equalsTen(10)).toBe(true);
                expect(equalsTen(5)).toBe(false);
            });
        });
    });

    describe('compose', function() {
        // Helpers
        var times2 = function(n) { return n * 2; };
        var plus1 = function(n) { return n + 1; };

        it('should return a Function', function() {
            var composedFn = compose(plus1, times2);
            expect(sp.isFunction(composedFn)).toBe(true);
        });

        describe('composed function', function() {
            it('should handle multiple arguments', function() {
                var composedFn = compose(plus1, times2, sum);
                expect(composedFn(1, 2, 3)).toEqual(13);
            });
        });
    });

    describe('curry', function() {
        it('should return a Function', function() {
            var curryFn = curry(sum, 1, 2, 3);
            expect(sp.isFunction(curryFn)).toBe(true);
        });

        describe('curried function', function() {
            it('should have arguments already applied', function() {
                var curriedFn = curry(sum, 1, 2, 3);
                expect(curriedFn(4)).toEqual(10);
            });
        });
    });

    describe('wrap', function() {
        it('should return a Function', function() {
            var wrappedFn = wrap(sum, function() {});
            expect(sp.isFunction(wrappedFn)).toBe(true);
        });

        describe('wrapped function', function() {
            it('should execute the original function', function() {
                var wrappedFn = wrap(sum, function() {
                    var args = sp.slice.apply(arguments);
                    // First argument is the wrapped function
                    var originalFn = args.shift();
                    return originalFn.apply(this, args) * 2;
                });
                expect(wrappedFn(1, 2, 3, 4)).toEqual(20);
            });
        });
    });

    describe('negate', function() {
        it('should return a Function', function() {
            var isNotNaN = negate(isNaN);
            expect(sp.isFunction(isNotNaN)).toBe(true);
        });

        describe('negated function', function() {
            it('should negate the result of the original function', function() {
                var isNotNaN = negate(isNaN);
                expect(isNotNaN(2)).toBe(true);
                expect(isNotNaN(undefined)).toBe(false);
            });

            it('should pass all argument to the original function', function() {
                var isGreater = function(a, b) {
                    return a > b;
                };
                var isNotGreater = negate(isGreater);
                expect(isGreater(10, 5)).toBe(true);
                expect(isNotGreater(5, 10)).toBe(true);
            });
        });
    });

    describe('range', function() {
        it('should return an Array', function() {
            var rng = range(1, 10);
            expect(sp.isArray(rng)).toBe(true);
        });

        it('should be inclusive', function() {
            var rng = range(1, 10);
            expect(rng[0]).toBe(1);
            expect(rng[rng.length - 1]).toBe(10);
        });
    });

    describe('addToSet', function() {
        it('should add keys to the set', function() {
            var set = {};
            addToSet(set, ['foo', 'bar', 'baz']);
            expect(set['foo']).toBeDefined();
            expect(set['bar']).toBeDefined();
            expect(set['baz']).toBeDefined();
        });
    });

    describe('removeFromSet', function() {
        it('should remove keys from the set', function() {
            var set = {};
            addToSet(set, ['foo', 'bar', 'baz']);
            expect(set['foo']).toBeDefined();
            expect(set['bar']).toBeDefined();
            expect(set['baz']).toBeDefined();
            removeFromSet(set, ['foo', 'bar', 'baz']);
            expect(set['foo']).toBeUndefined();
            expect(set['bar']).toBeUndefined();
            expect(set['baz']).toBeUndefined();
        });
    });

    describe('between', function() {
        it('should return a String', function() {
            var str = between('foo bar baz', 'foo ', ' baz');
            expect(sp.isString(str)).toBe(true);
        });
        
        it('should return the String between the arguments', function() {
            var str = between('foo bar baz', 'foo ', ' baz');
            expect(str).toBe('bar');
        });

        it('should return undefined if no match is found', function() {
            var str = between('foo bar baz', 'hello', 'world');
            expect(str).toBeUndefined();
        });
    });

});












