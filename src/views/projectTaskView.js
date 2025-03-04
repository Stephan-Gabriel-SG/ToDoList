import View from './view'
import Task from './taskView'
import { TaskModal as NewTaskModal } from './modalView'
import _ from 'lodash'

export default class ProjectPlanTask extends View {
  constructor(container, projectID) {
    super(container)
    const db = JSON.parse(localStorage.getItem('db')).find(
      (obj) => obj.id == projectID
    )
    this.container = container
    this.projectID = projectID
    this.projectName = db.projectName
    this.tasks = db.tasks
  }

  show() {
    this.render(`<h1>Tasks for ${this.projectName}</h1>
      <div>
          <button id='btn-new-task'>New task</button>
          <select id='filter-task' name='filter-task'>
              <option value='date[A-Z]'>date [A-Z]</option>
              <option value='date[Z-A]'>date [Z-A]</option>
              <option value='priority[A-Z]'>priority [A-Z]</option>
              <option value='priority[Z-A]'>priority [Z-A]</option>
          </select>
      </div>
      <div id='task-list-container'></div>
    `)

    this.taskListContainer = document.getElementById('task-list-container')
    this.append(this.taskListContainer)

    const filterTask = document.getElementById('filter-task')
    filterTask.addEventListener('change', () =>
      this.applyFilter(filterTask.value)
    )

    this.showTasks()

    const btnNewTask = document.getElementById('btn-new-task')
    btnNewTask.addEventListener('click', () => {
      const createNewTask = new NewTaskModal({ projectName: this.projectName })
      createNewTask.show().then((result) => {
        if (result) {
          this.tasks.push(result)
          this.applyFilter(filterTask.value)
        }
      })
    })
  }

  applyFilter(filter) {
    const priorityOrder = { Urgent: 1, High: 2, Normal: 3 }
    switch (filter) {
      case 'date[A-Z]':
        this.tasks = _.orderBy(
          this.tasks,
          [(task) => new Date(task.date)],
          ['asc']
        )
        break
      case 'date[Z-A]':
        this.tasks = _.orderBy(
          this.tasks,
          [(task) => new Date(task.date)],
          ['desc']
        )
        break
      case 'priority[A-Z]':
        this.tasks = _.orderBy(
          this.tasks,
          [(task) => priorityOrder[task.priority]],
          ['asc']
        )
        break
      case 'priority[Z-A]':
        this.tasks = _.orderBy(
          this.tasks,
          [(task) => priorityOrder[task.priority]],
          ['desc']
        )
        break
    }
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
        projectName: this.projectName,
        ...task,
      }).show()
    })
  }
}
