const TaskForm = document.getElementById("TaskForm");
const TaskList = document.getElementById("TaskList");
const toggleModeBtn = document.getElementById("toggleMode");

// Add New Task
TaskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const TaskInput = document.getElementById("TaskInput");
    const TaskText = TaskInput.value.trim();

    if (TaskText !== "") {
        const task = createTaskItem(TaskText);
        TaskList.appendChild(task);
        TaskInput.value = ""; // Clear input
    }
});

// Toggle Dark/Light Mode
toggleModeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    toggleModeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// Create Task Item
function createTaskItem(text) {
    const task = document.createElement("li");
    task.classList.add("task-item");

    const taskContent = document.createElement("span");
    taskContent.textContent = text;

    // Done Button
    const doneBtn = document.createElement("button");
    doneBtn.innerHTML = "✔️";
    doneBtn.classList.add("done-btn");
    doneBtn.addEventListener("click", () => toggleTaskDone(taskContent));

    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "✏️";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", () => editTask(taskContent, task));

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => task.remove());

    task.appendChild(taskContent);
    task.appendChild(doneBtn);
    task.appendChild(editBtn);
    task.appendChild(deleteBtn);

    return task;
}

// Edit Task
function editTask(taskContent) {
    const newText = prompt("Edit your task:", taskContent.textContent);

    if (newText !== null && newText.trim() !== "") {
        taskContent.textContent = newText.trim();
    } else if (newText === "") {
        alert("Task cannot be empty!");
    }
}

// Toggle Task Done
function toggleTaskDone(taskContent) {
    taskContent.classList.toggle("done");
}

// Remove Example Task on Page Load
document.addEventListener("DOMContentLoaded", function () {
    const exampleTask = TaskList.querySelector("li");
    if (exampleTask) {
        exampleTask.remove(); // Automatically delete the example task
    }
});