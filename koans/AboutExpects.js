describe("About Expects", function() {

  // We shall contemplate truth by testing reality, via spec expectations.
  it("should expect true", function() {
  // changed expect(false) to expect(true); true is truthy
    expect(true).toBeTruthy(); //This should be true
  });

  // To understand reality, we must compare our expectations against reality.
  it("should expect equality", function () {
  // changed var expectedValue; 1 + 1 === 1 + 1;
    var expectedValue = 1 + 1;
    var actualValue = 1 + 1;

    expect(actualValue === expectedValue).toBeTruthy();
  });

  // Some ways of asserting equality are better than others.
  it("should assert equality a better way", function () {
    var expectedValue = 1 + 1;
    var actualValue = 1 + 1;

  // toEqual() compares using common sense equality.
  // prefered to: expect(actualValue === expectedValue).toBeTruthy();
    expect(actualValue).toEqual(expectedValue);
  });

  // Sometimes you need to be really exact about what you "type."
  it("should assert equality with ===", function () {
  // must assign a string value to var expectedValue; case sensitive
    var expectedValue = '2';
    var actualValue = (2).toString();

  // toBe() will always use === to compare.
    expect(actualValue).toBe(expectedValue);
  });

  // Sometimes we will ask you to fill in the values.
  it("should have filled in values", function () {
    expect('The Iron Yard Rocks').toEqual('The Iron Yard Rocks');
  });
});
