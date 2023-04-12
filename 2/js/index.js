const todoContainerEl = document.querySelector('#todoContainer');
const todoInputEl = document.querySelector('#todoInput');
const todoButtonEl = document.querySelector('#todoButton');
const logoutButtonEl = document.querySelector('#logoutButton');

//로그인이 돼있냐
const isLogin = () => {
  const loginedUser = localStorage.getItem('login'); // 로그인 키에서 받아옴
  if(!loginedUser) {
    alert('로그인이 필요합니다!');
    location.href = './signin.html';
  }
};

const readTodo = () => {
  todoContainerEl.innerHTML = ''; // 다 날림

  const todos = JSON.parse(localStorage.getItem('todos')).reverse(); // 목록 뒤집기

  todos.forEach(todo => {
    const divEl = document.createElement('div');
    const completeEl = document.createElement('input');
    const userEl = document.createElement('p');
    const deleteEl = document.createElement('button');
    const contentEl = document.createElement('label');

    divEl.className = 'todoItem';

    completeEl.type = 'checkbox';
    completeEl.className = 'checkbox';
    completeEl.id = todo.id;
    completeEl.addEventListener('click', () => {
      updateComplete(todo.id, completeEl.checked);
    });
    completeEl.checked = todo.complete;

    deleteEl.type = 'button';
    deleteEl.textContent = 'X';
    deleteEl.className = 'deleteButton';
    deleteEl.addEventListener('click', () => deleteTodo(todo.id));

    contentEl.textContent = todo.content;
    contentEl.htmlFor = todo.id; // 체크가 되게...(?)

    userEl.textContent = todo.user;

    divEl.append(completeEl, contentEl, userEl, deleteEl);
    todoContainerEl.append(divEl);
  });
};

const createTodo = () => {
  const todoText = todoInputEl.value;

  const todos = JSON.parse(localStorage.getItem('todos'));
  const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

  const newTodo = {
    id: newId,
    complete: false,
    content: todoText,
    user: JSON.parse(localStorage.getItem('login')),
  };

  todos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(todos));
  todoInputEl.value = '';
  
  readTodo();
};

const init = () => {
  isLogin();

  if(!localStorage.getItem('todos')) {
    localStorage.setItem('todos', JSON.stringify([]));
  }

  readTodo();

  todoButtonEl.addEventListener('click', createTodo);
  // logoutButtonEl.addEventListener('click', logout);
};

const deleteTodo = (deleteId) => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const filterdTodos = todos.filter(todo => todo.id !== deleteId);
  
  localStorage.setItem('todos', JSON.stringify(filterdTodos));
  readTodo();
};

const updateComplete = (updatedId, isChecked) => { // 기존의 데이터에서 업데이트 한부분만 바뀌어야한다...
  const todos = JSON.parse(localStorage.getItem('todos'));
  const findedTodos = todos.find(todo => todo.id === updatedId);

  findedTodos.complete = isChecked; // 완료 한 부분 체크

  localStorage.setItem('todos', JSON.stringify(todos));
  readTodo();
};

document.addEventListener('DOMContentLoaded', init);