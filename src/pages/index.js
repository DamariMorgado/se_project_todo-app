import "../pages/index.css";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupElement = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupElement.querySelector(".popup__form");

const generateTodo = (data) => {
  const handleCheck = (completed) => {
    todoCounter.updateCompleted(completed);
  };

  const handleDelete = (completed) => {
    if (completed) {
      todoCounter.updateCompleted(false);
    }
    todoCounter.updateTotal(false);
  };

  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  return todo.getView();
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    // Generate to-do item
    const todoElement = generateTodo(item);
    // Add it to the to-do list
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const newTodoData = { name, date, completed: false, id };

    const todoElement = generateTodo(newTodoData);
    section.addItem(todoElement);
    todoCounter.updateTotal(true);
    formValidator.resetValidation();
    addTodoPopup.close();
  },
});

addTodoPopup.setEventListeners();

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

section.renderItems();
