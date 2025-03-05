// Array Methods in JavaScript

console.log("Array Methods in JavaScript");

// 1. push() - Adds an element to the end of an array
let fruits = ["Apple", "Banana"];
fruits.push("Orange");
console.log("push():", fruits); // ["Apple", "Banana", "Orange"]

// 2. pop() - Removes the last element from an array
fruits.pop();
console.log("pop():", fruits); // ["Apple", "Banana"]

// 3. shift() - Removes the first element from an array
fruits.shift();
console.log("shift():", fruits); // ["Banana"]

// 4. unshift() - Adds an element to the beginning of an array
fruits.unshift("Mango");
console.log("unshift():", fruits); // ["Mango", "Banana"]

// 5. map() - Creates a new array by modifying each element
let numbers = [1, 2, 3];
let squared = numbers.map(num => num * num);
console.log("map():", squared); // [1, 4, 9]

// 6. filter() - Returns elements that match a condition
let evenNumbers = numbers.filter(num => num % 2 === 0);
console.log("filter():", evenNumbers); // [2]

// 7. reduce() - Reduces an array to a single value
let sum = numbers.reduce((acc, num) => acc + num, 0);
console.log("reduce():", sum); // 6

// 8. forEach() - Iterates over each element (no return value)
numbers.forEach(num => console.log("forEach:", num * 2));

// 9. find() - Returns the first element that matches a condition
let found = numbers.find(num => num > 1);
console.log("find():", found); // 2

// 10. findIndex() - Returns the index of the first matching element
let index = numbers.findIndex(num => num > 1);
console.log("findIndex():", index); // 1

// 11. includes() - Checks if an array contains a value
console.log("includes(2):", numbers.includes(2)); // true

// 12. sort() - Sorts an array (alphabetically by default)
let letters = ["b", "c", "a"];
letters.sort();
console.log("sort():", letters); // ["a", "b", "c"]

// 13. reverse() - Reverses the order of elements in an array
letters.reverse();
console.log("reverse():", letters); // ["c", "b", "a"]

// 14. concat() - Merges two arrays
let moreFruits = ["Pineapple", "Grapes"];
let allFruits = fruits.concat(moreFruits);
console.log("concat():", allFruits); // ["Mango", "Banana", "Pineapple", "Grapes"]

// 15. slice() - Extracts part of an array
let slicedFruits = allFruits.slice(1, 3);
console.log("slice():", slicedFruits); // ["Banana", "Pineapple"]

// 16. splice() - Adds/removes elements in an array
allFruits.splice(1, 1, "Strawberry"); // Removes "Banana", adds "Strawberry"
console.log("splice():", allFruits); // ["Mango", "Strawberry", "Pineapple", "Grapes"]
