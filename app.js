// app.js
// JavaScript To-Do List App
// Demonstrates: DOM output, ES6 array methods, recursion, external library (dayjs),
// and throwing/handling exceptions.

// ----- Data model -----
// Each task will look like: { id, text, completed, createdAt }

let tasks = [];
let nextId = 1;

// ----- DOM references -----
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const totalTasksSpan = document.getElementById("total-tasks");
const completedTasksSpan = document.getElementById("completed-tasks");
const errorMessage = document.getElementById("error-message");
const recursionOutput = document.getElementById("recursion-output");

// ----- Utility functions -----

/**
 * Creates a new task object from the given text.
 * Throws an Error if the text is empty.
 * @param {string} text
 * @returns {{id: number, text: string, completed: boolean, createdAt: string}}
 */
function createTask(text) {
  const trimmed = text.trim();

  // This demonstrates throwing an exception
  if (!trimmed) {
    throw new Error("Task description cannot be empty.");
  }

  return {
    id: nextId++,
    text: trimmed,
    completed: false,
    // Using external library: dayjs to format the current date/time
    createdAt: dayjs().format("YYYY-MM-DD HH:mm"),
  };
}

/**
 * Adds a new task to the tasks array and re-renders the list.
 */
function handleAddTask() {
  clearError();
  try {
    const newTask = createTask(taskInput.value);
    tasks.push(newTask);
    taskInput.value = "";
    renderTasks();
  } catch (error) {
    // This demonstrates catching and handling the exception
    showError(error.message);
  }
}

/**
 * Toggles the completed state of a task by id.
 * Uses Array.prototype.map to create a new array of tasks.
 * @param {number} id
 */
function toggleTaskCompleted(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

/**
 * Removes a task from the list by id.
 * Uses Array.prototype.filter.
 * @param {number} id
 */
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

/**
 * Clears any error message from the screen.
 */
function clearError() {
  errorMessage.textContent = "";
}

/**
 * Displays an error message on the screen.
 * @param {string} message
 */
function showError(message) {
  errorMessage.textContent = message;
}

/**
 * Renders all tasks to the DOM.
 * Uses forEach (ES6) to iterate.
 */
function renderTasks() {
  // Clear the current list
  taskList.innerHTML = "";

  // ForEach to display each task
  tasks.forEach((task) => {
    const li = document.createElement("li");

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("task-info");

    const textSpan = document.createElement("span");
    textSpan.textContent = task.text;
    if (task.completed) {
      textSpan.classList.add("completed");
    }

    const metaSpan = document.createElement("span");
    metaSpan.classList.add("task-meta");
    metaSpan.textContent = `Created at: ${task.createdAt}`;

    infoDiv.appendChild(textSpan);
    infoDiv.appendChild(metaSpan);

    const actionsDiv = document.createElement("div");

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = task.completed ? "Uncomplete" : "Complete";
    toggleBtn.addEventListener("click", () => toggleTaskCompleted(task.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    actionsDiv.appendChild(toggleBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(infoDiv);
    li.appendChild(actionsDiv);

    taskList.appendChild(li);
  });

  updateStats();
}

/**
 * Updates the total and completed task counts on the screen.
 * Uses filter to find completed tasks.
 */
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;

  totalTasksSpan.textContent = total;
  completedTasksSpan.textContent = completed;
}

// ----- Recursion demo -----

/**
 * Recursively calculates the sum of numbers from 1 to n.
 * @param {number} n
 * @returns {number}
 */
function recursiveSum(n) {
  if (n <= 0) return 0;
  return n + recursiveSum(n - 1);
}

/**
 * Displays the result of the recursive function on the page.
 */
function showRecursionDemo() {
  const n = 5;
  const result = recursiveSum(n);
  recursionOutput.textContent = `Recursive sum 1 + 2 + ... + ${n} = ${result}`;
}

// ----- Event listeners -----

addTaskBtn.addEventListener("click", handleAddTask);

// Also allow pressing Enter to add a task.
taskInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    handleAddTask();
  }
});

// ----- Initial render -----
renderTasks();
showRecursionDemo();
