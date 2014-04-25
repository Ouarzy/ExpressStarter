var Calculator = function () {
    this.multiple = function (valueOne, valueTwo) {
        return valueOne * valueTwo;
    };
};

describe("CalculatorSpec", function () {
    var calculator = new Calculator();

    it("should multiple two positive numbers", function () {
        var result = calculator.multiple(2, 5);
        expect(result).toBe(10);
    });

    it("could fail", function () {
        expect(true).toBe(false);
    });
});
