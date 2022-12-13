const { timeEnd } = require('console');
const EventEmitter = require('events')

const [hour, day, month, year] = process.argv[2].split('-')
const dateInFuture = new Date(Date.UTC(year, month - 1, day, hour));
const emitter = new EventEmitter();

const getPrettyTime = (seconds) => {
    const dateType = [
        Math.floor((seconds) % 60),
        Math.floor((seconds / 60) % 60),
        Math.floor((seconds / (60 * 60)) % 24),
        Math.floor(seconds / (60 * 60 * 24)),
    ]
    return `${dateType.pop()} дней ${dateType.pop()} часов ${dateType.pop()} минут ${dateType.pop()} секунд`
}

const showRemTime = (dateInFuture) => {
    const dateNow = new Date();
    if (dateNow >= dateInFuture) {
        emitter.emit('timeEnd');
    } else {
        console.clear()
        console.log("Осталось: " + getPrettyTime((dateInFuture - dateNow) / 1000))
    }
}

const showTimeDone = (timerId) => {
    clearInterval(timerId);
    console.log('Время вышло!')
}

const timerId = setInterval(() => {
    emitter.emit('timeTick', dateInFuture)
}, 1000);

emitter.on('timeTick', showRemTime);
emitter.on('timeEnd' , () => {
    showTimeDone(timerId);
});