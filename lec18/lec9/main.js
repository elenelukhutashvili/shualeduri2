// 1.
class TodoList {
    constructor() {
        this.todos = []; 
    }
    addTodo(title) {
        const newTodo = {
            id: Date.now() + Math.random().toString(36).substr(2, 5),
            title: title,
            isDone: false,
            createdAt: new Date()
        };
        this.todos.push(newTodo);
        return newTodo;
    }
    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }
    checkActiveTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.isDone = !todo.isDone;
        }
    }
    getAllTodos(filterObj) {
        if (!filterObj) {
            return this.todos;
        }
        if (filterObj.active === true) {
            return this.todos.filter(todo => !todo.isDone);
        }
        if (filterObj.active === false) {
            return this.todos.filter(todo => todo.isDone);
        }
        if (filterObj === 'done') return this.todos.filter(todo => todo.isDone);
        if (filterObj === 'active') return this.todos.filter(todo => !todo.isDone);
        return this.todos;
    }
}

// 2
class ShoppingCart {
    constructor() {
        this.cart = []; 
    }
    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += product.quantity || 1;
        } else {
            this.cart.push({ ...product, quantity: product.quantity || 1 });
        }
    }
    removeFromCart(id) {
        this.cart = this.cart.filter(item => item.id !== id);
    }
    updateItem(id, newQuantity) {
        const item = this.cart.find(item => item.id === id);
        if (item && newQuantity > 0) {
            item.quantity = newQuantity;
        }
    }
    calculateTotalPrice() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
}

// 3
class Library {
    constructor() {
        this.books = []; 
    }
    addBook(book) {
        this.books.push(book);
    }
    removeBook(title) {
        this.books = this.books.filter(book => book.title !== title);
    }
    listBooks(sortBy = null) {
        let booksToShow = [...this.books];
        if (sortBy === 'year') {
            booksToShow.sort((a, b) => a.year - b.year); 
        }
        return booksToShow;
    }
}

// 4
class ContactManager {
    constructor() {
        this.contacts = []; 
    }
    addNewContact(name, phone, email) {
        const isEmailExists = this.contacts.some(c => c.email === email);
        if (isEmailExists) {
            console.log(`❌ შეცდომა: კონტაქტი იმეილით [${email}] უკვე არსებობს!`);
            return;
        }
        const isPhoneExists = this.contacts.some(c => c.phone === phone);
        if (isPhoneExists) {
            console.log(`❌ შეცდომა: კონტაქტი ნომრით [${phone}] უკვე არსებობს!`);
            return;
        }
        this.contacts.push({ name, phone, email });
        console.log(`წარმატებით დაემატა: ${name}`);
    }
    viewAllContacts() {
        return this.contacts;
    }
    updatePhone(email, newPhone) {
        const isPhoneTaken = this.contacts.some(c => c.phone === newPhone && c.email !== email);
        if (isPhoneTaken) {
            console.log(`შეცდომა:ნომერი [${newPhone}] უკვე დაკავებულია სხვა კონტაქტის მიერ!`);
            return;
        }
        const contact = this.contacts.find(c => c.email === email);
        if (contact) {
            contact.phone = newPhone;
            console.log(`ნომერი წარმატებით განახლდა ${email}-სთვის`);
        } else {
            console.log("კონტაქტი ამ იმეილით ვერ მოიძებნა.");
        }
    }
    deleteContact(email) {
        this.contacts = this.contacts.filter(c => c.email !== email);
        console.log(`🗑️ კონტაქტი იმეილით ${email} წაიშალა.`);
    }
}