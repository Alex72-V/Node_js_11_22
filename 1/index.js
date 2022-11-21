import colors from "colors";

const Colors = { GREEN: 0, YELLOW: 1, RED: 2}
let currentColor = Colors.GREEN;
const from = parseInt(process.argv[2]);
const to = parseInt(process.argv[3]);
let noPrime = true;

if (isNaN(from) || isNaN(to)) {
    console.log('Некорректный ввод. Введите целые числа!'.red);
}
const isPrime = (num) => {
    if (num <=1)
    return false;
    for (let i = 2; i < num; i++)
    if (num % i === 0) return false;
    return true;
}

const changeColor = () => {
        currentColor++;
        if (currentColor > Colors.RED)
            currentColor = Colors.GREEN;
    }
    
    const colorPrint = (num) => {
        if(noPrime) noPrime = false;
        switch (currentColor){
            case Colors.RED:
                console.log(`${num}`.red);
                break;
            case Colors.GREEN:
                console.log(`${num}`.green);
                break;
            case Colors.YELLOW:
                console.log(`${num}`.yellow);
                break;
        }
        changeColor();
    }

for (let i = from; i <= to; i++){
    if (isPrime(i)) colorPrint(i);
    }
    if(noPrime)
    console.log(`Некорректный ввод. Введите целые числа![${from},${to}]`.red);


