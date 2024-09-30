const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 10; // 10x10 клітинок
const cellSize = canvas.width / gridSize;

const treasuresTotal = 5; // Кількість скарбів на полі
let treasuresFound = 0;

// Сітка 10x10, кожна клітинка може бути порожньою (0), зі скарбом (1) або пасткою (-1)
let grid = [];

// Створення сітки з випадковим розташуванням скарбів і пасток
function createGrid() {
    grid = [];
    for (let i = 0; i < gridSize; i++) {
        let row = [];
        for (let j = 0; j < gridSize; j++) {
            row.push(0); // Спочатку всі клітинки порожні
        }
        grid.push(row);
    }

    // Додаємо скарби
    let treasuresAdded = 0;
    while (treasuresAdded < treasuresTotal) {
        let randomX = Math.floor(Math.random() * gridSize);
        let randomY = Math.floor(Math.random() * gridSize);
        if (grid[randomY][randomX] === 0) {
            grid[randomY][randomX] = 1; // 1 означає скарб
            treasuresAdded++;
        }
    }

    // Додаємо пастки
    let trapsTotal = 3; // Наприклад, 3 пастки
    let trapsAdded = 0;
    while (trapsAdded < trapsTotal) {
        let randomX = Math.floor(Math.random() * gridSize);
        let randomY = Math.floor(Math.random() * gridSize);
        if (grid[randomY][randomX] === 0) {
            grid[randomY][randomX] = -1; // -1 означає пастка
            trapsAdded++;
        }
    }
}

// Малюємо поле
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
        }
    }
}

// Обробка кліків по клітинках
canvas.addEventListener('click', function (event) {
    const x = Math.floor(event.offsetX / cellSize);
    const y = Math.floor(event.offsetY / cellSize);

    checkCell(x, y);
});

// Перевірка клітинки
function checkCell(x, y) {
    if (grid[y][x] === 1) {
        // Гравець знайшов скарб
        treasuresFound++;
        grid[y][x] = 0; // Очищуємо клітинку
        document.getElementById('treasures-found').innerText = treasuresFound;
        document.getElementById('treasures-left').innerText = treasuresTotal - treasuresFound;

        // Малюємо скарб
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);

        if (treasuresFound === treasuresTotal) {
            setTimeout(() => alert("Ви знайшли всі скарби! Вітаємо!"), 100);
        }
    } else if (grid[y][x] === -1) {
        // Гравець потрапив на пастку
        ctx.fillStyle = 'red';
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);

        setTimeout(() => alert("Ви потрапили на пастку! Гра закінчена."), 100);
        resetGame();
    } else {
        // Порожня клітинка
        ctx.fillStyle = 'lightgray';
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);

        // Перевіряємо клітинки поруч
        checkNearbyTraps(x, y);
    }
}

// Перевірка на наявність пасток поруч
function checkNearbyTraps(x, y) {
    const nearbyCells = [
        { x: x, y: y - 1 }, // Вгору
        { x: x, y: y + 1 }, // Вниз
        { x: x - 1, y: y }, // Ліворуч
        { x: x + 1, y: y }  // Праворуч
    ];

    nearbyCells.forEach(cell => {
        if (cell.x >= 0 && cell.x < gridSize && cell.y >= 0 && cell.y < gridSize) {
            if (grid[cell.y][cell.x] === -1) {
                // Якщо поруч пастка, клітинка стає червоною
                ctx.fillStyle = 'red';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    });
}

// Скидання гри
function resetGame() {
    treasuresFound = 0;
    document.getElementById('treasures-found').innerText = treasuresFound;
    document.getElementById('treasures-left').innerText = treasuresTotal;

    createGrid();
    drawGrid();
}

// Початкова ініціалізація гри
createGrid();
drawGrid();
