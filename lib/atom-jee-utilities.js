'use babel';

import AtomJeeUtilitiesView from './atom-jee-utilities-view';
import { CompositeDisposable } from 'atom';

export default {

  atomJeeUtilitiesView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomJeeUtilitiesView = new AtomJeeUtilitiesView(state.atomJeeUtilitiesViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomJeeUtilitiesView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-jee-utilities:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomJeeUtilitiesView.destroy();
  },

  serialize() {
    return {
      atomJeeUtilitiesViewState: this.atomJeeUtilitiesView.serialize()
    };
  },

  toggle() {
    console.log('AtomJeeUtilities was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
