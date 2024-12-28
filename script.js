// DOM Elements
const todoInput = document.getElementById('todo-input');
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const charCounter = document.getElementById('char-counter'); // Het element voor de counter

// Functie om de karaktercounter bij te werken
function updateCharacterCounter() {
    const charCount = todoInput.value.length;
    charCounter.textContent = `${charCount}/30`;  // Bijwerken van de counter
}

// Event listener om de counter bij te werken wanneer de gebruiker typt
todoInput.addEventListener('input', updateCharacterCounter);

// Functie om taken uit localStorage te laden
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('todos')) || [];
    todoList.innerHTML = ''; // Clear huidige taken
    tasks.forEach((task, index) => {
        addTaskToDOM(task, index);
    });
}

// Functie om taken op te slaan in localStorage
function saveTask(tasks) {
    localStorage.setItem('todos', JSON.stringify(tasks));
}

// Functie om een taak uit localStorage te verwijderen
function removeTaskFromStorage(taskIndex) {
    const tasks = JSON.parse(localStorage.getItem('todos')) || [];
    tasks.splice(taskIndex, 1);  // Verwijder de taak uit de array
    saveTask(tasks);
}

// Functie om een taak te bewerken
function editTask(taskIndex) {
    const tasks = JSON.parse(localStorage.getItem('todos')) || [];
    const taskToEdit = tasks[taskIndex];
    
    // Zet de input waarde naar de taak die bewerkt moet worden
    todoInput.value = taskToEdit;
    
    // Verwijder de taak uit de lijst voordat je gaat bewerken
    removeTaskFromStorage(taskIndex);
}

// Functie om een taak toe te voegen aan de DOM
function addTaskToDOM(task, index) {
    const li = document.createElement('li');
    li.textContent = task;

    // Maak een container voor de iconen (edit en delete knoppen)
    const iconsContainer = document.createElement('div');
    iconsContainer.classList.add('icons-container');

    // Maak een edit afbeelding voor elke taak
    const editImg = document.createElement('img');
    editImg.src = 'edit.png';  // Geef de juiste pad naar je edit afbeelding
    editImg.alt = 'Edit';
    editImg.classList.add('task-icon');
    editImg.onclick = function() {
        editTask(index);  // Roep de bewerk functie aan
    };

    // Maak een delete afbeelding voor elke taak
    const deleteImg = document.createElement('img');
    deleteImg.src = 'check.png';  // Geef de juiste pad naar je delete afbeelding
    deleteImg.alt = 'Delete';
    deleteImg.classList.add('task-icon');
    deleteImg.onclick = function() {
        removeTaskFromStorage(index);
        loadTasks();  // Laad de taken opnieuw na verwijdering
    };

    // Voeg de bewerk en delete afbeeldingen toe aan de container
    iconsContainer.appendChild(editImg);
    iconsContainer.appendChild(deleteImg);

    // Voeg de iconen container toe aan de <li>
    li.appendChild(iconsContainer);
    
    // Voeg de taak toe aan de lijst
    todoList.appendChild(li);
}

// Event listener voor formulier indienen
todoForm.addEventListener('submit', function(event) {
    event.preventDefault();  // Voorkom dat het formulier op de gebruikelijke manier verzonden wordt
    const taskContent = todoInput.value.trim();

    // Controleer of de taak langer is dan 30 tekens
    if (taskContent.length > 30) {
        alert("Your task is too long! Please limit it to 30 characters.");
        return; // Stop de functie als de taak te lang is
    }

    if (taskContent) {
        const tasks = JSON.parse(localStorage.getItem('todos')) || [];
        tasks.push(taskContent);  // Voeg de nieuwe taak toe aan de lijst
        saveTask(tasks);  // Sla de bijgewerkte taken op in localStorage
        todoInput.value = '';  // Maak het invoerveld leeg
        loadTasks();  // Laad de taken opnieuw
        updateCharacterCounter(); // Reset de counter na het toevoegen van een taak
    }
});

// Initial loading van taken wanneer de pagina geladen wordt
loadTasks();

// Bijwerken van de character counter bij pagina-laad
updateCharacterCounter(); // Zorg ervoor dat de counter wordt bijgewerkt als de pagina wordt geladen
