'use babel';

import ExamPluginView from './exam-plugin-view';
import { CompositeDisposable } from 'atom';

export default {


  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable(
     // Add an opener for view.
     atom.workspace.addOpener(uri => {
       if (uri === 'atom://exam-plugin') {
         return new ExamPluginView();
       }
    });

    // Register command that toggles this view
     atom.commands.add('atom-workspace', {
       'exam-plugin:toggle': () => this.toggle()
     }),

     // Destroy any ActiveEditorInfoViews when the package is deactivated.
      new Disposable(() => {
        atom.workspace.getPaneItems().forEach(item => {
          if (item instanceof ExamPluginView) {
            item.destroy();
          }
        });
      })
    );
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.examPluginView.destroy();
  },

  serialize() {
    return {
      examPluginViewState: this.examPluginView.serialize()
    };
  },

  toggle() {
    console.log('ExamPlugin was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
