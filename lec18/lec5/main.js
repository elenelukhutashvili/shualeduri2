//1
function property(obj, prop) {
    delete obj[prop]
    return obj
}

//2
function leaderboard(users) {
    let sortedUsers = users.sort((a, b) => b.score - a.score)
    for (let i = 0; i < sortedUsers.length; i++) {
        sortedUsers[i].rank = i + 1
    }
    return sortedUsers
}
const initialUsers = [
    { name: "Ana", score: 50 },
    { name: "Nika", score: 80 },
    { name: "Luka", score: 70 }
]

//3
function longest(movies) {
    if (movies.length === 0) return null
    let longestMovie = movies[0]
    for (let i = 1; i < movies.length; i++) {
        if (movies[i].title.length > longestMovie.title.length) {
            longestMovie = movies[i]
        }
    }
    return longestMovie
}
const moviesList = [
    { title: "Up", year: 2009 }, 
    { title: "The Lord of the Rings", year: 2001 }
]

//4
function averageage(users) {
    let deptData = {}
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        let dept = user.dept;6    
        if (!deptData[dept]) {
            deptData[dept] = { totalAge: 0, count: 0 };
        }
        deptData[dept].totalAge += user.age
        deptData[dept].count++
    }
    let averages = {}
    for (let dept in deptData) {
        averages[dept] = deptData[dept].totalAge / deptData[dept].count
    }
    return averages
}
const employees = [
    { name: "Ana", dept: "HR", age: 25 },
    { name: "Nika", dept: "IT", age: 30 },
    { name: "Luka", dept: "IT", age: 22 }
]

//5
function countTotalWords(comments) {
    let totalWords = 0
    for (let i = 0; i < comments.length; i++) {
        let text = comments[i].comment.trim()
        if (text !== "") {
            let wordsCount = text.split(/\s+/).length
            totalWords += wordsCount
        }
    }
    return totalWords
}
const commentsList = [
    { id: 1, comment: "Hello world" }, 
    { id: 2, comment: "This is great!" },
    { id: 3, comment: "" }
]

//6
function group(users) {
    let grouped = {}
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        let dept = user.department;
        
        if (!grouped[dept]) {
            grouped[dept] = []
        }
        grouped[dept].push(user)
    }
    for (let dept in grouped) {
        grouped[dept].sort((a, b) => b.salary - a.salary)
    }
    return grouped
}
const staff = [
    { name: "Ana", department: "HR", salary: 2000 },
    { name: "Nika", department: "IT", salary: 5000 },
    { name: "Luka", department: "IT", salary: 3500 },
    { name: "Mariam", department: "HR", salary: 3000 }
]

//7
function Total(cart) {
    let total = 0
    for (let i = 0; i < cart.length; i++) {
        let item = cart[i]
        let discountedPrice = item.price * (1 - item.discountPercent / 100)
        total += discountedPrice * item.quantity
    }
    return total
}
const myCart = [
    { title: "Laptop", price: 2000, quantity: 1, discountPercent: 10 },
    { title: "Mouse", price: 50, quantity: 2, discountPercent: 0 },
    { title: "Keyboard", price: 100, quantity: 1, discountPercent: 20 }
]

//8
function arraytoobject(users) {
    let obj = {}
    for (let i = 0; i < users.length; i++) {
        let user = users[i]
        obj[user.id] = user
    }
    return userObj
}
const usersArr = [
    { id: 1, name: "Ana", age: 25 },
    { id: 2, name: "Nika", age: 30 },
    { id: 3, name: "Luka", age: 22 }
]