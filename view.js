// Handles DOM manipulations and Element creation
export const View = {
    todoList: document.getElementById('todo-list'),
    todoInput: document.getElementById('todo-input'),
    emptyState: document.getElementById('empty-state'),
    dateDisplay: document.getElementById('date-display'),
    filterButtons: document.querySelectorAll('.filter-btn'),

    renderDate() {
        const options = { weekday: 'long', month: 'short', day: 'numeric' };
        this.dateDisplay.textContent = new Date().toLocaleDateString('en-US', options);
    },

    clearInput() {
        this.todoInput.value = '';
        this.todoInput.focus();
    },

    renderList(todos) {
        this.todoList.innerHTML = '';

        if (todos.length === 0) {
            this.emptyState.classList.remove('hidden');
            return;
        }
        
        this.emptyState.classList.add('hidden');

        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.dataset.id = todo.id;

            li.innerHTML = `
                <div class="custom-checkbox" data-action="toggle"></div>
                <span class="todo-text">${this.escapeHTML(todo.text)}</span>
                <button class="delete-btn" data-action="delete" aria-label="Delete task">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M1 13L13 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </button>
            `;
            this.todoList.appendChild(li);
        });
    },

    setActiveFilterButton(activeBtn) {
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    },

    // Security practice to prevent XSS vulnerability injections
    escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }
};