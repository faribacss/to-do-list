window.addEventListener("load", function () {
  showTasks();
  restoreCheckedTasks();
});

let input = document.getElementById("input");
let add = document.getElementById("add");
let ul = document.getElementById("list");
let tasks;

if (!localStorage.getItem("todolist")) {
  tasks = [];
} else {
  tasks = getTasks();
}

function addTask(text) {
  let li = document.createElement("li");
  li.classList.add("task");
  let span = document.createElement("span");
  span.textContent = text;
  let i = document.createElement("i");
  i.classList.add("fa-solid", "fa-trash");
  li.appendChild(span);
  li.appendChild(i);
  return li;
}

window.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    let text = input.value.trim();
    if (text === "" || text === " ") {
      alert("Please enter a task");
      return;
    }
    let task = addTask(text);
    ul.appendChild(task);
    saveTask(text);
    input.value = "";
  }
});

add.addEventListener("click", function () {
  let text = input.value.trim();
  if (text === "" || text === " ") {
    alert("Please enter a task");
    return;
  }
  let task = addTask(text);
  ul.appendChild(task);
  saveTask(text);
  input.value = "";
});

ul.addEventListener("click", function (e) {
  if (e.target.nodeName === "SPAN") {
    e.target.classList.toggle("checked");
    let check = e.target.parentElement;
    check.classList.toggle("checkBox");
    saveCheckedTasks();
  }

  if (e.target.nodeName === "I") {
    let target = e.target.parentElement;
    target.remove();
    tasks.splice(tasks.indexOf(target.textContent), 1);
    localStorage.setItem("todolist", tasks);
    saveCheckedTasks();
  }
});

function saveTask(text) {
  tasks.push(text);
  localStorage.setItem("todolist", tasks);
}
function getTasks() {
  return localStorage.getItem("todolist").split(",");
}
function showTasks() {
  for (const taskText of tasks) {
    let li = addTask(taskText);
    ul.appendChild(li);
  }
}
function saveCheckedTasks() {
  let checkedTasks = [];
  document.querySelectorAll(".checked").forEach((span) => {
    checkedTasks.push(span.textContent);
  });
  localStorage.setItem("checkedTasks", JSON.stringify(checkedTasks));
}

function restoreCheckedTasks() {
  let checkedTasks = JSON.parse(localStorage.getItem("checkedTasks")) || [];
  document.querySelectorAll("span").forEach((span) => {
    if (checkedTasks.includes(span.textContent)) {
      span.classList.add("checked");
      span.parentElement.classList.add("checkBox");
    }
  });
}