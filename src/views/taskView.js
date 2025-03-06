import { lightFormat } from 'date-fns'
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
      <div class='regular-content'>
        <label class="custom-checkbox">
          <input type="checkbox" id="task-status-${this.id}" ${this.status ? 'checked' : ''}>
          <span class="checkmark"></span>
        </label>
        <span class="task-title ${this.status ? 'task-finish' : ''}">${this.title}</span>
        <button class="btn-detail" id="btn-detail-${this.id}">More</button>
        <span class="task-date ${this.status ? 'task-finish' : ''}">${lightFormat(this.date, 'MM-dd-yyyy')}</span>
        <span class="task-priority flex-center ${this.priority}"><i class='bx bxs-flag-alt'></i>${this.priority}</span>
        <div class="btn-task-container flex-center fl-jc">
          <button class="btn-edit task-btn" id="btn-edit-${this.id}"><i class='bx bxs-edit ' style=" ${this.status ? 'color:var(--red)' : ''}" ></i></button>
          <button class="btn-delete task-btn" id="btn-delete-${this.id}"><i class='bx bxs-trash' style=" ${this.status ? 'color:var(--red)' : ''}"  ></i></button>
        </div>
      </div>
      <div id="task-description-${this.id}" class='detail-content' style="display: none;">
          <span class='task-description-title'>Task description</span>
          <span>${this.description}</span>
      </div>
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
    const btnDetail = document.getElementById(`btn-detail-${this.id}`)

    btnDetail.addEventListener('click', () => {
      const description = document.getElementById(`task-description-${this.id}`)
      const isVisible = description.style.display === 'flex'
      btnDetail.textContent = isVisible ? 'More' : 'Less'
      description.style.display = isVisible ? 'none' : 'flex'
    })
  }
}
