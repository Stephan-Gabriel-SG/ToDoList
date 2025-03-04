import { deleteTaskHandle, toggleTaskStatus } from '../controller'
import { ConfirmModal, TaskModal as EditTaskModal } from './modalView'
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
  }

  delete() {
    document.getElementById(`task-${this.id}`)?.remove()
    deleteTaskHandle({ id: this.id, projectName: this.projectName })
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
      <label class="custom-checkbox">
        <input type="checkbox" id='task-status-${this.id}' ${this.status ? 'checked' : ''}>
        <span class="checkmark" ></span>
        ${this.status}
      </label>
      <button class='btn-edit' id='btn-edit-${this.id}' >Edit</button>
      <button class='btn-delete' id='btn-delete-${this.id}' >Delete</button>
      `)
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
    const btnDelete = document.getElementById(`btn-delete-${this.id}`)
    btnDelete.addEventListener('click', () => {
      new ConfirmModal({
        modalTitle: 'Delete',
        modalContent: `Would you like to delete this task "${this.title}" ?`,
      })
        .show()
        .then((result) => {
          if (result) {
            this.delete()
          }
        })
    })
    const btnChangeStatus = document.getElementById(`task-status-${this.id}`)
    btnChangeStatus.addEventListener('click', () => {
      toggleTaskStatus(this.projectName, this.id)
      this.status = !this.status
      this.update()
    })
  }
}
