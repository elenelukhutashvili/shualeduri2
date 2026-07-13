//1. 1 5 4 3 2
//2. 1 5 3 2 4
// 3.
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 4.
function guessMyNumber(targetNumber) {
    console.log(`--- 4: ${targetNumber} ---`);
    let intervalId = setInterval(() => {
        let randomNumber = Math.floor(Math.random() * 20) + 1;
        console.log(` ${randomNumber}`);
        if (randomNumber === targetNumber) {
            console.log("stop");
            console.log("-------------------------\n");
            clearInterval(intervalId);
            runTask5();
        }
    }, 1000);
}

// 5.
function countdown(startNumber, intervalTime) {
    console.log(`---5: start from ${startNumber} ---`);
    let current = startNumber;
    let intervalId = setInterval(() => {
        console.log(current);
        if (current === 0) {
            console.log("stop!");
            console.log("-------------------------");
            clearInterval(intervalId);
        } else {
            current--;
        }
    }, intervalTime);
}