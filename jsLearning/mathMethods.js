// Math Methods in JavaScript

console.log("Math Methods in JavaScript");

// 1. Math.round() - Rounds to the nearest integer
console.log("Math.round(4.7):", Math.round(4.7)); // 5
console.log("Math.round(4.3):", Math.round(4.3)); // 4

// 2. Math.floor() - Rounds down to the nearest integer
console.log("Math.floor(4.9):", Math.floor(4.9)); // 4

// 3. Math.ceil() - Rounds up to the nearest integer
console.log("Math.ceil(4.1):", Math.ceil(4.1)); // 5

// 4. Math.abs() - Returns the absolute value
console.log("Math.abs(-10):", Math.abs(-10)); // 10

// 5. Math.pow(x, y) - Returns x raised to the power of y
console.log("Math.pow(2, 3):", Math.pow(2, 3)); // 8 (2³)

// 6. Math.sqrt(x) - Returns the square root of x
console.log("Math.sqrt(16):", Math.sqrt(16)); // 4

// 7. Math.max() - Returns the largest number from a set of values
console.log("Math.max(10, 20, 5):", Math.max(10, 20, 5)); // 20

// 8. Math.min() - Returns the smallest number from a set of values
console.log("Math.min(10, 20, 5):", Math.min(10, 20, 5)); // 5

// 9. Math.random() - Generates a random number between 0 and 1
console.log("Math.random():", Math.random()); // e.g., 0.567823

// 10. Generating a random number in a specific range (1 to 10)
let randomNum = Math.floor(Math.random() * 10) + 1;
console.log("Random number (1-10):", randomNum); // Random number between 1 and 10

// 11. Math.trunc() - Removes the decimal part of a number
console.log("Math.trunc(4.9):", Math.trunc(4.9)); // 4

// 12. Math.sign() - Returns 1 for positive, -1 for negative, 0 for zero
console.log("Math.sign(-10):", Math.sign(-10)); // -1
console.log("Math.sign(10):", Math.sign(10)); // 1
console.log("Math.sign(0):", Math.sign(0)); // 0

// 13. Math.cbrt() - Returns the cube root of a number
console.log("Math.cbrt(27):", Math.cbrt(27)); // 3

// 14. Math.log() - Returns the natural logarithm (base e)
console.log("Math.log(1):", Math.log(1)); // 0

// 15. Math.log10() - Returns the logarithm base 10
console.log("Math.log10(100):", Math.log10(100)); // 2
