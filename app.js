const todoInput = document.querySelector("#todo-input");
const form = document.querySelector("#todo-form");
const ul = document.querySelector(".collection");
const add = document.querySelector(".add-btn");
const filter = document.querySelector("#filter");
const clearBtn = document.querySelector(".clear");

const loadEventListeners = () => {
  add.addEventListener("click", addTodo);
  document.addEventListener("DOMContentLoaded", showTodo);
  ul.addEventListener("click", removeTodo);
  filter.addEventListener("keyup", filterTodo);
  clearBtn.addEventListener("click", clearTodos);
};

const addTodo = (e) => {
  if (todoInput.value === "") {
    alert("Input todo");
  } else {
    const li = document.createElement("li");
    li.className = "collection-item todo";
    li.textContent = todoInput.value;
    const link = document.createElement("a");
    link.innerHTML = "<i class='fa fa-remove'></i>";
    link.className = "del";
    li.appendChild(link);
    ul.appendChild(li);
    addToLocalStorage(todoInput.value);
    todoInput.value = "";
    e.preventDefault();
  }
};

const addToLocalStorage = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const showTodo = (e) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((item) => {
    const li = document.createElement("li");
    li.className = "collection-item todo";
    li.textContent = item;
    const link = document.createElement("a");
    link.innerHTML = "<i class='fa fa-remove'></i>";
    link.className = "del";
    li.appendChild(link);
    ul.appendChild(li);
  });
  e.preventDefault();
};

const removeTodo = (e) => {
  if (
    e.target.parentElement.parentElement.classList.contains("collection-item")
  ) {
    if (confirm("are you sure?")) {
      e.target.parentElement.parentElement.remove();
      removeFromLocalStorage(e.target.parentElement.parentElement.textContent);
    }
  }
};

const removeFromLocalStorage = (element) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((item, index) => {
    if (item === element) {
      todos.splice(index, 1);
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
};

const clearTodos = (e) => {
  if (confirm("Are you sure you want to clear todo list?")) {
    while (ul.firstChild) {
      ul.firstChild.remove();
      localStorage.clear("todos");
    }
  }
  e.preventDefault();
};

const filterTodo = (e) => {
  const text = filter.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach((item) => {
    if (item.textContent.toLowerCase().indexOf(text) !== -1) {
      item.style.display = "flex";
      console.log(item);
    } else {
      item.style.display = "none";
      console.log(item);
    }
  });
};

loadEventListeners();
