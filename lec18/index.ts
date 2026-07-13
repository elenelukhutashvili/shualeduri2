// ============================
// Shapes
// ============================

class Rectangle {
  constructor(
    public width: number,
    public height: number
  ) {}

  calculateArea(): number {
    return this.width * this.height;
  }

  calculatePerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

class Circle {
  constructor(public radius: number) {}

  calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }

  calculatePerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

// ============================
// Independent Functions
// ============================

function addNumbers(a: number, b: number): number {
  return a + b;
}

function multiplyNumbers(a: number, b: number): number {
  return a * b;
}

function capitalizeString(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function filterEvenNumbers(numbers: number[]): number[] {
  return numbers.filter((num) => num % 2 === 0);
}

function findMax(numbers: number[]): number {
  return Math.max(...numbers);
}

function isPalindrome(str: string): boolean {
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/gi, "");
  const reversedStr = cleanStr.split("").reverse().join("");

  return cleanStr === reversedStr;
}

function calculateFactorial(n: number): number {
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

console.log(
  `Rectangle Area: ${rectangle.calculateArea()}, Perimeter: ${rectangle.calculatePerimeter()}`
);

console.log(
  `Circle Area: ${circle.calculateArea()}, Perimeter: ${circle.calculatePerimeter()}`
);

console.log(`Sum: ${addNumbers(5, 3)}`);
console.log(`Multiplication: ${multiplyNumbers(4, 7)}`);
console.log(
  `Capitalized String: ${capitalizeString("javascript is fun")}`
);
console.log(
  `Even Numbers: ${filterEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8])}`
);

console.log(`Max Number: ${findMax([23, 56, 12, 89, 43])}`);
console.log(
  `Is Palindrome: ${isPalindrome("A man, a plan, a canal, Panama")}`
);
console.log(`Factorial: ${calculateFactorial(5)}`);

// ============================
// BankAccount
// ============================

class BankAccount {
  private accountNumber: string;
  private balance: number;
  private transactionHistory: string[];

  constructor(accountNumber: string, initialBalance: number) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
    this.transactionHistory = [];

    this.recordTransaction(
      `Account created with initial balance: ${initialBalance}`
    );
  }

  public getAccountInfo(): { accountNumber: string; balance: number } {
    return {
      accountNumber: this.accountNumber,
      balance: this.balance,
    };
  }

  public deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("Deposit amount must be greater than 0.");
    }

    this.balance += amount;
    this.recordTransaction(`Deposited: +${amount}`);
  }

  public withdraw(amount: number): void {
    if (amount <= 0) {
      throw new Error("Withdraw amount must be greater than 0.");
    }

    if (amount > this.balance) {
      throw new Error("Insufficient balance.");
    }

    this.balance -= amount;
    this.recordTransaction(`Withdrawn: -${amount}`);
  }

  public transferFunds(
    targetAccount: BankAccount,
    amount: number
  ): void {
    if (amount <= 0) {
      throw new Error("Transfer amount must be greater than 0.");
    }

    if (amount > this.balance) {
      throw new Error("Insufficient balance.");
    }

    this.balance -= amount;
    targetAccount.balance += amount;

    this.recordTransaction(
      `Transferred ${amount} to account ${targetAccount.accountNumber}`
    );

    targetAccount.recordTransaction(
      `Received ${amount} from account ${this.accountNumber}`
    );
  }

  public getTransactionHistory(): string[] {
    return [...this.transactionHistory];
  }

  private recordTransaction(transaction: string): void {
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