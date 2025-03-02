import Task from './taskView'
import View from './view'

export default class DoneTask extends View {
  constructor(container) {
    super(container)
    this.btnToday = document.getElementById('done-task')
    this.btnToday.addEventListener('click', this.show.bind(this))
  }

  show() {
    this.render(`<h1>Task Done</h1>`)
    const db = JSON.parse(localStorage.getItem('db')) || []
    db.forEach((projectObj) => {
      for (let index = 0; index < projectObj.tasks.length; index++) {
        if (projectObj.tasks[index].status) {
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
