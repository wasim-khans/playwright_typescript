// Date Methods in JavaScript

console.log("Date Methods in JavaScript");

// 1. Creating a new Date object (current date and time)
let currentDate = new Date();
console.log("Current Date:", currentDate);

// 2. Creating a Date object with a specific date
let specificDate = new Date("2023-12-25");
console.log("Specific Date:", specificDate); // Mon Dec 25 2023

// 3. getFullYear() - Returns the year
console.log("getFullYear():", currentDate.getFullYear()); // e.g., 2025

// 4. getMonth() - Returns the month (0-11)
console.log("getMonth():", currentDate.getMonth()); // e.g., 2 (March) [0-based index]

// 5. getDate() - Returns the day of the month (1-31)
console.log("getDate():", currentDate.getDate()); // e.g., 6

// 6. getDay() - Returns the day of the week (0-6, where 0 = Sunday)
console.log("getDay():", currentDate.getDay()); // e.g., 4 (Thursday)

// 7. getHours() - Returns the hour (0-23)
console.log("getHours():", currentDate.getHours()); // e.g., 14 (2 PM)

// 8. getMinutes() - Returns the minutes (0-59)
console.log("getMinutes():", currentDate.getMinutes()); // e.g., 30

// 9. getSeconds() - Returns the seconds (0-59)
console.log("getSeconds():", currentDate.getSeconds()); // e.g., 45

// 10. getTime() - Returns the timestamp (milliseconds since 1970)
console.log("getTime():", currentDate.getTime()); // e.g., 1741322400000

// 11. setFullYear() - Sets a new year
let newDate = new Date();
newDate.setFullYear(2030);
console.log("setFullYear(2030):", newDate);

// 12. setMonth() - Sets a new month (0-11)
newDate.setMonth(5); // June (0-based)
console.log("setMonth(5):", newDate);

// 13. setDate() - Sets the day of the month
newDate.setDate(15);
console.log("setDate(15):", newDate);

// 14. setHours(), setMinutes(), setSeconds()
newDate.setHours(10);
newDate.setMinutes(45);
newDate.setSeconds(30);
console.log("setHours(10), setMinutes(45), setSeconds(30):", newDate);

// 15. toDateString() - Returns a readable date string
console.log("toDateString():", currentDate.toDateString()); // e.g., "Thu Mar 06 2025"

// 16. toISOString() - Returns the date in ISO format
console.log("toISOString():", currentDate.toISOString()); // e.g., "2025-03-06T12:30:45.678Z"

// 17. toLocaleDateString() - Returns a formatted date based on locale
console.log("toLocaleDateString():", currentDate.toLocaleDateString()); // e.g., "3/6/2025"

// 18. toLocaleTimeString() - Returns a formatted time based on locale
console.log("toLocaleTimeString():", currentDate.toLocaleTimeString()); // e.g., "2:30:45 PM"

// 19. Comparing two dates
let date1 = new Date("2025-03-06");
let date2 = new Date("2025-03-07");
console.log("date1 < date2:", date1 < date2); // true

// 20. Calculating the difference in days between two dates
let differenceInMs = date2 - date1;
let differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
console.log("Difference in days:", differenceInDays); // 1
