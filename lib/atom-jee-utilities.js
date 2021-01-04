'use babel';

import AtomJeeUtilitiesJavaProjectView from './atom-jee-utilities-java-project-view';
import
{
    CompositeDisposable
}
from 'atom';

export default
{

    atomJeeUtilitiesJavaProjectView: null,
    modalPanelJava: null,
    subscriptions: null,

    activate(state)
    {
        this.atomJeeUtilitiesJavaProjectView = new AtomJeeUtilitiesJavaProjectView(state.atomJeeUtilitiesViewState);
        this.modalPanelJava = atom.workspace.addModalPanel(
        {
            item: this.atomJeeUtilitiesJavaProjectView.getElement(),
            visible: false
        });

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace',
        {
            'atom-jee-utilities:new-project-java': () => this.toggleJavaProject(),
            'atom-jee-utilities:new-project-jee': () => this.toggleJeeProject()
        }));
    },

    deactivate()
    {
        this.modalPanelJava.destroy();
        this.subscriptions.dispose();
        this.atomJeeUtilitiesJavaProjectView.destroy();
    },

    serialize()
    {
        return {
            atomJeeUtilitiesViewState: this.atomJeeUtilitiesJavaProjectView.serialize()
        };
    },

    toggleJavaProject()
    {
        console.log('AtomJeeUtilities was toggled!');
        return (
            this.modalPanelJava.isVisible() ?
            this.modalPanelJava.hide() :
            this.modalPanelJava.show()
        );
    }

};
