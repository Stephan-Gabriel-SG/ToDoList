import View from './view'
import Task from './taskView'
import { TaskModal as NewTaskModal } from './modalView'

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
      <button id='btn-new-task'>New task</button>
      `)
    this.tasks.forEach((task) => {
      const div = document.createElement('div')
      div.classList.add('task')
      div.setAttribute('id', `task-${task.id}`)
      this.append(div)
      new Task({
        container: `#task-${task.id}`,
        projectName: this.projectName,
        ...task,
      }).show()
    })

    const btnNewTask = document.getElementById('btn-new-task')
    btnNewTask.addEventListener('click', () => {
      const createNewTask = new NewTaskModal({ projectName: this.projectName })
      createNewTask.show().then((result) => {
        if (result) {
          const div = document.createElement('div')
          div.classList.add('task')
          div.setAttribute('id', `task-${result.id}`)
          this.append(div)
          new Task({
            container: `#task-${result.id}`,
            ...result,
          }).show()
        }
      })
    })
  }
}
