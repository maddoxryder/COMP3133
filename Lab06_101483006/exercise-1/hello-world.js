var firstName = "Maddox";
var lastName = "Duggan";
var greeter = function (first, last) {
    return "Hello ".concat(first, " ").concat(last);
};
console.log(greeter(firstName, lastName));
