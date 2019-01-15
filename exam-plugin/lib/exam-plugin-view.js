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

    this.subscriptions = atom.workspace.getCenter().observeExamPlugin(item => {
     if (!atom.workspace.isTextEditor(item)) return;
     message.innerHTML = `
       <h2>${item.getFileName() || 'untitled'}</h2>
       <ul>
         <li><b>Soft Wrap:</b> ${item.softWrapped}</li>
         <li><b>Tab Length:</b> ${item.getTabLength()}</li>
         <li><b>Encoding:</b> ${item.getEncoding()}</li>
         <li><b>Line Count:</b> ${item.getLineCount()}</li>
       </ul>
     `;
   });
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
    this.subscriptions.dispose();
  }

  getElement() {
    return this.element;
  }


  getTitle() {
    // Used by Atom for tab text
    return 'Exam Plugin';
  }

  getDefaultLocation() {
   return 'right';
 }

 getAllowedLocations() {
   return ['left', 'right', 'bottom'];
 }

  getURI() {
    // Used by Atom to identify the view when toggling.
    return 'atom://exam-plugin'
  }

}
