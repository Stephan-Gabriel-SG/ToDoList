import Task from './taskView'
import View from './view'
import { applyFilterToTask } from '../utils'

export default class DoneTask extends View {
  constructor(container) {
    super(container)
    const notif = document.createElement('span')
    notif.setAttribute('id', 'done-notif')
    this.btnDone = document.getElementById('done-task')
    this.btnDone.append(notif)
    this.btnDone.addEventListener('click', this.show.bind(this))
  }

  show() {
    this.render(`<h1>Task Done</h1>
            <div>
          <select id='filter-task' name='filter-task'>
              <option value='date[A-Z]'>date [A-Z]</option>
              <option value='date[Z-A]'>date [Z-A]</option>
              <option value='priority[A-Z]'>priority [A-Z]</option>
              <option value='priority[Z-A]'>priority [Z-A]</option>
          </select>
      </div>
      <div id='task-list-container'></div>`)

    this.taskListContainer = document.getElementById('task-list-container')
    this.append(this.taskListContainer)

    const filterTask = document.getElementById('filter-task')
    filterTask.addEventListener('change', () => {
      this.tasks = applyFilterToTask(filterTask.value, this.tasks)
      this.showTasks()
    })

    const db = JSON.parse(localStorage.getItem('db')) || []
    this.tasks = db.flatMap((projectObj) =>
      projectObj.tasks
        .filter((task) => task.status)
        .map((task) => ({ ...task, projectName: projectObj.projectName }))
    )

    this.showTasks()
  }

  showTasks() {
    this.taskListContainer.innerHTML = ''
    this.tasks.forEach((task) => {
      const div = document.createElement('div')
      div.classList.add('task')
      div.setAttribute('id', `task-${task.id}`)
      this.taskListContainer.appendChild(div)
      new Task({
        container: `#task-${task.id}`,
        projectName: task.projectName,
        ...task,
      }).show()
    })
  }
}
