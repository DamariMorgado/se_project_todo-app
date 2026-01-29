class TodoCounter {
  constructor(todos, selector) {
    // Select the appropriate element
    this._element = document.querySelector(selector);
    // Total number of to-dos
    this._total = todos.length;
    // Number of completed to-dos
    this._completed = todos.filter((todo) => todo.completed).length;
    // Call the method to update the text content
    this._updateText();
  }
 
  updateCompleted(increment) {
    this._completed += increment ? 1 : -1;
    this._updateText();
  }
 
  updateTotal(increment) {
    this._total += increment ? 1 : -1;
    this._updateText();
  }
 
  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}
 
export default TodoCounter;
