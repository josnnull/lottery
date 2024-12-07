// 奖项配置
const PRIZES = {
    special: { name: '特等奖', count: 1 },
    first: { name: '一等奖', count: 3 },
    second: { name: '二等奖', count: 5 },
    third: { name: '三等奖', count: 10 }
};

// 员工数据
let employees = [
    "张三", "李四", "王五", "赵六", "钱七", "孙八", "周九", "吴十",
    "郑十一", "王十二", "李十三", "赵十四", "钱十五", "孙十六", "周十七", "吴十八",
    "郑十九", "王二十", "李二十一", "赵二十二", "钱二十三", "孙二十四", "周二十五"
];

// 记录每个奖项的中奖人员
const prizeWinners = {
    special: new Set(),
    first: new Set(),
    second: new Set(),
    third: new Set()
};

// 抽奖状态
let isLotteryRunning = false;
let intervalId = null;

// DOM 元素
const nameDisplay = document.getElementById('nameDisplay');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const prizeSelect = document.getElementById('prizeSelect');
const fileInput = document.getElementById('fileInput');
const fileName = document.getElementById('fileName');
const winnersList = document.getElementById('winnersList');

// 文件上传处理
fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        fileName.textContent = file.name;
        const reader = new FileReader();
        reader.onload = function(e) {
            // 将文件内容按行分割并过滤空行
            employees = e.target.result.split(/\r?\n/).filter(name => name.trim());
            resetLottery(); // 重置抽奖
        };
        reader.readAsText(file, 'UTF-8');
    }
});

// 更新奖项标题
function updatePrizeTitle() {
    const prizeTitle = document.querySelector('.prize-title');
    const currentPrize = PRIZES[prizeSelect.value];
    prizeTitle.textContent = `${currentPrize.name}（${currentPrize.count}名）`;
}

// 检查当前奖项是否已抽完
function isPrizeCompleted() {
    const currentPrize = prizeSelect.value;
    return prizeWinners[currentPrize].size >= PRIZES[currentPrize].count;
}

// 更新中奖记录显示
function updateWinnersList() {
    winnersList.innerHTML = '';
    Object.entries(PRIZES).forEach(([key, prize]) => {
        const winners = Array.from(prizeWinners[key]);
        if (winners.length > 0) {
            const div = document.createElement('div');
            div.className = 'winner-item';
            div.innerHTML = `
                <span>${prize.name}：</span>
                <span>${winners.join('、')}</span>
            `;
            winnersList.appendChild(div);
        }
    });
}

// 随机展示名字的动画效果
function showRandomName() {
    const availableEmployees = employees.filter(emp => 
        !Object.values(prizeWinners).some(set => set.has(emp))
    );
    
    if (availableEmployees.length === 0) {
        nameDisplay.textContent = "抽奖已结束";
        return;
    }
    const randomIndex = Math.floor(Math.random() * availableEmployees.length);
    nameDisplay.textContent = availableEmployees[randomIndex];
}

// 开始/停止抽奖
function toggleLottery() {
    if (!isLotteryRunning) {
        // 检查是否还有可抽奖的名额
        if (isPrizeCompleted()) {
            alert(`当前${PRIZES[prizeSelect.value].name}已抽完，请选择其他奖项！`);
            return;
        }

        // 检查是否还有可抽奖的人员
        const availableEmployees = employees.filter(emp => 
            !Object.values(prizeWinners).some(set => set.has(emp))
        );
        
        if (availableEmployees.length === 0) {
            alert("所有员工都已中奖！");
            return;
        }
        
        isLotteryRunning = true;
        startBtn.textContent = "停止";
        intervalId = setInterval(showRandomName, 50);
        
        prizeSelect.disabled = true;
        resetBtn.disabled = true;
        fileInput.disabled = true;
    } else {
        clearInterval(intervalId);
        isLotteryRunning = false;
        startBtn.textContent = "开始抽奖";
        
        const winner = nameDisplay.textContent;
        const currentPrize = prizeSelect.value;
        prizeWinners[currentPrize].add(winner);
        
        nameDisplay.innerHTML = `🎉 恭喜 ${winner} 获得${PRIZES[currentPrize].name}！ 🎉`;
        
        prizeSelect.disabled = false;
        resetBtn.disabled = false;
        fileInput.disabled = false;
        
        updateWinnersList();
    }
}

// 重置抽奖
function resetLottery() {
    if (isLotteryRunning) {
        clearInterval(intervalId);
        isLotteryRunning = false;
    }
    Object.keys(prizeWinners).forEach(key => prizeWinners[key].clear());
    nameDisplay.textContent = "准备开始抽奖...";
    startBtn.textContent = "开始抽奖";
    prizeSelect.disabled = false;
    resetBtn.disabled = false;
    fileInput.disabled = false;
    updatePrizeTitle();
    updateWinnersList();
}

// 事件监听
document.addEventListener('DOMContentLoaded', function() {
    startBtn.addEventListener('click', toggleLottery);
    resetBtn.addEventListener('click', resetLottery);
    prizeSelect.addEventListener('change', updatePrizeTitle);
    updatePrizeTitle();
    updateWinnersList();
}); 