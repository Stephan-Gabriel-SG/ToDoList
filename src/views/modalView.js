import {
  createProjectHandle,
  createTaskHandle,
  editProjectHandle,
  editTaskHandle,
} from '../controller'
import { lightFormat } from 'date-fns'

export default class Modal {
  constructor(selector) {
    this.modal = document.querySelector(selector)
    this.modal.addEventListener('click', (event) => {
      if (event.target === this.modal) {
        this.modal.close()
      }
    })
  }
  show() {
    this.modal.showModal()
    return new Promise((resolve) => {
      this.resolve = resolve
    })
  }

  async close(result = null) {
    this.modal.close()
    if (this.resolve) {
      this.resolve(result)
    }
  }
}

export class ProjectModal extends Modal {
  constructor(project = {}) {
    const { id = '', projectName = '', edition = false } = project
    super('#newProjectModal')
    this.edition = edition
    this.modal.innerHTML = `
      <div class="modal-content-project">
        <span>${this.edition ? 'Edit Project' : 'New Project'}</span>
        <form id='new-project'>
            <input type='hidden' name='id' value="${id}" />
            <input name='projectName' minlength="3" id='new-project-name' placeholder='Project name' value="${projectName}" required/>
            <div class='btn-content'>
              <input id='create' type='submit' value='${this.edition ? 'Confirm' : 'Create'}'/>
              <input id='cancel' type='reset' value='Cancel'/>
            </div>
        </form>
      </div>
    `

    this.form = this.modal.querySelector('#new-project')
    this.form.addEventListener('submit', (event) => this.handleSubmit(event))
    this.modal
      .querySelector('#cancel')
      .addEventListener('click', () => this.close())
  }

  async handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(this.form)
    const projectData = Object.fromEntries(formData.entries())
    if (projectData.projectName.length < 3) return
    let result
    if (!this.edition) {
      result = await createProjectHandle(projectData)
    } else {
      result = await editProjectHandle(projectData)
    }

    this.close(result)
  }
}

export class TaskModal extends Modal {
  constructor(task = {}) {
    super('#newTaskModal')

    const {
      projectName = '',
      id = '',
      taskTitle = '',
      taskDescription = '',
      taskDate = new Date(),
      taskPriority = 'Normal',
    } = task

    this.modal.innerHTML = `
      <div class="modal-content-task">
        <span>${taskTitle ? 'Edit Task' : 'New Task'}</span>
        <form id="new-task">
          <input type="hidden" name="projectName" value="${projectName}"/>
          <input type="hidden" name="id" value="${id}"/>
          <div class="form-item">
            <div class="title">Title</div>
            <input type="text" name="taskTitle" required value="${taskTitle}"/>
          </div>
          <div class="form-item">
            <div class="title">Description</div>
            <textarea name="taskDescription" maxlength="100" minlength="10" required>${taskDescription}</textarea>
          </div>
          <div class="form-item">
            <div class="title">Date</div>
            <input type="date" name="taskDate" min=${lightFormat(new Date(), 'yyyy-MM-dd')} value=${lightFormat(new Date(taskDate), 'yyyy-MM-dd')} required/>
          </div>
          <div class="form-item">
            <div class="title">Priority</div>
            <select name="taskPriority">
              <option value="Normal" ${taskPriority === 'Normal' ? 'selected' : ''}>Normal</option>
              <option value="Middle" ${taskPriority === 'Middle' ? 'selected' : ''}>Middle</option>
              <option value="High" ${taskPriority === 'High' ? 'selected' : ''}>High</option>
            </select>
          </div>
          <div class='btn-content'>
            <input id='create' type='submit' value='${taskTitle ? 'Edit' : 'Create'}'/>
            <input id='cancel-new-task' type='reset' value='Cancel'/>
          </div>
        </form>
      </div>
    `

    this.form = this.modal.querySelector('#new-task')
    this.form.addEventListener('submit', (event) => this.handleSubmit(event))
    this.modal
      .querySelector('#cancel-new-task')
      .addEventListener('click', () => this.close())
  }

  async handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(this.form)
    const taskData = Object.fromEntries(formData.entries())

    let result
    if (taskData.id) {
      result = await editTaskHandle(taskData)
    } else {
      result = await createTaskHandle(taskData)
    }

    this.close(result)
  }
}

export class ConfirmModal extends Modal {
  constructor(content = {}) {
    super('#defaultModal')
    const { modalTitle = '', modalContent = '' } = content
    this.modal.innerHTML = `
      <div class="modal-default-content">
          <span class="modal-title">${modalTitle}</span>
          <span class="modal-default-question">${modalContent}</span>
          <div class='btn-content'>
            <input id='modal-yes' type='submit' value='Yes'/>
            <input id='modal-no' type='reset' value='No'/>
          </div>
      </div>
    `
    document.getElementById('modal-yes').addEventListener('click', () => {
      this.close(true)
    })
    document.getElementById('modal-no').addEventListener('click', () => {
      this.close(false)
    })
  }
}
