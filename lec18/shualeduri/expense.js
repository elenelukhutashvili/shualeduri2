const { program } = require('commander');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const FILE_NAME = path.join(__dirname, 'expenses.json');
const readExpenses = () => {
    if (!fs.existsSync(FILE_NAME)) fs.writeFileSync(FILE_NAME, '[]');
    try {
        return JSON.parse(fs.readFileSync(FILE_NAME, 'utf-8'));
    } catch (e) {
        return [];
    }
};
const saveExpenses = (data) => {
    fs.writeFileSync(FILE_NAME, JSON.stringify(data, null, 2), 'utf-8');
};
program
    .name('expense-cli')
    .description('ხარჯების მართვის CLI ხელსაწყო (შუალედური გამოცდა)');
// 1
program
    .command('show')
    .description('ხარჯების ჩვენება ფილტრებით, სორტირებით და ფეჯინეიშენით')
    .option('--asc', 'სორტირება თარიღის ზრდადობით')
    .option('--desc', 'სორტირება თარიღის კლებადობით')
    .option('-c, --category <type>', 'ფილტრაცია კატეგორიის მიხედვით')
    .option('-p, --page <number>', 'გვერდის ნომერი', '1')
    .option('-t, --take <number>', 'ჩანაწერების რაოდენობა გვერდზე', '5')
    .action((options) => {
        let expenses = readExpenses();
        if (options.category) {
            expenses = expenses.filter(e => e.category.toLowerCase() === options.category.toLowerCase());
        }
         if (options.asc) {
            expenses.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else if (options.desc) {
            expenses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        const page = parseInt(options.page) || 1;
        let take = parseInt(options.take) || 5;
        
        const MAX_TAKE = 50; 
        if (take > MAX_TAKE) take = MAX_TAKE;
        const totalItems = expenses.length;
        const totalPages = Math.ceil(totalItems / take);   
        const startIndex = (page - 1) * take;
        expenses = expenses.slice(startIndex, startIndex + take);
        console.log(chalk.blue.bold(`\n ხარჯების სია (გვერდი ${page}/${totalPages || 1}, ნაჩვენებია: ${expenses.length}, სულ: ${totalItems}):`));
        console.log(expenses);
    });
// 2. 
program
    .command('add <category> <price>')
    .description('ახალი ხარჯის დამატება')
    .action((category, price) => {
       if (isNaN(parsedPrice)) {
            return console.log(chalk.red(' შეცდომა: ფასი უნდა იყოს ვალიდური რიცხვი!'));
        }
        if (parsedPrice < 10) {
            return console.log(chalk.red(' შეცდომა: ხარჯის თანხა არ უნდა იყოს 10-ზე ნაკლები!'));
        }
        const expenses = readExpenses();
        const newExpense = {
            id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1, 
            category: category.trim(),
            price: parsedPrice,
            createdAt: new Date().toISOString() 
        };

        expenses.push(newExpense);
        saveExpenses(expenses);

        console.log(chalk.green('ხარჯი წარმატებით დაემატა:'));
        console.log(newExpense);
    });
// 3. 
program
    .command('getById <id>')
    .description('ხარჯის ნახვა კონკრეტული ID-ით')
    .action((id) => {
        const expenses = readExpenses();
        const expense = expenses.find(e => e.id === parseInt(id));

        if (!expense) {
            return console.log(chalk.red(` ხარჯი ID-ით ${id} ვერ მოიძებნა.`));
        }
        console.log(chalk.cyan(` ნაპოვნია ხარჯი:`), expense);
    });
// 4.
program
    .command('update <id>')
    .description('ხარჯის განახლება ID-ის მიხედვით')
    .option('-c, --category <name>', 'ახალი კატეგორია')
    .option('-p, --price <number>', 'ახალი ფასი')
    .action((id, options) => {
        const expenses = readExpenses();
        const expense = expenses.find(e => e.id === parseInt(id));

        if (!expense) {
            return console.log(chalk.red(` ხარჯი ID-ით ${id} ვერ მოიძებნა.`));
        }

        if (options.category) expense.category = options.category.trim();
        if (options.price) {
            const parsedPrice = parseFloat(options.price);
            if (isNaN(parsedPrice) || parsedPrice < 10) {
                return console.log(chalk.red(' შეცდომა: ფასი უნდა იყოს რიცხვი და არანაკლებ 10-ისა!'));
            }
            expense.price = parsedPrice;
        }
        saveExpenses(expenses);
        console.log(chalk.yellow(' ხარჯი წარმატებით განახლდა:'));
        console.log(expense);
    });
// 5. 
program
    .command('delete <id>')
    .description('ხარჯის წაშლა ID-ის მიხედვით')
    .action((id) => {
        const expenses = readExpenses();
        const idNum = parseInt(id);
        const expenseToDelete = expenses.find(e => e.id === idNum);

        if (!expenseToDelete) {
            return console.log(chalk.red(` ხარჯი ID-ით ${id} ვერ მოიძებნა.`));
        }

        const filtered = expenses.filter(e => e.id !== idNum);
        saveExpenses(filtered);
        console.log(chalk.magenta(' ხარჯი წარმატებით წაიშალა:'));
        console.log(expenseToDelete);
    });
// 6.
program
    .command('search <date>')
    .description('ხარჯების ძებნა თარიღით (ფორმატი: YYYY-MM-DD)')
    .action((dateStr) => {
        const expenses = readExpenses();
       const results = expenses.filter(e => e.createdAt.startsWith(dateStr));
        if (results.length === 0) {
            return console.log(chalk.yellow(`ℹთარიღით "${dateStr}" ხარჯები ვერ მოიძებნა.`));
        }
        console.log(chalk.green.bold(`\n ნაპოვნი ხარჯები თარიღისთვის [${dateStr}]:`));
        console.log(results);
    })
program.parse(process.argv)