const chai = require("chai");
const expect = chai.expect;

const calc = require("../app/calculator.js");

describe("Calculator Tests", () => {

    // ADD
    it("add PASS", () => {
        expect(calc.add(5,2)).to.equal(7);
    });

    it("add FAIL", () => {
        expect(calc.add(5,2)).to.equal(8);
    });

    // SUB
    it("sub PASS", () => {
        expect(calc.sub(5,2)).to.equal(3);
    });

    it("sub FAIL", () => {
        expect(calc.sub(5,2)).to.equal(5);
    });

    // MUL
    it("mul PASS", () => {
        expect(calc.mul(5,2)).to.equal(10);
    });

    it("mul FAIL", () => {
        expect(calc.mul(5,2)).to.equal(12);
    });

    // DIV
    it("div PASS", () => {
        expect(calc.div(10,2)).to.equal(5);
    });

    it("div FAIL", () => {
        expect(calc.div(10,2)).to.equal(2);
    });

});
