// 作业1. Let, Const 和 Var
// -------------------------------------------------------------------------
/*
任务: 将以下代码重写为使用 let 和 const 代替 var。
解释为什么在每种情况下 let 或 const 更合适。

原始代码:
var name = "Alice";
if (true) {
    var name = "Bob";
    console.log(name); // 输出: Bob
}
console.log(name); // 输出: Bob
*/

// 重写后的代码:
let name = "Alice"; // 使用 let 因为我们可能在同一作用域（或者是为了演示块级作用域）修改/使用它，且它是一个可变的值。
const PI = 3.14; // 如果有常量，应该使用 const。在这个例子中主要演示 name。

if (true) {
    let name = "Bob"; // 使用 let，创建一个新的块级作用域变量 name
    console.log(name); // 输出: Bob
}
console.log(name); // 输出: Alice

/*
解释:
1. 'let' 和 'const' 具有块级作用域 (Block Scope)，而 'var' 只有函数作用域 (Function Scope)。
   这意味着在 if 块内部声明的 'let name' 只在该块内有效，不会污染或覆盖外部的 'name' 变量。
2. 在这个例子中，使用 let 比 var 更合适，因为它避免了变量提升 (Hoisting) 带来的意外行为，
   并且能正确隔离不同作用域下的同名变量。
3. 如果变量不需要重新赋值，应优先使用 'const' 来提高代码的可读性和安全性。
*/


// 作业2. 箭头函数 (Arrow Functions)
// -------------------------------------------------------------------------
/*
任务: 将以下函数转换为箭头函数。
然后解释箭头函数如何与常规函数不同地处理 this 关键字。

原始代码:
function add(a, b) {
    return a + b;
}
*/

// 转换后的箭头函数:
const add = (a, b) => a + b;

/*
解释:
1. 箭头函数没有自己的 'this' 绑定。它会捕获其所在上下文（词法作用域）的 'this' 值。
   常规函数 (Regular Functions) 的 'this' 取决于函数的调用方式（例如作为对象方法调用、直接调用或使用 new）。
2. 在回调函数中，箭头函数的这个特性非常有用，因为它不需要使用 .bind(this) 或 var self = this 来保持上下文。
*/


// 作业3: 模板字面量 (Template Literals)
// -------------------------------------------------------------------------
/*
任务: 使用模板字面量重写以下字符串拼接代码。在字符串中添加一个新行。

原始代码:
let greeting = "Hello, " + name + "! Welcome to the course.";
*/

// 重写后的代码 (假设 name 已在上面定义):
let greeting = `Hello, ${name}! 
Welcome to the course.`; 

console.log(greeting);


// 作业4. 解构赋值 (Destructuring)
// -------------------------------------------------------------------------
/*
任务: 使用解构赋值从 person 对象中提取 name 和 age 属性。
然后编写一个函数，在参数列表中解构对象的属性。
*/

const person = {
    name: "Alice",
    age: 25,
    city: "Sydney"
};

// 1. 提取 name 和 age
const { name: personName, age } = person; 
// 注意：因为上面已经定义了 name 变量，这里我重命名为 personName 以避免冲突，
// 或者我可以放在一个新的代码块中。
console.log(personName, age);

// 2. 在参数列表中解构
const printPersonInfo = ({ name, age }) => {
    console.log(`Name: ${name}, Age: ${age}`);
};

printPersonInfo(person);


// 作业5. 默认参数（Default Parameters）
// -------------------------------------------------------------------------
/*
任务：编写一个计算矩形面积的函数。如果没有提供高度，假设它是一个正方形。
使用默认参数为高度设置默认值。
*/

const calculateArea = (width, height = width) => {
    return width * height;
};

console.log(calculateArea(5, 10)); // 50 (矩形)
console.log(calculateArea(5));     // 25 (正方形)


// 作业6. Rest/Spread 运算符
// -------------------------------------------------------------------------
/*
任务: 使用 Rest 运算符创建一个函数，能够将任意数量的参数相加。
然后使用 Spread 运算符合并两个数组。
*/

// 1. Rest 运算符 (任意数量参数相加)
const sum = (...args) => {
    return args.reduce((total, current) => total + current, 0);
};

console.log(sum(1, 2, 3, 4)); // 10

// 2. Spread 运算符 (合并数组)
let arr1 = [1, 2];
let arr2 = [3, 4];

let combinedArray = [...arr1, ...arr2];

console.log(combinedArray); // [1, 2, 3, 4]
