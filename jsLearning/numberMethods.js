// Number Methods in JavaScript

console.log("Number Methods in JavaScript");

// 1. toFixed(n) - Formats a number to 'n' decimal places
let num1 = 5.6789;
console.log("toFixed(2):", num1.toFixed(2)); // "5.68"

// 2. toPrecision(n) - Formats a number to 'n' total digits
console.log("toPrecision(3):", num1.toPrecision(3)); // "5.68"

// 3. parseInt() - Converts a string to an integer
console.log("parseInt('100px'):", parseInt("100px")); // 100

// 4. parseFloat() - Converts a string to a floating-point number
console.log("parseFloat('10.5px'):", parseFloat("10.5px")); // 10.5

// 5. isNaN() - Checks if a value is NaN (Not-a-Number)
console.log("isNaN('hello'):", isNaN("hello")); // true
console.log("isNaN(123):", isNaN(123)); // false

// 6. isFinite() - Checks if a number is finite
console.log("isFinite(10):", isFinite(10)); // true
console.log("isFinite(Infinity):", isFinite(Infinity)); // false

// 7. Number() - Converts a value to a number
console.log("Number('123'):", Number("123")); // 123
console.log("Number('123abc'):", Number("123abc")); // NaN

// 8. Math.round() - Rounds to the nearest integer
console.log("Math.round(4.7):", Math.round(4.7)); // 5

// 9. Math.floor() - Rounds down to the nearest integer
console.log("Math.floor(4.9):", Math.floor(4.9)); // 4

// 10. Math.ceil() - Rounds up to the nearest integer
console.log("Math.ceil(4.1):", Math.ceil(4.1)); // 5

// 11. Math.abs() - Returns the absolute value
console.log("Math.abs(-5):", Math.abs(-5)); // 5

// 12. Math.pow(x, y) - Returns x raised to the power of y
console.log("Math.pow(2, 3):", Math.pow(2, 3)); // 8

// 13. Math.sqrt(x) - Returns the square root of x
console.log("Math.sqrt(16):", Math.sqrt(16)); // 4

// 14. Math.max() - Returns the largest number from a set of values
console.log("Math.max(10, 20, 5):", Math.max(10, 20, 5)); // 20

// 15. Math.min() - Returns the smallest number from a set of values
console.log("Math.min(10, 20, 5):", Math.min(10, 20, 5)); // 5

// 16. Math.random() - Generates a random number between 0 and 1
console.log("Math.random():", Math.random()); // Random number between 0 and 1

// 17. Generating a random number in a specific range (1 to 10)
let randomNum = Math.floor(Math.random() * 10) + 1;
console.log("Random number (1-10):", randomNum); // Random number between 1 and 10

