//1)
function celtofahr(celsius) {
    let fahr=(celsius * 9 / 5) + 32;
    return fahr;
}

//2)
function reverse(str) {
    return str.split('').reverse().join('');
}

//3)
function count(sentence){
    return sentence.split(" ").length
}

//4)
function count(word){
    let cnt=0
    let vowels = "aeiouAEIOU"
    for(let i = 0; i<=word.length; i++){
        if(vowels.includes(word[i])){
            cnt++
        }
    }
    return cnt
}

//5)
function factorial(n) {
    let f = 1;
    for (let i =1; i<=n; i++) {
        f *= i
    }
    return f
}

//6)
function number(n) {
    let sum = 0;
    for (let i = 0; i<=n; i++) {
        if (i % 2 === 0) {
            sum+= i
        }
    }
    return sum;
}

//7)
function grade(score) {
    if (score >= 90 && score <= 100) {
        return "A"
    }
    else 
        if (score >= 80) {
            return "B"
        }
    else 
        if (score >= 70) {
            return "C"
        } 
    else 
        if (score >= 60) {
            return "E"
    } 
    else
         if (score >= 0 && score < 60) {
            return "F"
    } 
    else {
        return "wrong" 
    }
}

//8)
function check(password) {
    if (password.length <= 8) {
        return "too short";
    }
    let number = false;
    let capital = false;
    for (let i = 0; i < password.length; i++) {
        let char = password[i]
        if (char >= "0" && char <= "9") {
            number = true
        }
        if (char !== char.toLowerCase()) {
            capital = true
        }
    }
    if (number && capital) {
        return "strong";
    } 
    else {
        return "weak";
    }
}