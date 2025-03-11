let input = document.getElementById("input");
let add = document.getElementById("add");
let ul = document.getElementById("list");

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
    let text = input.value;
    let task = addTask(text);
    ul.appendChild(task);
    input.value = "";
  }
});

add.addEventListener("click", function () {
  if (input.value === "") {
    alert("Please enter a task");
    return;
  }
  let text = input.value;
  let task = addTask(text);
  ul.appendChild(task);
  input.value = "";
});

ul.addEventListener("click", function (e) {
  if (e.target.nodeName === "SPAN") {
    e.target.classList.toggle("checked");
    e.target.parentElement.classList.toggle("checkBox");
    e.target.nextElementSibling.style.display = "block";
  }

  if (e.target.nodeName === "I") {
    e.target.parentElement.remove();
  }
});
