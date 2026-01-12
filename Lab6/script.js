const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const circles = document.querySelectorAll('.circle');

let currentActive = 1;

// 模拟异步操作的 Promise 函数
function mockAsyncOp() {
    return new Promise((resolve) => {
        // 模拟 500ms 延迟
        setTimeout(() => {
            resolve();
        }, 500);
    });
}

next.addEventListener('click', async () => {
    // 禁用按钮防止重复点击
    next.disabled = true;
    prev.disabled = true;

    // 等待异步操作完成
    await mockAsyncOp();

    currentActive++;

    if (currentActive > circles.length) {
        currentActive = circles.length;
    }

    update();
});

prev.addEventListener('click', () => {
    currentActive--;

    if (currentActive < 1) {
        currentActive = 1;
    }

    update();
});

function update() {
    circles.forEach((circle, idx) => {
        if (idx < currentActive) {
            circle.classList.add('active');
        } else {
            circle.classList.remove('active');
        }
    });

    const actives = document.querySelectorAll('.active');

    // 计算进度条宽度: (激活的圆圈数 - 1) / (总圆圈数 - 1) * 100%
    progress.style.width = (actives.length - 1) / (circles.length - 1) * 100 + '%';

    // 重新启用按钮逻辑
    if (currentActive === 1) {
        prev.disabled = true;
        next.disabled = false;
    } else if (currentActive === circles.length) {
        next.disabled = true;
        prev.disabled = false;
    } else {
        prev.disabled = false;
        next.disabled = false;
    }
}
