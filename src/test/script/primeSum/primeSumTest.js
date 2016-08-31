/**
 * Created by Gabe on 27/08/2016.
 */
describe("Checking boundaries", function () {
    console.log("Entering....");
    it("less than 2", function () {
        expect(primeSum(0, 1)).toBe(false);
        expect(primeSum(1, 10)).toBe(false);
        expect(primeSum(-21, 22)).toBe(false);
    });

    it("greater than 250", function () {
        expect(primeSum(251, 1)).toBe(false);
    });

    it("num summand less than 1", function () {
        expect(primeSum(3, 0)).toBe(false);
        expect(primeSum(3, -100)).toBe(false);
    });

    it("num summand more than 5", function () {
        expect(primeSum(7, 6)).toBe(false);
    });
});

describe("one summand", function () {
    it("primes", function () {
        expect(primeSum(2, 1)).toBe(true);
        expect(primeSum(7, 1)).toBe(true);
    });
    it("not primes", function () {
        expect(primeSum(4, 1)).toBe(false);
        expect(primeSum(20, 1)).toBe(false);
    });
});

describe("two summand", function () {
    it("2 and 3", function () {
        expect(primeSum(2, 2)).toBe(false);
        expect(primeSum(3, 2)).toBe(false);
    });

    it("primes more than 3", function () {
        expect(primeSum(5, 2)).toBe(true);
        expect(primeSum(7, 2)).toBe(true);
        expect(primeSum(241, 2)).toBe(true);
    });

    it("no primes more than 3", function () {
        expect(primeSum(4, 2)).toBe(true);
        expect(primeSum(6, 2)).toBe(true);
        expect(primeSum(20, 2)).toBe(true);
        expect(primeSum(150, 2)).toBe(true);
        expect(primeSum(222, 2)).toBe(true);
    });
    it("no 2 summand primes sum", function () {
        expect(primeSum(11, 2)).toBe(false);
        expect(primeSum(17, 2)).toBe(false);
        expect(primeSum(245, 2)).toBe(false);
    });
});

describe("three summands", function () {
    it("challenge case", function () {
        expect(primeSum(9, 3)).toBe(true);
    });

    it("primes less than 6 ", function () {
        expect(primeSum(2, 3)).toBe(false);
        expect(primeSum(3, 3)).toBe(false);
        expect(primeSum(5, 3)).toBe(false);
    });

    it("another true cases", function () {
        expect(primeSum(11, 3)).toBe(true);
        expect(primeSum(70, 3)).toBe(true);
        expect(primeSum(67, 3)).toBe(true);
    });

    it("all true greater than 5", function () {
        for (var numeros = 6; numeros < 251; numeros++)
            expect(primeSum(numeros, 3)).toBe(true);

    });
});

describe("four summand", function () {
    it("primes", function () {
        expect(primeSum(11, 4)).toBe(true);
        expect(primeSum(19, 4)).toBe(true);
    });
    it("not primes", function () {
        expect(primeSum(9, 4)).toBe(true);
    });

    it("not 4-primesSum", function () {
        for (var numeros = 0; numeros < 8; numeros++)
            expect(primeSum(numeros, 4)).toBe(false);
    });

    it("all 4-primesSum greater than 7", function () {
        for (var numEval = 8; numEval < 251; numEval++)
            expect(primeSum(numEval, 4)).toBe(true);
    });
});

describe("five summand", function () {
    it("not ", function () {
        for (var numEval = -1; numEval < 10; numEval++)
            expect(primeSum(numEval, 5)).toBe(false);
    });

    it("yes ", function () {
        for (var numEval = 10; numEval < 251; numEval++)
            expect(primeSum(numEval, 5)).toBe(true);
    });
});

describe("iterate n^n times", function () {
    var printer;
    var counter = 0;
    beforeEach(function () {
        counter = 0;
        printer = function (number, level) {
            if (level == 0) {
                //console.log(String.format("Iterate {0} level {1} counter {2}", number, level, ++counter));
                ++counter;
            }
        };

    })
    it("primees^2", function () {
        var k = 2;
        iterate(0, k, 5, printer);
        expect(counter).toBe(5 * 5);
    });

    it("primees^3", function () {
        var k = 3;
        iterate(0, k, 5, printer);
        expect(counter).toBe(5 * 5 * 5);
    });

    it("primees^5", function () {
        var k = 5;
        iterate(0, k, 5, printer);
        expect(counter).toBe(5 * 5 * 5 * 5 * 5);
    });

    it("primees^2 with stop", function () {
        var k = 5;
        var chain = [];
        var stopper = function (prime, level) {
            if (level < chain.length) {
                chain[chain.length - level - 1] = prime;
            } else {
                chain.push(prime);
            }
            if (level == 0) {
                //console.log(chain.toString());
                counter++;
                if (prime > 3) {
                    return true;
                }
            }
        };
        iterate(0, k, 5, stopper);
        expect(counter).toBe(3);
    });

    it("primees^2 with skip", function () {
        var k = 5;
        var chain = [];
        var stopper = function (prime, level) {
            if (level < chain.length) {
                chain[chain.length - level - 1] = prime;
            } else {
                chain.push(prime);
            }
            if (level == 0) {
                //console.log(chain.toString());
                counter++;
                if (prime > 3) {
                    return false;
                }
            }
        };
        iterate(0, k, 5, stopper);
        expect(counter).toBe(5 * 5 * 5 * 5 * 3);
    });
})
