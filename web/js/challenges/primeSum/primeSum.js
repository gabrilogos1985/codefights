/**
 * Created by Gabe on 29/08/2016.
 */

function primeSum(number, summands) {
    if (number < 2 || number > 250 || summands < 1 || summands > 5)
        return false;

    if (summands == 1) {
        return primes.indexOf(number) > -1;
    }
    var chain = [];
    var result = iterate(0, summands, totalPrimes, function (prime, level) {
        if (summands == chain.length) {
            chain[chain.length - level - 1] = prime;
            for (var cclean = summands - 1; cclean >= summands - level; cclean--)
                chain.pop();
        } else {
            chain.push(prime);
        }

        var sum = chain.reduce(function (a, b) {
            return a + b;
        }, 0);

        if (sum > number) {
            for (var cFix = 0; cFix < summands - chain.length; cFix++)
                chain.push(0);
            return false;
        }
        if (sum === number && level === 0) {
            console.log(String.format("Num : {0} - {1} -> suma: {2}", number, summands, chain.toString()));
            return true;
        }
    });

    return result === true;
}

function iterate(nPrime, level, times, stopper) {
    if (--level >= 0) {
        for (var counter = 0; counter < times; counter++) {
            var result = stopper(primes[counter], level);
            if (result) {
                return true;
            } else if (result === false) {
                return false;
            }
            if (iterate(primes[counter], level, times, stopper)) {
                return true;
            }
        }
    }
}

var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71
    , 73, 79, 83, 89, 97, 101, 103, 107, 109, 113
    , 127, 131, 137, 139, 149, 151, 157, 163, 167, 173
    , 179, 181, 191, 193, 197, 199, 211, 223, 227, 229
    , 233, 239, 241];
var totalPrimes = primes.length;

String.format = function () {
    // The string containing the format items (e.g. "{0}")
    // will and always has to be the first argument.
    var theString = arguments[0];

    // start with the second argument (i = 1)
    for (var i = 1; i < arguments.length; i++) {
        // "gm" = RegEx options for Global search (more than one instance)
        // and for Multiline search
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }

    return theString;
}
