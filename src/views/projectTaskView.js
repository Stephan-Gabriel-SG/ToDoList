import View from './view'
import Task from './taskView'
import { NewTaskModal } from './modalView'

export default class ProjectPlanTask extends View {
  constructor(container, projectName) {
    super(container)
    this.projectName = projectName
    this.tasks = JSON.parse(localStorage.getItem('db')).find(
      (obj) => obj.projectName === projectName
    ).tasks
  }

  show() {
    this.render(`<h1>Tasks for ${this.projectName}</h1>
      <button id='btn-new-task'>New task</button>
      `)
    this.tasks.forEach((task, index) => {
      const div = document.createElement('div')
      div.classList.add('task')
      div.setAttribute('id', `task-${index}`)
      this.append(div)
      new Task(
        `#task-${index}`,
        this.projectName,
        task.title,
        task.description,
        task.date,
        task.priority
      ).show()
    })
    const btnNewTask = document.getElementById('btn-new-task')
    const createNewTask = new NewTaskModal(this)
    btnNewTask.addEventListener('click', () => {
      createNewTask.show()
    })
  }

  update(taskObj) {
    const div = document.createElement('div')
    div.classList.add('task')
    div.setAttribute('id', `task-${this.tasks.lenght}`)
    this.append(div)
    new Task(
      `#task-${this.tasks.lenght}`,
      this.projectName,
      taskObj.title,
      taskObj.description,
      taskObj.date,
      taskObj.priority
    ).show()
  }
}
