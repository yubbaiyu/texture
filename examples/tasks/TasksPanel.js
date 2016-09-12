import { Component, ScrollPane } from 'substance'
import fixture from './fixture'

const GLASSES = "\uD83D\uDC53"

class TasksPanel extends Component {

  constructor(...args) {
    super(...args)

    this.tasks = fixture
  }

  render($$) {
    let el = $$('div').addClass('sc-tasks-panel')

    let header = $$('div').addClass('se-header').append('Tasks')

    let body = $$('div').addClass('se-body')
    let scrollPane = $$(ScrollPane).ref('panelEl')
    this.tasks.forEach((task) => {
      scrollPane.append(this._renderTask($$, task))
    })
    body.append(scrollPane)

    el.append(header)
    el.append(body)

    return el;
  }

  _renderTask($$, task) {
    let taskEl = $$('div').addClass('se-task').attr('data-id', task.id)
    taskEl.append(
      $$('div').addClass('se-title').append(task.title)
    )
    if (task.resources && task.resources.length > 0) {
      taskEl.append(
        $$('div').addClass('se-show-resources').append(GLASSES)
          .on('click', this._showTaskResource)
      )
    }
    if (task.items) {
      let itemsEl = $$('ul').addClass('se-items')
      task.items.forEach((item) => {
        let itemEl = $$('li').addClass('se-item').attr('data-id', item.id)
        itemEl.append(
          $$('input').attr('type', 'checkbox').val(item.done),
          $$('span').addClass('se-description').append(item.description)
        )
        if (item.resources && item.resources.length > 0) {
          itemEl.append(
            $$('div').addClass('se-show-resources').append(GLASSES)
              .on('click', this._showItemResource)
          )
        }
        itemsEl.append(itemEl)
      })
      taskEl.append(itemsEl)
    }
    return taskEl
  }

  _showTaskResource(evt) {
    let taskEl = evt.target.parentNode._wrapper
    let taskId = taskEl.attr('data-id')
    this._showResources(taskId)
  }

  _showItemResource(evt) {
    let itemEl = evt.target.parentNode._wrapper
    let itemId = itemEl.attr('data-id')
    let taskEl = itemEl.parentNode.parentNode
    let taskId = taskEl.attr('data-id')
    this._showResources(taskId, itemId)
  }

  _getResources(taskId, itemId) {
    let i, task
    for (i = 0; i < this.tasks.length; i++) {
      const t = this.tasks[i]
      if (t.id === taskId) {
        task = t
        break
      }
    }
    if (!task) return
    if (!itemId) return task.resources
    for (i = 0; i < task.items.length; i++) {
      const _item = task.items[i]
      if (_item.id === itemId) {
        return _item.resources
      }
    }
  }

  _showResources(taskId, itemId) {
    let resources = this._getResources(taskId, itemId)
    if (resources && resources.length >0) {
      let mainScrollPane = this._getMainScrollPane()
      mainScrollPane.onHighlightsUpdated({
        'task': resources
      })
      mainScrollPane.scrollTo(resources[0])
      resources.forEach(function(id) {
        let resourceEl = mainScrollPane.find('*[data-id='+id+']')
        resourceEl.addClass('sm-task-highlighted')
      })
    }
  }

  _getMainScrollPane() {
    let mainScrollPaneEl = document.querySelector('.sc-author .se-main-section .sc-scroll-pane')
    return mainScrollPaneEl._wrapper._comp
  }

}

export default TasksPanel
