'use babel';

import { CompositeDisposable, File } from 'atom';
import MyPackageView from '../Views/java-project-view';

export default
{

    subscriptions: null,

    activate(state)
    {
        //declaration des views
        let myPackageView = new MyPackageView(state.atomJeeUtilitiesViewState);
        let modalPanel = atom.workspace.addModalPanel(
        {
            item: myPackageView.getElement(),
            visible: false,
        });

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();
        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace',
        {
            // 'atom-jee-utilities:ecrire': (e) => this.ecrireDansFichier(),
            'atom-jee-utilities:ecrireServlet': (e) => this.ecrireServlet(),
            'atom-jee-utilities:ecrireFilter': (e) => this.ecrireFilter(),
            'atom-jee-utilities:ecrireListener': (e) => this.ecrireListener(),
            // 'atom-jee-utilities:new-java-class': (e) => this.toggleJavaClass(),
            // 'atom-jee-utilities:new-project-java': (e) => this.toggleJavaProject(),
            // 'atom-jee-utilities:new-project-jee': (e) => this.toggleJeeProject(),
        }));
    },

    deactivate()
    {
        this.subscriptions.dispose();
    },

    serialize()
    {
        return {
            // atomJeeUtilitiesViewState: this.javaProject.serialize(),
            // atomJeeUtilitiesViewState: this.javaClass.serialize()
        };
    },

    ecrireDansFichier(texte)
    {
        // const editor = atom.workspace.getActiveTextEditor();
        // const fs = require('fs');
        // const path = require('path');
        //
        // editor.setCursorBufferPosition([0, 0]);
        // editor.insertText('foo');
        // editor.save();
        //
        // dirs = atom.project.getPaths();
        // defaultPath = dirs[0];
        // fileActu = atom.workspace.getActivePaneItem().buffer.file.path;
        //
        // tab = document.querySelector('.right-clicked');
        // nomDuDossierClique = e.target.closest('.name').getAttribute('title');
        // console.log(editor.getPath());
        //
        //
        // // path = fs.getHomeDirectory();
        // fs.writeFile(atom.project.getPaths()[0] + "/test", "Hey there!", function(err) {
        //     if(err) {
        //         return console.log(err);
        //     }
        //     console.log("The file was saved!");
        // });

        editorPromise = atom.workspace.open()

        editorPromise.then(editor =>
        {
            editor.setCursorBufferPosition([0, 0]);
            editor.insertText(texte);
              atom.textEditors.setGrammarOverride(editor, 'source.java')
            editor.save();
        }).catch(error => {
            console.log(error)
        });

        // editor.getBuffer().clearUndoStack()
        // atom.workspace.open().then (editor) =>
        //   atom.textEditors.setGrammarOverride(editor, 'source.sql')
        // editor.insertText(text)
        //   // editor.getBuffer().clearUndoStack()
    },


    ecrireServlet()
    {
        text = '\
import javax.servlet.ServletException;\n\
import javax.servlet.annotation.WebServlet;\n\
import javax.servlet.http.HttpServlet;\n\
import javax.servlet.http.HttpServletRequest;\n\
import javax.servlet.http.HttpServletResponse;\n\
import java.io.IOException;\n\n\
@WebServlet("ServletName")\n\
public class ServletName extends HttpServlet\n\
{\n\
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException\n\
	{}\n\n\
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException\n\
	{}\n\
}'

        // text = "je ne suis pas un héros"
        this.ecrireDansFichier(text);
    },

    ecrireListener()
    {
        text = '\
import javax.servlet.ServletContextEvent;\n\
import javax.servlet.ServletContextListener;\n\
import javax.servlet.ServletRequestEvent;\n\
import javax.servlet.ServletRequestListener;\n\
import javax.servlet.annotation.WebListener;\n\
import javax.servlet.http.HttpSessionAttributeListener;\n\
import javax.servlet.http.HttpSessionEvent;\n\
import javax.servlet.http.HttpSessionListener;\n\
import javax.servlet.http.HttpSessionBindingEvent;\n\n\
@WebListener()\n\
public class ListenerName implements ServletContextListener,\n\
        HttpSessionListener, HttpSessionAttributeListener, ServletRequestListener\n\
{\n\
    @Override\n\
    public void requestDestroyed(ServletRequestEvent sre)\n\
    {}\n\n\
    @Override\n\
    public void requestInitialized(ServletRequestEvent sre)\n\
    {}\n\n\
    // Public constructor is required by servlet spec\n\
    public ListenerName()\n\
    {}\n\n\
    // -------------------------------------------------------\n\
    // ServletContextListener implementation\n\
    // -------------------------------------------------------\n\
    public void contextInitialized(ServletContextEvent sce)\n\
    {\n\
        /* This method is called when the servlet context is\n\
            initialized(when the Web application is deployed).\n\
            You can initialize servlet context related data here.\n\
        */\n\
    }\n\
    public void contextDestroyed(ServletContextEvent sce)\n\
    {\n\
        /* This method is invoked when the Servlet Context\n\
            (the Web application) is undeployed or\n\
            Application Server shuts down.\n\
        */\n\
    }\n\n\
    // -------------------------------------------------------\n\
    // HttpSessionListener implementation\n\
    // -------------------------------------------------------\n\
    public void sessionCreated(HttpSessionEvent se)\n\
    {\n\
        /* Session is created. */\n\
    }\n\n\
    public void sessionDestroyed(HttpSessionEvent se)\n\
    {\n\
        /* Session is destroyed. */\n\
    }\n\n\
    // -------------------------------------------------------\n\
    // HttpSessionAttributeListener implementation\n\
    // -------------------------------------------------------\n\n\
    public void attributeAdded(HttpSessionBindingEvent sbe)\n\
    {\n\
        /* This method is called when an attribute\n\
            is added to a session.\n\
        */\n\
    }\n\n\
    public void attributeRemoved(HttpSessionBindingEvent sbe)\n\
    {\n\
        /* This method is called when an attribute\n\
            is removed from a session.\n\
        */\n\
    }\n\n\
    public void attributeReplaced(HttpSessionBindingEvent sbe)\n\
    {\n\
        /* This method is invoked when an attribute\n\
            is replaced in a session.\n\
        */\n\
    }\n\
}'

        // text = "je ne suis pas un héros"
        this.ecrireDansFichier(text);
    },

    ecrireFilter()
    {
        text = '\
import javax.servlet.*;\n\
import javax.servlet.annotation.WebFilter;\n\
import java.io.IOException;\n\n\
@WebFilter(filterName = "Filter")\n\
public class FilterName implements javax.servlet.Filter\n\
{\n\
    public void destroy()\n\
    {}\n\n\
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException\n\
    {\n\
        chain.doFilter(req, resp);\n\
    }\n\n\
    public void init(FilterConfig config) throws ServletException\n\
    {}\n\
}'

        this.ecrireDansFichier(text);
    },

    afficherPanel(panel)
    {
        panel.show();
    }
};
