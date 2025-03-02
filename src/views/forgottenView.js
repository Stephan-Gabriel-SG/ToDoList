import Task from './taskView'
import View from './view'
import { isPast, isToday } from 'date-fns'

export default class ForgottenTask extends View {
  constructor(container) {
    super(container)
    this.btnToday = document.getElementById('forgotten-task')
    this.btnToday.addEventListener('click', this.show.bind(this))
  }

  show() {
    this.render(`<h1>Forgotten task</h1>`)
    const db = JSON.parse(localStorage.getItem('db')) || []
    db.forEach((projectObj) => {
      for (let index = 0; index < projectObj.tasks.length; index++) {
        if (
          isPast(new Date(projectObj.tasks[index].date)) &&
          !isToday(new Date(projectObj.tasks[index].date)) &&
          !projectObj.tasks[index].status
        ) {
          const taskContent = document.createElement('div')
          taskContent.setAttribute('id', `task-${index}`)
          taskContent.classList.add('task')
          this.append(taskContent)
          new Task(
            `#task-${index}`,
            projectObj.projectName,
            projectObj.tasks[index].title,
            projectObj.tasks[index].description,
            projectObj.tasks[index].date,
            projectObj.tasks[index].priority,
            projectObj.tasks[index].status
          ).show()
        }
      }
    })
  }
}
