//1)
function avarage(arr) {
    let sum=0
    for (let i=0; i<arr.length; i++) {
        sum+=arr[i]
    }
    let av=sum/arr.length
    return av
}

//2)
function reverse(number) {
    let str=number.toString()
    let result=[]

    for (let i=str.length-1; i>=0; i--){
        result.push(Number(str[i]))
    }
    return result
}

//3)
function diff(arr1, arr2) {
    let result=[]
    for (let i=0; i<arr1.length; i++) {
        if (arr2.includes(arr1[i])===false) {
            result.push(arr1[i])
        }
    }
    return result
}

//4)
function seclargest(arr) {
    let largest=-Infinity
    let secondLargest=-Infinity
    for (let i=0; i<arr.length; i++) {
        if (arr[i]>largest){
            secondLargest=largest
            largest = arr[i]
        } 
        else if(arr[i]>secondLargest && arr[i]!==largest) {
            secondLargest=arr[i]
        }
    }
    return seclargest
}

//5)
function getPalindromes(arr) {
    let result = []
    for (let i=0; i<arr.length; i++) {
        let word=arr[i]
        let reversedWord = ""
        for (let j=word.length-1; j>=0; j--) {
            reversedWord+=word[j];
        }
        if (word===reversedWord) {
            result.push(word);
        }
    }
    return result
}

//6)
function palindromes(arr) {
    let result = []
    for (let i=0; i<arr.length; i++) {
        let word=arr[i]
        let reversedWord=""
        for (let j=word.length-1; j>=0; j--) {
            reversedWord+=word[j]
        }
        if (word===reversedWord) {
            result.push(word)
        }
    }
    return result
}