let firstName: string = "Maddox";
let lastName: string = "Duggan";

let greeter = (first: string, last: string): string => {
    return `Hello ${first} ${last}`;
};

console.log(greeter(firstName, lastName));