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
    this.subscriptions.dispose();
  },

  toggle() {
    atom.workspace.toggle('atom://exam-plugin');
  }

  deserializeExamPlugin(serialized) {
    return new ExamPluginView();
  }

};
