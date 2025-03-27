// Object Methods in JavaScript

console.log("Object Methods in JavaScript");

// 1. Creating an object
let user = {
    name: "Alice",
    age: 25,
    country: "USA"
};

// 2. Object.keys() - Returns an array of keys in an object
console.log("Object.keys(user):", Object.keys(user)); // ["name", "age", "country"]

// 3. Object.values() - Returns an array of values in an object
console.log("Object.values(user):", Object.values(user)); // ["Alice", 25, "USA"]

// 4. Object.entries() - Returns an array of key-value pairs
console.log("Object.entries(user):", Object.entries(user)); 
// [["name", "Alice"], ["age", 25], ["country", "USA"]]

// 5. Object.assign() - Copies properties from one object to another
let additionalInfo = { gender: "Female" };
let mergedUser = Object.assign({}, user, additionalInfo);
console.log("Object.assign(user, additionalInfo):", mergedUser); 
// {name: "Alice", age: 25, country: "USA", gender: "Female"}

// 6. Object.freeze() - Prevents modification of an object
let frozenUser = Object.freeze({ name: "Bob", age: 30 });
frozenUser.age = 35; // This will not change
console.log("Object.freeze(frozenUser):", frozenUser); // { name: "Bob", age: 30 }

// 7. Object.seal() - Allows modification of existing properties but prevents adding/removing properties
let sealedUser = Object.seal({ name: "Charlie", age: 28 });
sealedUser.age = 30; // Allowed
sealedUser.city = "New York"; // Not allowed
console.log("Object.seal(sealedUser):", sealedUser); // { name: "Charlie", age: 30 }

// 8. Checking if an object is frozen
console.log("Object.isFrozen(frozenUser):", Object.isFrozen(frozenUser)); // true

// 9. Checking if an object is sealed
console.log("Object.isSealed(sealedUser):", Object.isSealed(sealedUser)); // true

// 10. Deleting a property from an object
let person = { name: "David", age: 40 };
delete person.age;
console.log("delete person.age:", person); // { name: "David" }
