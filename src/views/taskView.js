import { TaskModal as EditTaskModal } from './modalView'
import View from './view'

export default class Task extends View {
  constructor({
    container,
    id,
    projectName,
    title,
    description,
    date,
    priority,
    status = false,
  }) {
    super(container)
    this.id = id
    this.projectName = projectName
    this.title = title
    this.description = description
    this.date = date
    this.priority = priority
    this.status = status
  }

  show() {
    this.update()
    const btnEdit = document.getElementById(`btn-edit-${this.id}`)
    btnEdit.addEventListener('click', () => {
      new EditTaskModal({
        projectName: this.projectName,
        id: this.id,
        taskTitle: this.title,
        taskDescription: this.description,
        taskDate: this.date,
        taskPriority: this.priority,
      })
        .show()
        .then((result) => {
          if (result) {
            this.edit(result)
          }
        })
    })
  }

  edit(editedTask = {}) {
    this.title = editedTask.title
    this.description = editedTask.description
    this.date = editedTask.date
    this.priority = editedTask.priority
    this.update()
  }

  update() {
    this.render(`
      <span class="task-title">${this.title}<span>
      <span class="task-description">${this.description}</span>
      <span class="task-date">${this.date}</span>
      <span class="task-priority">${this.priority}</span>
      <span class="task-status">${this.status}</span>
      <button class='btn-edit' id='btn-edit-${this.id}' >Edit</button>
      `)
  }
}
