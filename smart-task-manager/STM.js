const taskInput = document.getElementById('taskInput');
const priorityInput = document.getElementById('priorityInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Null check: defaults to [] if LocalStorage is empty
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];


renderTasks();

addBtn.addEventListener('click', () => {
    const taskText = taskInput.value;
    const priority = priorityInput.value;

    if (taskText === "") return;

    const newTask = {
        id: Date.now(), // Unique ID 
        text: taskText,
        priority: priority
    };

    tasks.push(newTask); 
    saveAndRender();     
    taskInput.value = "";
});

function saveAndRender() {
    // Serialization: LocalStorage only accepts strings, not arrays
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = ""; // DOM Reset: prevents appending duplicates to old list

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add(task.priority);
        
        li.innerHTML = `
            <span>${task.text}</span>
            <button onclick="deleteTask(${task.id})" class="delete-btn">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id); 
    saveAndRender();
}

taskInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addBtn.click(); });