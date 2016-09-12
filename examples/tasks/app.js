import AuthorApp from '../author/app'
import TasksPackage from './TasksPackage'
// TODO: we need a generic way to make the context panel extensible
import AuthorWithTasks from './AuthorWithTasks'

class TasksApp extends AuthorApp {
  render($$) {
    let el = $$('div').addClass('sc-tasks-example')
    if (this.state.error) {
      el.append(this.state.error)
    }
    if (this.state.documentSession) {
      el.append($$(AuthorWithTasks, {
        documentId: this.props.documentId,
        documentSession: this.state.documentSession,
        configurator: this.getConfigurator()
      }))
    }
    return el
  }

  createDocumentSession(doc) {
    // break some things
    let xref79 = doc.get('xref-79')
    doc.set(['xref-79', 'targets'], [])
    let xref99 = doc.get('xref-99')
    doc.set(['xref-99', 'targets'], [])
    return super.createDocumentSession(doc)
  }
}


if (typeof window !== 'undefined') {
  window.onload = function() {
    let configurator = new TasksApp.Configurator()
    configurator.import(TasksPackage)
    var app = TasksApp.mount({
      configurator: configurator,
      documentId: 'elife-00007'
    }, document.body)
    window.app = app
  }
}
