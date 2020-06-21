'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

const render = function () {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  if (localStorage.getItem('todoData')) {
    todoData = JSON.parse(localStorage.getItem('todoData'));
  }

  console.log(todoData);

  todoData.forEach(function (item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoComplete = li.querySelector('.todo-complete');
    const btnTodoRemove = li.querySelector('.todo-remove');

    btnTodoComplete.addEventListener('click', function () {
      item.completed = !item.completed;
      localStorage.setItem('todoData', JSON.stringify(todoData));

      render();
    });

    btnTodoRemove.addEventListener('click', function () {
      todoData.splice(todoData.indexOf(item), 1);
      console.log(todoData);
      localStorage.setItem('todoData', JSON.stringify(todoData));

      render();
    });
  });
};

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();

  if (headerInput.value) {
    const newTodo = {
      value: headerInput.value,
      completed: false,
    };

    todoData.push(newTodo);
    localStorage.setItem('todoData', JSON.stringify(todoData));
    headerInput.value = '';

    render();
  }
});

render();