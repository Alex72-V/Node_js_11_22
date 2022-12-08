import Colors from "colors";

const colors = { GREEN: 0, YELLOW: 1, RED: 2}
let currentColor = colors.GREEN;
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
        if (currentColor > colors.RED)
            currentColor = colors.GREEN;
    }
    
    const colorPrint = (num) => {
        if(noPrime) noPrime = false;
        switch (currentColor){
            case colors.RED:
                console.log(`${num}`.red);
                break;
            case colors.GREEN:
                console.log(`${num}`.green);
                break;
            case colors.YELLOW:
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


