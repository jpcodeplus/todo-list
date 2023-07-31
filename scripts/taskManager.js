class TaskManager {
  constructor(helpers) {
    this.tasks = [];
    this.allTaskList = document.getElementById("allTaskList");
    this.openTaskList = document.getElementById("openTaskList");
    this.completedTaskList = document.getElementById("completedTaskList");
    this.allTaskCount = document.getElementById("allTaskCount");
    this.openTaskCount = document.getElementById("openTaskCount");
    this.completedTaskCount = document.getElementById("completedTaskCount");
    this.sortableLists = [this.allTaskList, this.openTaskList, this.completedTaskList];
    this.helpers = helpers;
  }



  validateInput(input) {
    let validated = true;
    let errorText = false;
    input.trim();
    if (input.length <= 3) errorText = 'Eingabe zu kurz\n';
    if (errorText) validated = false;
    errorText && this.helpers.createToast(errorText,'error');
    return validated
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

    // Eingabe wird validiert
    if (!this.validateInput(taskText)) return;

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
          <div class="drag-handle"></div>
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
        animation: 150,
        handle: '.drag-handle',
        onEnd: (evt) => {
          const movedTask = this.tasks.splice(evt.oldIndex, 1)[0];
          this.tasks.splice(evt.newIndex, 0, movedTask);
          this.saveTasks();
        },
      });
    });
  }
}