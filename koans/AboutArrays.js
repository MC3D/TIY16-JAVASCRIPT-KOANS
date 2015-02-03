describe("About Arrays", function() {

  // We shall contemplate truth by testing reality, via spec expectations.
  it("should create arrays", function() {
  // assigns emptyArray to var emptyArray
    var emptyArray = [];
  // an array is a high-level, list-like object
  // an object (car) that has properties (color) and methods (start)
  // objects include dates, arrays, strings, functions ...
    expect(typeof(emptyArray)).toBe('object'); //A mistake? - http://javascript.crockford.com/remedial.html
  // returns the number of elements in an array
    expect(emptyArray.length).toBe(0);

  // arrays are zero-indexed
    var multiTypeArray = [0, 1, "two", function () { return 3; }, {value1: 4, value2: 5}, [6, 7]];
    expect(multiTypeArray[0]).toBe(0);
    expect(multiTypeArray[2]).toBe('two');
  // returns function result: result of function () {return 3;} is 3
    expect(multiTypeArray[3]()).toBe(3);
  // calls the property value1 and returns its value
    expect(multiTypeArray[4].value1).toBe(4);
    expect(multiTypeArray[4]["value2"]).toBe(5);
  // multiTypeArray index 5; inner array index 0
    expect(multiTypeArray[5][0]).toBe(6);
  });

  it("should understand array literals", function () {
    var array = [];
    expect(array).toEqual([]);

  // arrays are zero indexed; sets the first value (index of 0) to 1
    array[0] = 1;
    expect(array).toEqual([1]);

  // sets the second value (index of 1) to 2
    array[1] = 2;
    expect(array).toEqual([1, 2]);

  // pushes (adds) the value 3 to the array
    array.push(3);
    expect(array).toEqual([1, 2, 3]);
  });

  it("should understand array length", function () {
    var fourNumberArray = [1, 2, 3, 4];

    expect(fourNumberArray.length).toBe(4);
    fourNumberArray.push(5, 6);
    expect(fourNumberArray.length).toBe(6);

  // sets a 10 element array; returns [undefined × 10];
  // even though length is set, it is not static (user can add any number of items)
    var tenEmptyElementArray = new Array(10);
    expect(tenEmptyElementArray.length).toBe(10);

  // sets a 5 element array; returns [undefined × 5]
    tenEmptyElementArray.length = 5;
    expect(tenEmptyElementArray.length).toBe(5);
  });

  it("should slice arrays", function () {
    var array = ["peanut", "butter", "and", "jelly"];

    expect(array.slice(0, 1)).toEqual(['peanut']);
    expect(array.slice(0, 2)).toEqual([ 'peanut', 'butter' ]);
  // start @ and; stop @ and; will empty array b/c slice extracts up to but not including the end
    expect(array.slice(2, 2)).toEqual([]);
    expect(array.slice(2, 20)).toEqual([ 'and', 'jelly' ]);
    expect(array.slice(3, 0)).toEqual([]);
    expect(array.slice(3, 100)).toEqual([ 'jelly' ]);
    expect(array.slice(5, 1)).toEqual([]);
  });

  // extra: array.slice(2, -1) extracts third element through the second-to-last element in the sequence
  // result is ["and"]
  // as a negative index, end indicates an offset from the end of the sequence

  it("should know array references", function () {
    var array = [ "zero", "one", "two", "three", "four", "five" ];

    function passedByReference(refArray) {
        refArray[1] = "changed in function";
    }
    passedByReference(array);
    expect(array[1]).toBe('changed in function');
//  var array and var assignedArray are pointing to same content
    var assignedArray = array;
    assignedArray[5] = "changed in assignedArray";
    expect(array[5]).toBe('changed in assignedArray');
//
    var copyOfArray = array.slice();
    copyOfArray[3] = "changed in copyOfArray";
    expect(array[3]).toBe('three');
  });

  it("should push and pop", function () {
    var array = [1, 2];
    array.push(3);

    expect(array).toEqual([1,2,3]);
// the pop() method removes the last element from an array and returns that element
    var poppedValue = array.pop();
    expect(poppedValue).toBe(3);
    expect(array).toEqual([1,2]);
  });

  it("should know about shifting arrays", function () {
    var array = [1, 2];
// the unshift() method adds one or more elements to the beginning of an array and returns the new length
    array.unshift(3);
    expect(array).toEqual([ 3, 1, 2 ]);
// the shift() method removes the first element from an array and returns that element
    var shiftedValue = array.shift();
    expect(shiftedValue).toEqual(3);
    expect(array).toEqual([ 1, 2 ]);
  });
});
