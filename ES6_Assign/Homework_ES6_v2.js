// ==========================================
// Part 1: Callbacks
// ==========================================

console.log("--- Part 1: Callbacks ---");

// Exercise Task:
// Create a function fetchData that simulates fetching data from a server. 
// This function should take two arguments: a url (string) and a callback function. 
// Use setTimeout to simulate a delay of 2 seconds before calling the callback function with the fetched data.

function fetchDataCallback(url, callback) {
    console.log(`Fetching data from ${url}...`);
    setTimeout(() => {
        const data = `Data from ${url}`;
        callback(data);
    }, 2000);
}

// Testing Part 1
// fetchDataCallback("https://api.example.com/users", (data) => {
//     console.log("Callback received:", data);
// });


// ==========================================
// Part 2: Promises
// ==========================================

console.log("\n--- Part 2: Promises ---");

// Exercise Task:
// Refactor the fetchData function to return a promise instead of using a callback.
// Instructions:
// The function should still simulate a 2-second delay.
// If the url is empty or not provided, reject the promise with an error message: "Invalid URL".

function fetchData(url) {
    return new Promise((resolve, reject) => {
        console.log(`Fetching data from ${url}...`);

        if (!url) {
            reject("Invalid URL");
            return;
        }

        setTimeout(() => {
            const data = `Data from ${url}`;
            resolve(data);
        }, 2000);
    });
}

// Testing Part 2
// fetchData("https://api.example.com/posts")
//     .then(data => console.log("Promise resolved:", data))
//     .catch(error => console.error("Promise rejected:", error));


// ==========================================
// Part 3: Async/Await
// ==========================================

console.log("\n--- Part 3: Async/Await ---");

// Exercise Task:
// Refactor the code to use async/await to fetch data and handle errors.
// Instructions:
// Create an async function named loadData that calls fetchData with a given url.
// Use try/catch to handle any errors that occur during the data fetching process.

async function loadData(url) {
    try {
        const data = await fetchData(url);
        console.log("Async/Await received:", data);
    } catch (error) {
        console.error("Async/Await error:", error);
    }
}

// Testing Part 3
// We wrap the tests in a self-enforcing function or just run them sequentially 
// to see the output clearly, but since they are async, they might overlap in console output.
// Here is a sequence to demonstrate them running:

async function runTests() {
    console.log("Starting Tests...");

    // Test Success
    await loadData("https://api.example.com/products");

    // Test Failure
    await loadData("");
}

runTests();
