// JSON Methods in JavaScript

console.log("JSON Methods in JavaScript");

// 1. JSON.stringify() - Converts an object to a JSON string
let person = { name: "Alice", age: 30, city: "New York" };

// Converts the JavaScript object `person` into a JSON string
let jsonString = JSON.stringify(person);
console.log("JSON.stringify(person):", jsonString);
// Output: '{"name":"Alice","age":30,"city":"New York"}'

// 2. JSON.stringify() with Formatting (Pretty-Printing)
// Adding `null, 2` makes the output more readable with indentation
let prettyJSON = JSON.stringify(person, null, 2);
console.log("Pretty JSON.stringify():", prettyJSON);
/* Output:
{
  "name": "Alice",
  "age": 30,
  "city": "New York"
}
*/

// 3. JSON.parse() - Converts a JSON string back to a JavaScript object
// This method reverses JSON.stringify()
let parsedObject = JSON.parse(jsonString);
console.log("JSON.parse(jsonString):", parsedObject);
// Output: { name: 'Alice', age: 30, city: 'New York' }

// 4. JSON.parse() with a Reviver Function
// The reviver function is used to modify values while parsing JSON
let modifiedObject = JSON.parse(jsonString, (key, value) => {
    return key === "age" ? value + 5 : value; // Increase age by 5
});
console.log("JSON.parse() with reviver:", modifiedObject);
// Output: { name: 'Alice', age: 35, city: 'New York' }

// 5. JSON.stringify() with a Replacer Function
// The replacer function allows filtering out specific keys while converting an object to JSON
let filteredJSON = JSON.stringify(person, (key, value) => {
    return key === "age" ? undefined : value; // Remove "age" from the JSON string
});
console.log("JSON.stringify() with replacer:", filteredJSON);
// Output: '{"name":"Alice","city":"New York"}'

// 6. Handling Invalid JSON Using try...catch
// This prevents the program from crashing when parsing a faulty JSON string
let invalidJSON = "{ name: Alice, age: 30 }"; // Incorrect JSON format (missing double quotes)
try {
    let parsedData = JSON.parse(invalidJSON);
    console.log("Parsed invalid JSON:", parsedData);
} catch (error) {
    console.log("Error parsing JSON:", error.message);
}
// Output: Error parsing JSON: Unexpected token n in JSON at position 2

// 7. Deep Copying an Object Using JSON Methods
// JSON.stringify() and JSON.parse() together can create a deep copy of an object
let originalObject = { a: 1, b: { c: 2 } };

// Deep copy: Converting to JSON string and then back to an object
let deepCopy = JSON.parse(JSON.stringify(originalObject));

// Modifying the copied object does not affect the original
deepCopy.b.c = 99;

console.log("Original object:", originalObject); // { a: 1, b: { c: 2 } }
console.log("Deep copied object:", deepCopy); // { a: 1, b: { c: 99 } }

/* Why use this method for deep copy?
   - If we simply do `let copiedObject = originalObject`, both objects share the same reference.
   - Changing `copiedObject` would also change `originalObject`.
   - `JSON.parse(JSON.stringify(obj))` ensures a **new object** is created, breaking the reference.
*/

// 8. Using JSON with Arrays
let students = [
    { name: "John", age: 22 },
    { name: "Emma", age: 24 }
];

// Convert array of objects to JSON
let studentsJSON = JSON.stringify(students);
console.log("Students JSON:", studentsJSON);
// Output: '[{"name":"John","age":22},{"name":"Emma","age":24}]'

// Convert JSON back to array of objects
let parsedStudents = JSON.parse(studentsJSON);
console.log("Parsed Students:", parsedStudents);
// Output: [ { name: 'John', age: 22 }, { name: 'Emma', age: 24 } ]
