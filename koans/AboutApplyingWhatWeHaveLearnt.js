/* globals describe, it, expect, beforeEach, _ */

(function() {
  'use strict';

  describe('About Applying What We Have Learnt', function() {

    var products;

    beforeEach(function() {
      products = [{
        name: 'Sonoma',
        ingredients: ['artichoke', 'sundried tomatoes', 'mushrooms'],
        containsNuts: false
      }, {
        name: 'Pizza Primavera',
        ingredients: ['roma', 'sundried tomatoes', 'goats cheese', 'rosemary'],
        containsNuts: false
      }, {
        name: 'South Of The Border',
        ingredients: ['black beans', 'jalapenos', 'mushrooms'],
        containsNuts: false
      }, {
        name: 'Blue Moon',
        ingredients: ['blue cheese', 'garlic', 'walnuts'],
        containsNuts: true
      }, {
        name: 'Taste Of Athens',
        ingredients: ['spinach', 'kalamata olives', 'sesame seeds'],
        containsNuts: true
      }];
    });

    /*********************************************************************************/

    it('given I\'m allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)', function() {

      var i, j, hasMushrooms, productsICanEat = [];

      for (i = 0; i < products.length; i++) {
        if (products[i].containsNuts === false) {
          var product = products[i];
          hasMushrooms = false;
          for (j = 0; j < products[i].ingredients.length; j++) {
            if (products[i].ingredients[j] === 'mushrooms') {
              hasMushrooms = true;
            }
          }
          if (!hasMushrooms) {
            productsICanEat.push(product);
          }
        }
      }

      expect(productsICanEat.length).toBe(1);
    });

    it('given I\'m allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)', function() {

      var productsICanEat = [];

      productsICanEat = _.filter(products, function(product) {
        return !product.containsNuts && !_.any(product.ingredients, function(ingredient) {
          return ingredient === 'mushrooms';
        });
      });

      // Erik's example using _.all

      // productsICanEat = _.filter(products, function(product){
      //   return !product.containsNuts && _.all(product.ingredients,function(ingredient){
      //     return ingredient !== 'mushrooms';
      //   });
      // });

      expect(productsICanEat.length).toBe(1);
    });

    /*********************************************************************************/

    it('should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)', function() {

      var sum = 0;
      for (var i = 1; i < 1000; i++) {
        if (i % 3 === 0 || i % 5 === 0) {
          sum += i;
        }
      }

      expect(sum).toBe(233168);
    });

    it('should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)', function() {

      /* try chaining range() and reduce() */

      var sum = _(_.range(1000)).chain()
        .filter(function(x) {
          return x % 3 === 0 || x % 5 === 0;
        })
        .reduce(function(acc, x) {
          return acc + x;
        }, 0)
        .value();

      expect(233168).toBe(sum);
    });

    /*********************************************************************************/
    it('should count the ingredient occurrence (imperative)', function() {
      var ingredientCount = {
        '{ingredient name}': 0
      };

      for (var i = 0; i < products.length; i++) {
        for (var j = 0; j < products[i].ingredients.length; j += 1) {
          ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
      }

      expect(ingredientCount.mushrooms).toBe(2);
    });

    it('should count the ingredient occurrence (functional)', function() {
      var ingredientCount = {
        '{ingredient name}': 0
      };

      /* chain() together map(), flatten() and reduce() */

      var ingredientObj = _(products).chain()
        // map returns an array of 5 arrays of ingredients
        .map(function(product) {
          return product.ingredients;
        })
        // flatten returns an array of ingredients
        .flatten()
        .reduce(function(ingredientObj, ingredient) {
          ingredientCount[ingredient] = (ingredientCount[ingredient] || 0) + 1;

          if (ingredientObj[ingredient]) {
            ingredientObj[ingredient] += 1;
          } else {
            ingredientObj[ingredient] = 1;
          }
          
          return ingredientObj;

        }, {})
        .value();

      expect(ingredientCount.mushrooms).toBe(ingredientObj.mushrooms);
    });

    /*********************************************************************************/
    // UNCOMMENT FOR EXTRA CREDIT

    // composite #: whole number that can be divided evenly by numbers other than 1 or itself
    it('should find the largest prime factor of a composite number', function() {

      var factors;

      function isPrime(x) {
        for (var i = 2; i < x; i++) {
          if (x % i === 0) {
            return;
          }
        }
        factors.push(x);
      }

      function isComposite(x) {
        factors = [];
        for (var i = 2; i < x; i++) {
          if (x % i === 0) {
            isPrime(i);
          }
        }
        return;
      }

      function largestPrimeFactor(x) {
        isComposite(x);
        if (factors.length > 0) {
          var i = factors.pop();
          return i;
        } else {
          return;
        }
      }

      expect(largestPrimeFactor(30)).toBe(5);
    });

    // A palindrome is a word, phrase, number, or other sequence of characters which reads the same backwards or forward
    it('should find the largest palindrome made from the product of two 3 digit numbers', function() {

      var palindromes;
      var str1, str2;

      function isPalindrome(x) {
        str1 = x.toString();
        str2 = x.toString().split('').reverse().join('');

        if (str1 === str2) {
          palindromes.push(x);
        }
        return;
      }

      function largestPalindrome() {
        palindromes = [];
        for (var i = 100; i < 1000; i++) {
          for (var j = 100; j < 1000; j++) {
            var product = i * j;
            isPalindrome(product);
          }
        }
        return Math.max(...palindromes);
      }

      expect(largestPalindrome()).toBe(906609);

    });

    it('should find the smallest number divisible by each of the numbers 1 to 20', function() {
      // returns [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      var numbers = _.range(11, 21);
      var factors = [];

      var getFactors = function(x) {
        for (var i = 2; i <= x; i++) {
          while ((x % i) === 0) {
            factors.push(i);
            x /= i;
          }
        }
        return factors;
      };

      // returns factors === [11, 2, 2, 3, 13, 2, 7, 3, 5, 2, 2, 2, 2, 17, 2, 3, 3, 19, 2, 2, 5]
      _.each(numbers, getFactors);

      var uniqueFactors = [...new Set(factors)]; // returns unique array [11, 2, 3, 13, 7, 5, 17, 19] (ES6)

      var array = [];

      var getCount = function(a) {
        var currentStreak = 0,
          highestStreak = 0;
        for (var i = 0; i < factors.length; i++) {
          if (factors[i] === a) {
            currentStreak++;
          } else {
            currentStreak = 0;
          }

          if (currentStreak > highestStreak) {
            highestStreak = currentStreak;
          }
        }
        array.push(Math.pow(a, highestStreak));
      };

      _.each(uniqueFactors, getCount);

      var smallestDivisibleNumber = _.reduce(array, function(a, b) {
        return a * b;
      });

      expect(smallestDivisibleNumber).toBe(232792560);
    });

    it('should find the difference between the sum of the squares and the square of the sums', function() {

      var nums = _.range(1, 6); // creates [1, 2, 3, 4, 5]

      var sumSquares = _(nums).chain()
        // return new array of squares
        .map(function(x) {
          return x * x; // returns [1, 4, 9, 16, 25]
        })
        // total squares
        .reduce(function(a, b) {
          return a + b; // returns 55
        })
        .value();

      var squareSums = Math.pow(
        _.reduce(nums, function(a, b) {
          return a + b; // returns 15
        }), 2); // returns 225

      var difference = sumSquares - squareSums; // 55 - 225 = -170

      expect(difference).toBe(-170);
    });

    it('should find the 10001st prime', function() {

      var primes = [];

      function isPrime(x) {
        for (var i = 2; i < x; i++) {
          if (x % i === 0) {
            return;
          }
        }
        primes.push(x);
      }

      function generatePrimes() {
        for (var i = 3; primes.length < 10000; i++) {
          isPrime(i);
        }

        return primes;
      }

      expect(generatePrimes().pop()).toBe(104743);

    });
  });
})();
