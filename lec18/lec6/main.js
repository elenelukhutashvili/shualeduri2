//1. 1 5 4 3 2
//2. 1 5 3 2 4 
// 3. 
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function testSleep() {
    console.log("დავალება 3 დაიწყო")
    console.log("ველოდებით 1 წამს")
    await sleep(1000)
    console.log("გავიდა 1 წამი! sleep ფუნქცია მუშაობს.")
    console.log("-----\n")
    runOtherTasks()
}
//4.
function guessMyNumber(targetNumber) {
    console.log(`--დავალება 4: ვეძებთ რიცხვს: ${targetNumber} ---`)
    let intervalId = setInterval(() => {
        let randomNumber = Math.floor(Math.random() * 20) + 1
        console.log(`დაგენერირდა: ${randomNumber}`)
        if (randomNumber === targetNumber) {
            console.log("გილოცავთ! რიცხვები დაემთხვა. პროცესი გაჩერდა.")
            console.log("--------\n")
            clearInterval(intervalId)
        }
    }, 1000)
}
//6.
function countdown(startNumber, intervalTime) {
    console.log(`--- დავალება 5: უკუთვლა იწყება ${startNumber}-დან ---`);
    let current = startNumber;
    let intervalId = setInterval(() => {
        console.log(current);
        if (current === 0) {
            console.log("უკუთვლა დასრულდა!");
            console.log("-----------");
            clearInterval(intervalId);
        } else {
            current--
        }
    }, intervalTime)
}
function runOtherTasks() {
    guessMyNumber(7);
    setTimeout(() => {
        countdown(5, 500)
    }, 5000)
}
testSleep()