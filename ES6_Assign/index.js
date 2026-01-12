"use strict";
// ==========================================
// Part 2: Basic Type Annotations
// ==========================================
console.log("--- Part 2: Basic Types ---");
// Exercise Task:
// Write a function that takes two numbers as parameters and returns their sum. 
// Use TypeScript to annotate the types of the parameters and the return value.
function add(a, b) {
    return a + b;
}
const sumResult = add(5, 10);
console.log(`Sum of 5 and 10 is: ${sumResult}`);
// ==========================================
// Part 3: Working with Interfaces
// ==========================================
console.log("\n--- Part 3: Interfaces ---");
function greet(person) {
    console.log(`Hello, my name is ${person.name} and I am ${person.age} years old.`);
}
const student = {
    name: "Alice",
    age: 25
};
greet(student);
