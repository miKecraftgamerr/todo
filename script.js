// DOM Elements
const todoInput = document.getElementById('todo-input');
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('todos')) || [];
    todoList.innerHTML = ''; // Clear current tasks
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
}

// Function to save tasks to localStorage
function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('todos')) || [];
    tasks.push(task);
    localStorage.setItem('todos', JSON.stringify(tasks));
}

// Function to remove a task from localStorage
function removeTaskFromStorage(taskIndex) {
    const tasks = JSON.parse(localStorage.getItem('todos')) || [];
    tasks.splice(taskIndex, 1);  // Remove task from array
    localStorage.setItem('todos', JSON.stringify(tasks));
}

// Function to add task to the DOM
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.textContent = task;
    
    // Create a delete button for each task
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        const taskIndex = [...todoList.children].indexOf(li);
        removeTaskFromStorage(taskIndex);
        loadTasks();  // Reload tasks from localStorage after deletion
    };
    li.appendChild(deleteButton);
    
    // Append the task to the list
    todoList.appendChild(li);
}

// Event listener for form submission
todoForm.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting the traditional way
    const taskContent = todoInput.value.trim();
    if (taskContent) {
        addTaskToDOM(taskContent);  // Add task to DOM
        saveTask(taskContent);      // Save task to localStorage
        todoInput.value = '';       // Clear the input field
    }
});

// Initial loading of tasks when the page is loaded
loadTasks();
