class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    this._todoCheckboxElement.addEventListener("change", () => {
      this._toggleCompletion();
      this._handleCheck(this._data.completed);
    });

    this._todoDeleteButton.addEventListener("click", () => {
      this._remove();
      this._handleDelete(this._data.completed);
    });
  }

  _toggleCompletion() {
    this._data.completed = !this._data.completed;
  }

  _remove() {
    this._todoElement.remove();
  }

  _generateCheckboxElement() {
    this._todoCheckboxElement =
      this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");

    this._todoCheckboxElement.checked = this._data.completed;
    this._todoCheckboxElement.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _setDate() {
    const todoDateElement = this._todoElement.querySelector(".todo__date");
    const dueDate = new Date(this._data.date);

    if (!isNaN(dueDate)) {
      todoDateElement.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameElement = this._todoElement.querySelector(".todo__name");
    this._todoDeleteButton =
      this._todoElement.querySelector(".todo__delete-btn");

    todoNameElement.textContent = this._data.name;

    this._generateCheckboxElement();
    this._setDate();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
