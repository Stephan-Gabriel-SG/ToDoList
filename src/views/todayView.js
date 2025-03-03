import Task from './taskView'
import View from './view'
import { isToday } from 'date-fns'

export default class ToDoToday extends View {
  constructor(container) {
    super(container)
    this.btnToday = document.getElementById('today-task')
    this.btnToday.addEventListener('click', this.show.bind(this))
  }

  show() {
    this.render(`<h1>Task to do today</h1>`)
    const db = JSON.parse(localStorage.getItem('db')) || []
    db.forEach((projectObj) => {
      for (let index = 0; index < projectObj.tasks.length; index++) {
        if (isToday(new Date(projectObj.tasks[index].date))) {
          const taskContent = document.createElement('div')
          taskContent.setAttribute('id', `task-${index}`)
          taskContent.classList.add('task')
          this.append(taskContent)
          new Task({
            container: `#task-${index}`,
            projectName: projectObj.projectName,
            ...projectObj.tasks[index],
          }).show()
        }
      }
    })
  }
}
