// ввод пользователем в консоль уровень сложности - количество цифр в загаданном числе
const readlineSync = require('readline-sync');
let level;
console.log('Добро пожаловать в игру "Быки и Коровы"!');
welcome();

function welcome() { 
    console.log('Введите желаемый уровень сложности игры от 3 до 6:');
    level = readlineSync.question('');
}

while (!((level >= 3) && (level <= 6))) {
    console.log('Указанная сложность не доступна.');
    welcome();
}

console.log(`Выбранный уровень сложности: ${level}. 
Ваша задача: отгадать число загаданное компьютером. 
Цифры в нем не повторяются.
У вас 20 попыток.`);

// создание рандомного загаданного числа от 3 до 6 цифр
let arrNum = [];

for (let i = 0; i <= 9; ++i) { 
    arrNum.push(i); 
} 

arrNum.sort(function () {
    return Math.random() - 0.5;
});

if (arrNum[0] == 0) {
    arrNum.reverse();
} 

arrNum.length = level;

// ввод варианта числа пользователя
let varUser;

function inputNum() {
    console.log('Введите Ваш вариант числа:');
    varUser = readlineSync.question('');
    varUser = varUser.toString().split("");    
}

// обработка варианта числа пользователя
chekImnutNum();

function chekImnutNum() {
    inputNum();
    // проверка неверной длины введенного числа
    while (varUser.length != level) {
        if (varUser.length < level) { 
            console.log('Вы указали недостаточное количество символов! Длина числа должна быть:', level);
        } else {
            console.log('Вы указали длину числа больше, чем заявлено в сложноти! Длина числа должна быть:', level);
        }
        chekImnutNum();
    }
    // проверка повторения цифр в числе
    for (let i = 0; i < varUser.length; i++) {
        for (let j = 1; j < varUser.length; j++) {
            if ((varUser[i] == varUser[j]) && (i != j)) {
                console.log('Правила игры "Быки и Коровы" не разрешают повторения цифр в числе!');
                chekImnutNum();
            }
        }
    }
    // проверка первого значения
    if (varUser[0] == 0) {
        console.log('Правила игры "Быки и Коровы" не разрешают начинать число с "нуля"!');
        chekImnutNum();
    }
}

// подсчет значений быков и коров
let bull = 0;
let cow = 0;
let count = 0;

while (count < 20) {
    bull = 0;
    cow = 0;

    for (let i = 0; i < arrNum.length; i++) {
        for (let j = 0; j < varUser.length; j++) {
            if (arrNum[i] == varUser[j]) {
                if (i == j) {
                    bull += 1;
                } else {
                    cow += 1;
                }
            }
        }
    }
    console.log('Cовпавших цифр не на своих местах', cow, 'Цифр на своих местах:', bull);

    if (bull != level) {
        chekImnutNum();
    } else {
        break;
    }

    count++;
}

console.log(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!Число совпало! Вы выиграли!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);
