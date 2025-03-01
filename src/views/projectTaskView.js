import View from './view'
import Task from './taskView'

export default class ProjectPlanTask extends View {
  constructor(container, projectName, tasks) {
    super(container)
    this.projectName = projectName
    console.log(tasks)
    this.tasks = tasks
  }
  show() {
    this.render(`<h1>Tasks for ${this.projectName}</h1>`)
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
  }
}
