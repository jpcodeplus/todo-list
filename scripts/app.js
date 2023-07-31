const taskManager = new TaskManager(new TaskHelpers());
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


document.querySelector(".add-new-task").addEventListener("click", event => {
  const input = document.getElementById("taskInput");
  taskManager.addTask(input.value);
  input.value = "";
});

document.getElementById("searchInput").addEventListener("input", event => {
  taskManager.searchTasks(event.target.value);
});


// =====================================


taskManager.loadTasks();


window.onload = function() {
  const preloader = document.getElementById('preloader');
  setTimeout(function() {
    preloader.style.opacity = "0";
    setTimeout(function() {
      preloader.remove();
    }, 600);
  }, 600);
}