class TaskManager {
  constructor() {
    this.tasks = [];
    this.allTaskList = document.getElementById("allTaskList");
    this.openTaskList = document.getElementById("openTaskList");
    this.completedTaskList = document.getElementById("completedTaskList");
    this.allTaskCount = document.getElementById("allTaskCount");
    this.openTaskCount = document.getElementById("openTaskCount");
    this.completedTaskCount = document.getElementById("completedTaskCount");
    this.sortableLists = [this.allTaskList, this.openTaskList, this.completedTaskList];
  }

  loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
    this.renderTasks();
  }

  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    this.renderTasks();
  }

  addTask(taskText) {
    if (taskText === "") {
      alert('Ungültige Eingabe!')
      return;}

    const newTask = {
      text: taskText,
      completed: false,
    };

    this.tasks.push(newTask);
    this.saveTasks();
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  toggleCompleted(index) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveTasks();
  }

  searchTasks(query) {
    const filteredTasks = this.tasks.filter(task => task.text.toLowerCase().includes(query.toLowerCase()));
    this.renderTasks(filteredTasks);
  }

  renderTasks(tasksToRender = this.tasks) {
    let openCount = 0;
    let completedCount = 0;

    let allTasksHTML = "";
    let openTasksHTML = "";
    let completedTasksHTML = "";

    tasksToRender.forEach((task, index) => {
      const taskHTML = `
        <li>
          <span class="${task.completed ? 'completed' : 'active'}">${task.text}</span>
          <button class="${task.completed ? 'btn_task btn_task-done' : 'btn_task btn_task-open'}" onclick="taskManager.toggleCompleted(${index})"></button>
          <button class="btn_task btn_delete" onclick="taskManager.deleteTask(${index})">Delete</button>
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

    this.allTaskList.innerHTML = allTasksHTML || '<li class="empty-message">Keine Aufgaben</li>';
    this.openTaskList.innerHTML = openTasksHTML || '<li class="empty-message">Yuhu, keine offenen Aufgaben</li>';
    this.completedTaskList.innerHTML = completedTasksHTML || '<li class="empty-message">Keine beendeten Aufgaben</li>';

    this.allTaskCount.textContent = tasksToRender.length;
    this.openTaskCount.textContent = openCount;
    this.completedTaskCount.textContent = completedCount;
  }

  initSortable() {
    this.sortableLists.forEach(list => {
      new Sortable(list, {
        onEnd: (evt) => {
          const movedTask = this.tasks.splice(evt.oldIndex, 1)[0];
          this.tasks.splice(evt.newIndex, 0, movedTask);
          this.saveTasks();
        },
      });
    });
  }
}

const taskManager = new TaskManager();
taskManager.initSortable();

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

document.querySelector(".add-new-task").addEventListener("click", event => {
  const input = document.getElementById("taskInput");
  taskManager.addTask(input.value.trim());
  input.value = "";
});

document.getElementById("searchInput").addEventListener("input", event => {
  taskManager.searchTasks(event.target.value.trim());
});





taskManager.loadTasks();