//1)
function getabbr(fullName) {
// 1. ვყოფთ სტრინგს სიტყვებად სფეისის მიხედვით
    let words = fullName.split(" ");
    let n = "";

    for (let i = 0; i < words.length; i++) {
        n += words[i][0].toUpperCase() + "."
    }
    if (n.endsWith(".")) {
        n = n.slice(0, -1)
    }
    return n
}

//2)
function summ(number) {
    let str = number.toString()
    let sum = 0
    for (let i=0; i <str.length; i++) {
        sum += Number(str[i])
    }
    return sum
}

//3)
function remove(word) {
    let result = ""
    for (let i = 0; i < word.length; i++) {
        let char = word[i]
        if (result.includes(char) === false) {
            result += char
        }
    }
    return result
}

//4)
function remove(str) {
    let result = ""
    for (let i = 0; i < str.length; i++) {
        if (str[i] !== " ") {
            result += str[i]
        }
    }
    return result
}

//5)
function reverse(sentence) {
    let words = sentence.split(" ")
    let r = []

    for (let i = 0; i < words.length; i++) {
        let current = words[i]
        let reversed = ""
        for (let j = current.length - 1; j >= 0; j--) {
            reversed += current[j];
        }
        r.push(reversed)
    }
    return r.join(" ")
}