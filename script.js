document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("new-task");
  const addTaskBtn = document.getElementById("add-task");
  const taskList = document.getElementById("task-list");

  // Load tasks from local storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Function to add a task
  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }

    const taskItem = createTaskElement(taskText);

    // Append to DOM and tasks array
    taskList.appendChild(taskItem);
    tasks.push({ text: taskText, completed: false });
    saveTasks();

    taskInput.value = ""; // Clear the input field
  }

  // Function to create a task element
  function createTaskElement(taskText, completed = false) {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <span class="task">${taskText}</span>
        <button class="complete-btn">${completed ? "Undo" : "Complete"}</button>
        <button class="delete-btn">✖</button>
      `;

    if (completed) {
      taskItem.classList.add("completed");
    }

    // Add event listeners for buttons
    taskItem
      .querySelector(".complete-btn")
      .addEventListener("click", function () {
        toggleCompleteTask(taskItem, taskText);
      });
    taskItem
      .querySelector(".delete-btn")
      .addEventListener("click", function () {
        deleteTask(taskItem, taskText);
      });

    return taskItem;
  }

  // Toggle task completion
  function toggleCompleteTask(taskItem, taskText) {
    taskItem.classList.toggle("completed");
    const taskIndex = tasks.findIndex((task) => task.text === taskText);
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveTasks();
    taskItem.querySelector(".complete-btn").textContent = tasks[taskIndex]
      .completed
      ? "Undo"
      : "Complete";
  }

  // Delete task
  function deleteTask(taskItem, taskText) {
    taskList.removeChild(taskItem);
    tasks = tasks.filter((task) => task.text !== taskText);
    saveTasks();
  }

  // Save tasks to local storage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Load tasks from local storage and render them
  function loadTasks() {
    tasks.forEach((task) => {
      const taskItem = createTaskElement(task.text, task.completed);
      taskList.appendChild(taskItem);
    });
  }

  // Event listeners
  addTaskBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Load tasks on page load
  loadTasks();
});
