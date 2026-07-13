#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const fs = require('fs');

const FILE_NAME = 'todos.json';

const readTodos = () => {
    if (!fs.existsSync(FILE_NAME)) fs.writeFileSync(FILE_NAME, '[]');
    return JSON.parse(fs.readFileSync(FILE_NAME, 'utf-8'));
};
const saveTodos = (data) => fs.writeFileSync(FILE_NAME, JSON.stringify(data, null, 2));

program.name('todo-cli').description('Todo CLI მენეჯერი');

program.command('show').description('ყველა თოდო').action(() => {
    console.log(chalk.blue.bold('\n--- ყველა თოდო ---'));
    console.log(readTodos());
});

program.command('add <todoName>').description('დამატება').action((todoName) => {
    const todos = readTodos();
    const newTodo = { id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1, title: todoName, isDone: false };
    todos.push(newTodo);
    saveTodos(todos);
    console.log(chalk.green('✅ შეიქმნა:'), newTodo);
});

program.command('delete <todoId>').description('წაშლა').action((todoId) => {
    const todos = readTodos();
    const idNum = parseInt(todoId);
    const todo = todos.find(t => t.id === idNum);
    if (!todo) return console.log(chalk.red('❌ ვერ მოიძებნა'));
    saveTodos(todos.filter(t => t.id !== idNum));
    console.log(chalk.yellow('🗑️ წაიშალა:'), todo);
});

program.command('update <todoId>').description('განახლება').option('-n, --name <todoName>', 'ახალი სახელი').action((todoId, options) => {
    const todos = readTodos();
    const todo = todos.find(t => t.id === parseInt(todoId));
    if (!todo) return console.log(chalk.red('❌ ვერ მოიძებნა'));
    if (options.name) {
        todo.title = options.name;
        saveTodos(todos);
        console.log(chalk.cyan('🔄 განახლდა:'), todo);
    }
});

program.parse(process.argv);