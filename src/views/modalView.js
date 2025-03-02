import { createProjectHandle, createTaskHandle } from '../controller'

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
  }
  close() {
    this.modal.close()
  }
}

export class NewProjectModal extends Modal {
  constructor(projectView) {
    super('#newProjectModal')
    this.modal.innerHTML = `
        <div class="modal-content-project"></div>
    `
    this.modalContent = document.querySelector('.modal-content-project')
    const content = `
        <span>New Project</span>
        <form id='new-project'>
            <input name='project_name' min-leinght=3 id='new-project-name' placeholder='Project name' required/>
            <div class='btn-content'>
                <input id='create' type='submit' value='create'/>
                <input id='cancel' type='reset' value='cancel'/>
            </div>
        </form>
    `
    this.modalContent.innerHTML = content
    const btnCreate = document.getElementById('new-project')
    const btnCancel = document.getElementById('cancel')
    btnCreate.addEventListener('submit', (event) => {
      projectView.update(createProjectHandle(event))
      this.modal.close()
    })
    btnCancel.addEventListener('click', () => this.modal.close())
  }
}

export class NewTaskModal extends Modal {
  constructor(taskView) {
    super('#newTaskModal')
    this.modal.innerHTML = `
        <div class="modal-content-task"></div>
    `
    this.modalContent = document.querySelector('.modal-content-task')
    const content = `
    <span>New Task</span>
    <form id="new-task">
        <div class="form-item">
        <div class="title">Title</div>
        <input type="text" name="taskTitle" required />
        </div>
        <div class="form-item">
        <div class="title">Description</div>
        <input type="text" name="taskDescription" required />
        </div>
        <div class="form-item">
        <div class="title">Date</div>
        <input type="date" name="taskDate" required />
        </div>
        <div class="form-item">
        <div class="title">Priority</div>
        <select name="taskPriority" id="priority">
            <option value="Normal">Normal</option>
            <option value="Middle">Middle</option>
            <option value="High">High</option>
        </select>
        </div>
        <div class='btn-content'>
            <input id='create' type='submit' value='create'/>
            <input id='cancel-new-task' type='reset' value='cancel'/>
        </div>
    </form>
    `
    this.modalContent.innerHTML = content
    const btnCreate = document.getElementById('new-task')
    const btnCancel = document.getElementById('cancel-new-task')
    btnCreate.addEventListener('submit', (event) => {
      taskView.update(createTaskHandle(event, taskView.projectName))
      this.modal.close()
    })
    btnCancel.addEventListener('click', () => this.modal.close())
  }
}
