// JavaScript Spread Operator (`...`) Examples

console.log("Spread Operator Examples");

// 1. Copying an Array (Avoids Changing the Original)
let originalArray = [1, 2, 3];
let copiedArray = [...originalArray]; // Creates a new independent copy
copiedArray.push(4);
console.log("Original Array:", originalArray); // [1, 2, 3]
console.log("Copied Array:", copiedArray); // [1, 2, 3, 4]

// 2. Merging Two Arrays
let arr1 = [10, 20, 30];
let arr2 = [40, 50, 60];
let mergedArray = [...arr1, ...arr2]; // Combines both arrays
console.log("Merged Array:", mergedArray); // [10, 20, 30, 40, 50, 60]

// 3. Removing Duplicates from an Array
let repeatedArray = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
let uniqueArray = [...new Set(repeatedArray)]; // Converts Set back to Array
console.log("Unique Array:", uniqueArray); // [1, 2, 3, 4, 5]

// 4. Expanding a String into an Array of Characters
let word = "hello";
let letters = [...word]; // Converts string to an array of individual characters
console.log("Letters Array:", letters); // ['h', 'e', 'l', 'l', 'o']

// 5. Combining Objects (Shallow Copy)
let obj1 = { name: "Alice", age: 25 };
let obj2 = { city: "New York", age: 30 }; // Age will be overwritten
let mergedObject = { ...obj1, ...obj2 }; // Merges obj2 into obj1
console.log("Merged Object:", mergedObject);
// { name: 'Alice', age: 30, city: 'New York' } (age gets updated)

// 6. Adding New Properties to an Object
let person = { name: "Bob", age: 22 };
let updatedPerson = { ...person, country: "USA" }; // Adds a new property
console.log("Updated Person:", updatedPerson);
// { name: 'Bob', age: 22, country: 'USA' }

// 7. Passing Array Elements as Function Arguments
let numbers = [5, 10, 15];
console.log("Max Number:", Math.max(...numbers)); // Expands array values as arguments

// 8. Using Spread Operator Inside a Function
function sum(a, b, c) {
    return a + b + c;
}
console.log("Sum:", sum(...numbers)); // Same as sum(5, 10, 15)

// 9. Cloning a Nested Object (Shallow Copy)
let nestedObj = { a: 1, b: { c: 2 } };
let shallowCopy = { ...nestedObj };
shallowCopy.b.c = 99; // This modifies both objects (because it's a shallow copy)
console.log("Original Nested Object:", nestedObj); // { a: 1, b: { c: 99 } }
console.log("Shallow Copy:", shallowCopy); // { a: 1, b: { c: 99 } }

// 10. Deep Copying an Object (Using JSON)
let deepCopy = JSON.parse(JSON.stringify(nestedObj));
deepCopy.b.c = 500;
console.log("Deep Copy:", deepCopy); // { a: 1, b: { c: 500 } }
console.log("Original After Deep Copy:", nestedObj); // { a: 1, b: { c: 99 } }
