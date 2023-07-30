class TaskManager {
  constructor() {
    this.tasks = [];
  }

  loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
    this.renderTasks();
  }

  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  addTask(taskText) {
    if (taskText === "") return;

    const newTask = {
      text: taskText,
      completed: false,
    };

    this.tasks.push(newTask);
    this.saveTasks();
    this.renderTasks();
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.saveTasks();
    this.renderTasks();
  }

  toggleCompleted(index) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveTasks();
    this.renderTasks();
  }

  searchTasks(query) {
    const filteredTasks = this.tasks.filter(task => task.text.toLowerCase().includes(query.toLowerCase()));
    this.renderTasks(filteredTasks);
  }

  renderTasks(tasksToRender) {
    const tasks = tasksToRender || this.tasks;

    const allTaskList = document.getElementById("allTaskList");
    const openTaskList = document.getElementById("openTaskList");
    const completedTaskList = document.getElementById("completedTaskList");
    const allTaskCount = document.getElementById("allTaskCount");
    const openTaskCount = document.getElementById("openTaskCount");
    const completedTaskCount = document.getElementById("completedTaskCount");
    
    let openCount = 0;
    let completedCount = 0;

    let allTasksHTML = "";
    let openTasksHTML = "";
    let completedTasksHTML = "";

    tasks.forEach((task, index) => {
      const taskHTML = `
        <li>
          <span class="${task.completed ? 'completed' : 'active'}">${task.text}</span>
          <button class="${task.completed ? 'btn_task-done' : 'btn_task-open'}" onclick="taskManager.toggleCompleted(${index})"></button>
          <button class="btn_delete" onclick="taskManager.deleteTask(${index})">Delete</button>
        </li>
      `;

      allTasksHTML += taskHTML;
      if (task.completed) {
        completedTasksHTML += taskHTML;
        completedCount++;
      } else {
        openTasksHTML += taskHTML;
        openCount++;
      }
    });

    allTaskList.innerHTML = allTasksHTML || '<li class="empty-message">Keine Aufgaben</li>';
    openTaskList.innerHTML = openTasksHTML || '<li class="empty-message">Yuhu, keine offenen Aufgaben</li>';
    completedTaskList.innerHTML = completedTasksHTML || '<li class="empty-message">Keine beendeten Aufgaben</li>';

    allTaskCount.textContent = tasks.length;
    openTaskCount.textContent = openCount;
    completedTaskCount.textContent = completedCount;
  }
}

const taskManager = new TaskManager();

document.querySelector(".task-types").addEventListener("click", event => {
  if (event.target.tagName === 'H3') {
    document.querySelectorAll(".task-types h3").forEach(item => item.classList.remove("active"));
    document.querySelectorAll('.task-lists ul').forEach(item => { item.classList.remove("show-tasks"); })

    event.target.classList.add("active");
    const ID = document.querySelector(`#${event.target.dataset.open}`);
    ID.classList.add('show-tasks');
  }
});

document.getElementById("taskInput").addEventListener("keyup", event => {
  if (event.key === "Enter") {
    taskManager.addTask(event.target.value.trim());
    event.target.value = "";
  }
});

document.getElementById("searchInput").addEventListener("input", event => {
  taskManager.searchTasks(event.target.value.trim());
});

taskManager.loadTasks();
