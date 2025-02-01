// Store todos in an array
let todos = [];

// Backend API Base URL
const BASE_URL = "http://localhost:8080/todos"; 

// Get DOM elements
const todoInput = document.getElementById('todoInput');
const todoListElement = document.getElementById('todoList');
const taskCount = document.getElementById('taskCount');
const completedCount = document.getElementById('completedCount');

// Function to fetch and display all todos
async function getAllTodos() {
    try {
        const response = await fetch(BASE_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
        if (!response.ok) throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        todos = await response.json();
        renderTodos(todos);
        updateTaskCounts();
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

// Function to update task counts
function updateTaskCounts() {
    taskCount.textContent = todos.length;
    completedCount.textContent = todos.filter(todo => todo.completed).length;
}

// Function to add a new todo
async function addTodo() {
    const todoText = todoInput.value.trim();
    if (!todoText) return;

    const newTodo = { title: todoText, completed: false };
    try {
        const response = await fetch(`${BASE_URL}/add`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(newTodo)
        });
        if (!response.ok) throw new Error("Failed to add todo");
        todoInput.value = "";
        getAllTodos();
    } catch (error) {
        console.error("Error adding todo:", error);
    }
}

// Function to mark a todo as done
async function markAsDone(title) {
    try {
        const response = await fetch(`${BASE_URL}/done/${encodeURIComponent(title)}`, {
            method: "PUT",
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        if (!response.ok) throw new Error("Failed to mark as done");
        getAllTodos();
    } catch (error) {
        console.error("Error marking as done:", error);
    }
}

// Function to delete a todo by title
async function deleteTodoByTitle(title) {
    try {
        const response = await fetch(`${BASE_URL}/delete/title/${encodeURIComponent(title)}`, {
            method: "DELETE",
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        if (!response.ok) throw new Error("Failed to delete todo");
        getAllTodos();
    } catch (error) {
        console.error("Error deleting todo:", error);
    }
}

// Function to render todos in the DOM
function renderTodos(todoListData) {
    todoListElement.innerHTML = "";
    todoListData.forEach(todo => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${todo.completed ? "completed" : ""}">${todo.title}</span>
            <button onclick="markAsDone('${todo.title}')">Done</button>
            <button onclick="deleteTodoByTitle('${todo.title}')">Delete</button>
        `;
        todoListElement.appendChild(li);
    });
}

// Event listener for "Enter" key to add a new todo
todoInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") addTodo();
});

// View filters
function viewAll() { renderTodos(todos); }
function viewActive() { renderTodos(todos.filter(todo => !todo.completed)); }
function viewCompleted() { renderTodos(todos.filter(todo => todo.completed)); }

// Initial fetch of todos
getAllTodos();
