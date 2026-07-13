"use strict";
// ============================
// Shapes
// ============================
class Rectangle {
    width;
    height;
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    calculateArea() {
        return this.width * this.height;
    }
    calculatePerimeter() {
        return 2 * (this.width + this.height);
    }
}
class Circle {
    radius;
    constructor(radius) {
        this.radius = radius;
    }
    calculateArea() {
        return Math.PI * this.radius ** 2;
    }
    calculatePerimeter() {
        return 2 * Math.PI * this.radius;
    }
}
// ============================
// Independent Functions
// ============================
function addNumbers(a, b) {
    return a + b;
}
function multiplyNumbers(a, b) {
    return a * b;
}
function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function filterEvenNumbers(numbers) {
    return numbers.filter((num) => num % 2 === 0);
}
function findMax(numbers) {
    return Math.max(...numbers);
}
function isPalindrome(str) {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/gi, "");
    const reversedStr = cleanStr.split("").reverse().join("");
    return cleanStr === reversedStr;
}
function calculateFactorial(n) {
    if (n < 0) {
        throw new Error("Factorial cannot be calculated for negative numbers.");
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * calculateFactorial(n - 1);
}
// ============================
// Test Cases
// ============================
const rectangle = new Rectangle(5, 8);
const circle = new Circle(3);
console.log(`Rectangle Area: ${rectangle.calculateArea()}, Perimeter: ${rectangle.calculatePerimeter()}`);
console.log(`Circle Area: ${circle.calculateArea()}, Perimeter: ${circle.calculatePerimeter()}`);
console.log(`Sum: ${addNumbers(5, 3)}`);
console.log(`Multiplication: ${multiplyNumbers(4, 7)}`);
console.log(`Capitalized String: ${capitalizeString("javascript is fun")}`);
console.log(`Even Numbers: ${filterEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8])}`);
console.log(`Max Number: ${findMax([23, 56, 12, 89, 43])}`);
console.log(`Is Palindrome: ${isPalindrome("A man, a plan, a canal, Panama")}`);
console.log(`Factorial: ${calculateFactorial(5)}`);
// ============================
// BankAccount
// ============================
class BankAccount {
    accountNumber;
    balance;
    transactionHistory;
    constructor(accountNumber, initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
        this.transactionHistory = [];
        this.recordTransaction(`Account created with initial balance: ${initialBalance}`);
    }
    getAccountInfo() {
        return {
            accountNumber: this.accountNumber,
            balance: this.balance,
        };
    }
    deposit(amount) {
        if (amount <= 0) {
            throw new Error("Deposit amount must be greater than 0.");
        }
        this.balance += amount;
        this.recordTransaction(`Deposited: +${amount}`);
    }
    withdraw(amount) {
        if (amount <= 0) {
            throw new Error("Withdraw amount must be greater than 0.");
        }
        if (amount > this.balance) {
            throw new Error("Insufficient balance.");
        }
        this.balance -= amount;
        this.recordTransaction(`Withdrawn: -${amount}`);
    }
    transferFunds(targetAccount, amount) {
        if (amount <= 0) {
            throw new Error("Transfer amount must be greater than 0.");
        }
        if (amount > this.balance) {
            throw new Error("Insufficient balance.");
        }
        this.balance -= amount;
        targetAccount.balance += amount;
        this.recordTransaction(`Transferred ${amount} to account ${targetAccount.accountNumber}`);
        targetAccount.recordTransaction(`Received ${amount} from account ${this.accountNumber}`);
    }
    getTransactionHistory() {
        return [...this.transactionHistory];
    }
    recordTransaction(transaction) {
        this.transactionHistory.push(transaction);
    }
}
// ============================
// BankAccount Test
// ============================
const account1 = new BankAccount("ACC-1001", 1000);
const account2 = new BankAccount("ACC-1002", 500);
account1.deposit(300);
account1.withdraw(150);
account1.transferFunds(account2, 400);
account2.deposit(200);
account2.withdraw(100);
console.log("\nAccount 1 Info:");
console.log(account1.getAccountInfo());
console.log("\nAccount 2 Info:");
console.log(account2.getAccountInfo());
console.log("\nAccount 1 Transaction History:");
console.log(account1.getTransactionHistory());
console.log("\nAccount 2 Transaction History:");
console.log(account2.getTransactionHistory());
