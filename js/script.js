"use strict";
/////////////////////////////////////////////////
// Elements
const appSection = document.querySelector(".todo");
const addBtn = document.querySelector(".todo__add");
const submitBtn = document.querySelector(".todo__submit");
const deleteBtn = document.querySelector(".todo__delete");
const editBtn = document.querySelector(".todo__edit");
const clearBtn = document.querySelector(".todo__clear");
const message = document.querySelector(".edit_message");

const inputField = document.querySelector(".todo__input");
const tasksContainer = document.querySelector(".todo__tasks");

let taskRows, penBtn, xBtn;

/////////////////////////////////////////////////
// Functions

const currentRows = function () {
  return [...document.querySelectorAll(".todo__tasks__row")];
};
const currentPen = function () {
  return [...document.querySelectorAll(".pen")];
};
const currentX = function () {
  return [...document.querySelectorAll(".del")];
};

const clearTasks = function () {
  const answer = prompt(
    "Are you sure that you want to delete all elements from list? (Insert Y to clear list)"
  );

  if (answer && answer.toLowerCase() === "y")
    currentRows().forEach((row) => row.remove());
  taskRows = currentRows();
};

const showEditBtns = function () {
  penBtn.forEach((btn) => btn.classList.remove("hidden"));
};

const showDeleteBtns = function () {
  xBtn.forEach((btn) => btn.classList.remove("hidden"));
};

const hideEditBtns = function () {
  penBtn.forEach((btn) => btn.classList.add("hidden"));
};

const hideDeleteBtns = function () {
  xBtn.forEach((btn) => btn.classList.add("hidden"));
};

const addTaskItem = function () {
  // Take input value
  const input = inputField.value;
  // counter
  const currentTask = currentRows().length + 1;
  // string to add into HTML
  const html = `<div class="todo__tasks__row">
        <div class="todo__tasks__row--counter">${currentTask}</div>
        <div class="todo__tasks__row--item">${input}</div>
        <div class="pen hidden">🖊</div>
        <div class="del hidden">❌</div>
        </div>`;
  // Adding new element to the UI
  if (input !== "") {
    tasksContainer.insertAdjacentHTML("beforeend", html);
    taskRows.push(html);
  }
  taskRows = currentRows();
  penBtn = currentPen();
  xBtn = currentX();
  // clear input field
  inputField.value = "";
  hideEditBtns();
  hideDeleteBtns();
};

const editTaskItem = function () {
  // update that item
  const wantedRow = taskRows[num - 1].querySelector(".todo__tasks__row--item");
  wantedRow.textContent = inputField.value;
  // set default look
  addBtn.classList.remove("hidden");
  message.classList.add("hiddenOp");
  submitBtn.classList.add("hidden");

  setTimeout(function () {
    inputField.value = "";
  }, 500);
};

const init = function () {
  taskRows = currentRows();
  penBtn = currentPen();
  xBtn = currentX();
  taskRows.forEach((row) => row.remove());
};

/////////////////////////////////////////////////
// Event Handlers

init();

let num;

appSection.addEventListener("click", function (e) {
  e.preventDefault();
  let entireRow = e.target.closest(".todo__tasks__row");
  // Matching strategy
  // adding an element
  if (e.target.classList.contains("todo__add")) addTaskItem();
  // clear all elements
  if (e.target.classList.contains("todo__clear")) {
    clearTasks();
    inputField.focus();
  }
  // show edit btns
  if (e.target.classList.contains("todo__edit")) showEditBtns();
  // show delete btns
  if (e.target.classList.contains("todo__delete")) showDeleteBtns();
  //deleting an element and updating UI
  if (e.target.classList.contains("del")) {
    entireRow.remove();
    // we need correct counter number
    [...document.querySelectorAll(".todo__tasks__row--counter")].forEach(
      (n, i) => (n.textContent = i + 1)
    );
    taskRows = currentRows();
    hideEditBtns();
    hideDeleteBtns();
  }

  // editing the text of the element by clicking on pen
  let itemCurrentValue;
  if (e.target.classList.contains("pen")) {
    hideEditBtns();
    hideDeleteBtns();
    inputField.focus();
    // this is a current value of a item
    itemCurrentValue = e.target.parentElement.querySelector(
      ".todo__tasks__row--item"
    );

    num = e.target.parentElement.querySelector(".todo__tasks__row--counter")
      .textContent;
    // putting value into input field
    inputField.value = itemCurrentValue.textContent;
    // Display message and correct button
    submitBtn.classList.remove("hidden");
    addBtn.classList.add("hidden");
    message.classList.remove("hiddenOp");

    // Maybe I will come latter to fix this doubled event listener, however, this is just small application
    submitBtn.addEventListener("click", function () {
      editTaskItem();
    });
  }
});

document.addEventListener("keydown", function (e) {
  // Adding item by hitting enter
  e.key === "Enter" &&
    inputField !== "" &&
    !addBtn.classList.contains("hidden") &&
    addTaskItem();

  // Change value of item by hittting enter
  e.key === "Enter" &&
    inputField !== "" &&
    !submitBtn.classList.contains("hidden") &&
    editTaskItem();
});
