// App Initialization and Event Delegation Controller
import { Store } from './store.js';
import { View } from './view.js';

let currentFilter = 'all';

function updateUI() {
    const todos = Store.getFilteredTodos(currentFilter);
    View.renderList(todos);
}

// 1. Submit form handling
document.getElementById('todo-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = View.todoInput.value;
    if (!taskText.trim()) return;

    Store.addTodo(taskText);
    View.clearInput();
    updateUI();
});

// 2. Global List Event Delegation (Efficiently handles toggle and delete clicks)
View.todoList.addEventListener('click', (e) => {
    const target = e.target;
    const itemEl = target.closest('.todo-item');
    if (!itemEl) return;
    
    const id = itemEl.dataset.id;
    const action = target.closest('[data-action]')?.dataset.action;

    if (action === 'toggle') {
        Store.toggleTodo(id);
        updateUI();
    } else if (action === 'delete') {
        Store.deleteTodo(id);
        updateUI();
    }
});

// 3. Filter changes
document.querySelector('.filter-container').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    currentFilter = btn.dataset.filter;
    View.setActiveFilterButton(btn);
    updateUI();
});

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    View.renderDate();
    updateUI();
});