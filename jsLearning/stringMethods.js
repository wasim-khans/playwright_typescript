// String Methods in JavaScript

console.log("String Methods in JavaScript");

// 1. length - Returns the length of a string
let text = "Hello JavaScript";
console.log("length:", text.length); // 17

// 2. toUpperCase() - Converts a string to uppercase
console.log("toUpperCase():", text.toUpperCase()); // "HELLO JAVASCRIPT"

// 3. toLowerCase() - Converts a string to lowercase
console.log("toLowerCase():", text.toLowerCase()); // "hello javascript"

// 4. charAt() - Returns the character at a specific index
console.log("charAt(6):", text.charAt(6)); // "J"

// 5. indexOf() - Finds the first occurrence of a substring
console.log("indexOf('Java'):", text.indexOf("Java")); // 6

// 6. lastIndexOf() - Finds the last occurrence of a substring
let newText = "Hello JavaScript Java";
console.log("lastIndexOf('Java'):", newText.lastIndexOf("Java")); // 17

// 7. includes() - Checks if a string contains a certain value
console.log("includes('Script'):", text.includes("Script")); // true

// 8. startsWith() - Checks if a string starts with a specific value
console.log("startsWith('Hello'):", text.startsWith("Hello")); // true

// 9. endsWith() - Checks if a string ends with a specific value
console.log("endsWith('Script'):", text.endsWith("Script")); // true

// 10. substring() - Extracts a portion of a string
console.log("substring(6, 10):", text.substring(6, 10)); // "Java"

// 11. slice() - Similar to substring(), supports negative indices
console.log("slice(6, 10):", text.slice(6, 10)); // "Java"
console.log("slice(-10, -6):", text.slice(-10, -6)); // "Java"

// 12. replace() - Replaces part of a string with another value
console.log("replace('JavaScript', 'JS'):", text.replace("JavaScript", "JS")); // "Hello JS"

// 13. split() - Splits a string into an array based on a delimiter
let words = text.split(" ");
console.log("split(' '):", words); // ["Hello", "JavaScript"]

// 14. trim() - Removes whitespace from both ends of a string
let spacedText = "   Trim me!   ";
console.log("trim():", spacedText.trim()); // "Trim me!"
