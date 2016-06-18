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

      var sum = _(products).chain()
        // map returns an array of 5 arrays of ingredients
        .map(function(product) {
          return product.ingredients;
        })
        // flatten returns an array of ingredients
        .flatten()
        .reduce(function(acc, i){
          if (i === 'mushrooms') {
            return  acc + 1;
          }
        }, 0)
        .value();

      expect(ingredientCount.mushrooms).toBe(sum);
    });

    /*********************************************************************************/
    // UNCOMMENT FOR EXTRA CREDIT


    // Sara's Example

    // it('should find the largest prime factor of a composite number', function() {
    //   var composite = 3;
    //   var compositePlus = composite + 1;
    //
    //   var divisors = _.range(1, compositePlus);
    //
    //   var divide = _.filter(divisors, function(a) {
    //     if (composite % a === 0) {
    //       return a;
    //     }
    //   }, {});
    //
    // });

    //
    // it('should find the largest palindrome made from the product of two 3 digit numbers', function() {
    //   // A palindrome is a word, phrase, number, or other sequence of characters which reads the same backwards or forward
    //

    function palindrome() {

    }

    //   var arr = [];
    //   for (var i = 999; i > 100; i--) {
    //     for (var j = 999; j > 100; j--) {
    //       var mul = j * i;
    //       if (isPalin(mul)) {
    //         arr.push(j * i);
    //       }
    //     }
    //
    //     return Math.max.apply(Math, arr);
    //   }
    //
    //   function isPalin(i) {
    //     return i.toString() == i.toString().split('').reverse().join('');
    //   }
    //
    // });

    //  Mathieu Agopian's Example

    //   var palindrome = 0;
    //
    //   function is_palindrome(x) {
    //     str_num = '' + x;
    //     reversed = str_num.split('').reverse().join('');
    //     return str_num === reversed;
    //   }
    //   for (var i = 999; i > 99; i--) {
    //     for (var j = 999; j > 99; j--) {
    //       var num = i * j;
    //       if (num < palindrome) {
    //         break;
    //       }
    //       if (is_palindrome(num)) {
    //         palindrome = num;
    //       }
    //     }
    //   }
    //   expect(palindrome).toBe(906609);
    // });
    //
    // it('should find the smallest number divisible by each of the numbers 1 to 20', function () {
    //
    //
    // });

    // Jonathan's Example

    // it('should find the difference between the sum of the squares and the square of the sums', function() {
    //
    //   var nums = [2, 3, 4, 5];
    //
    //   var sumOfSquares = _(nums).chain()
    //     .map(function(a) {
    //       return a * a;
    //     })
    //     .reduce(function(a, b) {
    //       return a + b
    //     })
    //     .value();
    //
    //   var squareOfSums = Math.pow(_.reduce(nums, function(a) {
    //     return a + a;
    //   }), 2);
    //
    //   var diff = sumOfSquares / squareOfSums;
    // });

    it('should find the 10001st prime', function() {

      var prime = primeList(10001);

      function primeList(n) {
        return _.range(n).
        filter(function(i) {
          return (i > 1) && _.range(Math.floor(Math.sqrt(i)) + 1).
          every(function(x, y) {
            return (y < 2) || i % y !== 0;
          });
        });
      }

      expect(prime.pop()).toBe(9973);

      // jake .. i want to use math.floor instead of ~~

      // breaking it down
      // see ariya.ofilabs.com/2013/07/sequences-using-javascript-array.html for refresher explanations
      // return Array.apply(0, Array(n)) creates an array; length is 10001; each item is undefined
      //  e.g. Array.apply(0, Array(3)) gives you [undefined, undefined, undefined]
      //  when array receives an array with an empty element, it gets converted into undefined and
      //    thereby eliminates any holes in the array
      // map(function (x,y){return y}) changes each undefined to item location; e.g. Array[5] is 5
      // map calls callbackfn once for each element in the array
      // callbackfn is called with three arguments
      //    the value of the element, the index of the element, and the object being traversed
      //    x represents the value of the element, y represents the index of the element
      // double tilde (~~) to make sure you have an integer
      // ~ is doing -(N+1)




    });

  });
})();
