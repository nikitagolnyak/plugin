'use babel';

import ExamPluginView from './exam-plugin-view';
import { CompositeDisposable } from 'atom';

export default {

  examPluginView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.examPluginView = new ExamPluginView(state.examPluginViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.examPluginView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'exam-plugin:toggle': () => this.toggle()
    }));
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
