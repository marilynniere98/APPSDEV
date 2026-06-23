// Handles LocalStorage and Array Mutation State Logic
export const Store = {
    state: {
        todos: JSON.parse(localStorage.getItem('minimal-todos')) || []
    },

    save() {
        localStorage.setItem('minimal-todos', JSON.stringify(this.state.todos));
    },

    addTodo(text) {
        const todo = {
            id: Date.now().toString(),
            text: text.trim(),
            completed: false
        };
        this.state.todos.unshift(todo); // New items on top
        this.save();
        return todo;
    },

    toggleTodo(id) {
        this.state.todos = this.state.todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        this.save();
    },

    deleteTodo(id) {
        this.state.todos = this.state.todos.filter(todo => todo.id !== id);
        this.save();
    },

    getFilteredTodos(filter) {
        if (filter === 'active') return this.state.todos.filter(t => !t.completed);
        if (filter === 'completed') return this.state.todos.filter(t => t.completed);
        return this.state.todos;
    }
};