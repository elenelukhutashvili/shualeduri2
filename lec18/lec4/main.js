//1)
function removeLastChar(arr) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        let shortWord = arr[i].slice(0, -1)
        result.push(shortWord)
    }
    return result
}

//2)
function sumOfTwoSmallest(arr) {
    let sortedArr = arr.sort((a, b) => a - b)
    return sortedArr[0] + sortedArr[1]
}

//3)
function getSumWithForEach(arr) {
    let sum = 0
    arr.forEach(function(num) {
        sum += num
    })
    return sum
}

//4)
function processWords(arr) {
    let filteredWords = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length > 5) {
            filteredWords.push(arr[i].toUpperCase())
        }
    }
    return filteredWords.join("#")
}

//5)
function getClassAverages(students) {
    for (let i = 0; i < students.length; i++) {
        let student = students[i]
        let cls = student.cls
        if (!classData[cls]) {
            classData[cls] = { totalGrade: 0, count: 0 }
        }
        classData[cls].totalGrade += student.grade
        classData[cls].count++
    }
    let finalAverages = {}
    for (let cls in classData) {
        let total = classData[cls].totalGrade
        let count = classData[cls].count
        finalAverages[cls] = total / count
    }
    return finalAverages
}
let studentsList = [
    { name: "Ann",  cls: "A", grade: 90 },
    { name: "Ben",  cls: "B", grade: 75 },
    { name: "Cara", cls: "A", grade: 80 }    ]