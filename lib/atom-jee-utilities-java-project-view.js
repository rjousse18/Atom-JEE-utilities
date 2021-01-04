'use babel';

export default class AtomJeeUtilitiesJavaProjectView
{

    constructor(serializedState)
    {
        // Create root element
        this.element = document.createElement('div');
        this.element.classList.add('atom-jee-utilities');

        const titre = document.createElement('h1');
        titre.textContent = "Create New Java Project";
        titre.classList.add('titre');

        // Create message element
        const message = document.createElement('div');
        message.textContent = 'Ici on va mettre des truc normalement';
        message.classList.add('message');



        this.element.appendChild(titre);
        this.element.appendChild(message);
    }

    // Returns an object that can be retrieved when package is activated
    serialize()
    {}

    // Tear down any state and detach
    destroy()
    {
        this.element.remove();
    }

    getElement()
    {
        return this.element;
    }

}
