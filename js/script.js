let tasks = [];

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const newTask = {
    text: taskText,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  taskInput.value = "";
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function renderTasks() {
  const allTaskList = document.getElementById("allTaskList");
  const openTaskList = document.getElementById("openTaskList");
  const completedTaskList = document.getElementById("completedTaskList");
  const allTaskCount = document.getElementById("allTaskCount");
  const openTaskCount = document.getElementById("openTaskCount");
  const completedTaskCount = document.getElementById("completedTaskCount");
  allTaskList.innerHTML = "";
  openTaskList.innerHTML = "";
  completedTaskList.innerHTML = "";

  let openCount = 0;
  let completedCount = 0;

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <span class="${task.completed ? 'completed' : 'active'}">${task.text}</span>
        <button class="${task.completed ? 'btn_task-done' : 'btn_task-open'}" onclick="toggleCompleted(${index})"></button>
        <button class="btn_delete" onclick="deleteTask(${index})">Delete</button>
        `;

    if (task.completed) {
      completedTaskList.appendChild(listItem);
      completedCount++;
    } else {
      openTaskList.appendChild(listItem);
      openCount++;
    }
    allTaskList.appendChild(listItem.cloneNode(true));
  });

  allTaskCount.textContent = tasks.length;
  openTaskCount.textContent = openCount;
  completedTaskCount.textContent = completedCount;
}



function setActiveTaskType(event) {
  const taskTypes = document.querySelectorAll(".task-types h3");
  const taskLists = document.querySelectorAll('.task-lists ul');

  taskTypes.forEach(item => item.classList.remove("active"));
  taskLists.forEach(item=>{item.classList.remove("show-tasks");})

  event.target.classList.add("active");
  const ID = document.querySelector(`#${event.target.dataset.open}`);
  ID.classList.add('show-tasks');
}

const taskTypes = document.querySelectorAll(".task-types h3");
taskTypes.forEach((taskType) => taskType.addEventListener("click", setActiveTaskType));



loadTasks();
