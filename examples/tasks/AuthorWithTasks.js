import Author from '../../packages/author/Author'
import TasksPanel from './TasksPanel'

class AuthorWithTasks extends Author {
  _renderContextSection($$) {
    return $$('div').addClass('se-context-section').append(
      $$(TasksPanel)
    )
  }
}

export default AuthorWithTasks
