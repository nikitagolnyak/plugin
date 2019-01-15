'use babel';

export default class ExamPluginView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('exam-plugin');

    // Create message element
    const message = document.createElement('div');
    message.textContent = 'The ExamPlugin package is Alive! It\'s ALIVE!';
    message.classList.add('message');
    this.element.appendChild(message);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  getTitle() {
    // Used by Atom for tab text
    return 'Exam Plugin';
  }

  getURI() {
    // Used by Atom to identify the view when toggling.
    return 'atom://exam-plugin'
  }

}
