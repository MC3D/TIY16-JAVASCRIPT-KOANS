var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function() {
    products = [{
      name: "Sonoma",
      ingredients: ["artichoke", "sundried tomatoes", "mushrooms"],
      containsNuts: false
    }, {
      name: "Pizza Primavera",
      ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"],
      containsNuts: false
    }, {
      name: "South Of The Border",
      ingredients: ["black beans", "jalapenos", "mushrooms"],
      containsNuts: false
    }, {
      name: "Blue Moon",
      ingredients: ["blue cheese", "garlic", "walnuts"],
      containsNuts: true
    }, {
      name: "Taste Of Athens",
      ingredients: ["spinach", "kalamata olives", "sesame seeds"],
      containsNuts: true
    }];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function() {

    var i, j, hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i += 1) {
      if (products[i].containsNuts === false) {
        hasMushrooms = false;
        for (j = 0; j < products[i].ingredients.length; j += 1) {
          if (products[i].ingredients[j] === "mushrooms") {
            hasMushrooms = true;
          }
        }
        if (!hasMushrooms) productsICanEat.push(products[i]);
      }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function() {

    var productsICanEat = [];

    productsICanEat = _.filter(products, function(pizza){
      return !pizza.containsNuts && !_.any(pizza.ingredients,function(ingredient){
        return ingredient === 'mushrooms';
      });
    });

    // Erik's example using _.all

    // productsICanEat = _.filter(products, function(pizza){
    //   return !pizza.containsNuts && _.all(pizza.ingredients,function(ingredient){
    //     return ingredient != 'mushrooms';
    //   });
    // });

    expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function() {

    var sum = 0;
    for (var i = 1; i < 1000; i += 1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function() {

    var sum = _.range(1000).filter(function(n) {
      return n % 3 === 0 || n % 5 === 0;
    }).reduce(function(x, y) {
      return x + y;
    });

    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
  it("should count the ingredient occurrence (imperative)", function() {
    var ingredientCount = {
      "{ingredient name}": 0
    };

    for (i = 0; i < products.length; i += 1) {
      for (j = 0; j < products[i].ingredients.length; j += 1) {
        ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
      }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function() {
    var ingredientCount = {
      "{ingredient name}": 0
    };

    _(products).chain()
      .map(function(pizza) {
        return pizza.ingredients;
      })
      .flatten()
      //  .reduce(function(memo, ingredient) {
      //    memo[ingredient] ? memo[ingredient] += 1 : memo[ingredient] = 1;
      //    return memo;
      //    }, ingredientCount)
      .each(function(ingredient) {
        ingredientCount[ingredient] ? ingredientCount[ingredient] += 1 : ingredientCount[ingredient] = 1;
      })
      .value();

    /* chain() together map(), flatten() and reduce() */

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  // UNCOMMENT FOR EXTRA CREDIT


  // Sara's Example

  // it("should find the largest prime factor of a composite number", function() {
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
  // it("should find the largest palindrome made from the product of two 3 digit numbers", function() {
  //   // A palindrome is a word, phrase, number, or other sequence of characters which reads the same backwards or forward
  //
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
  //     str_num = "" + x;
  //     reversed = str_num.split("").reverse().join("");
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
  // it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
  //
  //
  // });

  // Jonathan's Example

  // it("should find the difference between the sum of the squares and the square of the sums", function() {
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

  // it("should find the 10001st prime", function() {

  //   var prime
  //
  //   for (var i = 0; i < 10001; ++i) {
  //     if (i.isPrime) {
  //       prime = i
  //     }
  //   };
  // });

});
