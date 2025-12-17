// 1. 数据与变量
// 创建一个购物清单数组
let shoppingList = ["牛奶", "鸡蛋", "面包"];
console.log("初始清单:", shoppingList);

// 2. 数组应用
// 向购物清单中添加两样物品
shoppingList.push("苹果", "香蕉");
console.log("添加物品后的清单:", shoppingList);

// 从购物清单中删除最后一项物品
let removedItem = shoppingList.pop();
console.log("删除最后一项物品后的清单:", shoppingList);
console.log("被删除的物品:", removedItem);

// 3. 条件与循环
// 创建一个函数，当购物清单中的物品超过5项时，在控制台输出"你的购物车满了"
function checkCartFull(list) {
    if (list.length > 5) {
        console.log("你的购物车满了");
    } else {
        console.log("购物车还可以继续添加");
    }
}

// 测试购物车是否满 (这里当前只有4个物品: 牛奶, 鸡蛋, 面包, 苹果)
checkCartFull(shoppingList);

// 为了演示效果，再添加两个物品让它超过5个
shoppingList.push("西瓜", "橙子");
// 现在有6个物品
checkCartFull(shoppingList);


// 使用循环语句遍历购物清单，将每一项物品在控制台上以编号的形式输出
console.log("购物清单列表:");
for (let i = 0; i < shoppingList.length; i++) {
    console.log((i + 1) + ". " + shoppingList[i]);
}

// 4. 函数与对象
// 创建一个函数，该函数接受物品名称作为参数，并返回该物品是否在购物清单中
function checkItem(itemName) {
    if (shoppingList.includes(itemName)) {
        return true;
    } else {
        return false;
    }
}

console.log("清单中是否有牛奶?", checkItem("牛奶"));
console.log("清单中是否有车厘子?", checkItem("车厘子"));

// 创建一个购物物品对象
let item = {
    name: "牛奶",
    price: 12,
    quantity: 1
};

console.log("物品对象:", item);
