import View from './view'
import ProjectPlanTask from './projectTaskView'
import { ConfirmModal, ProjectModal as NewProjectModal } from './modalView'
import { deleteProjectHandle } from '../controller'

export default class ProjectList extends View {
  constructor(container) {
    super(container)
    this.projectLists = Array.from(JSON.parse(localStorage.getItem('db')))
    this.showProjectList()
    const addProject = document.getElementById('btn-new-project')

    addProject.addEventListener('click', async () => {
      const newProjectModal = new NewProjectModal({ edition: false })
      newProjectModal.show().then((result) => {
        if (result) {
          this.add(result)
        }
      })
    })
  }

  showProjectList() {
    this.projectLists.forEach((projectObj) => {
      this.add(projectObj)
    })
  }

  delete(projectID) {
    document.getElementById(`project-${projectID}`)?.remove()
    deleteProjectHandle(projectID)
  }

  add(newProjectObj) {
    const projectContainer = document.createElement('div')
    let projectName = newProjectObj.projectName
    projectContainer.innerHTML = `
      <span id='project-${newProjectObj.id}' class='project-title'>${newProjectObj.projectName}</span>
      <button id='edit-${newProjectObj.id}'>Edit</button>
      <button id='del-${newProjectObj.id}'>Delete</button>
      
    `
    projectContainer.setAttribute('id', `project-${newProjectObj.id}`)
    projectContainer.setAttribute('class', 'project-item')
    projectContainer.addEventListener('click', () => {
      new ProjectPlanTask(
        '#view-container',
        newProjectObj.id,
        newProjectObj.tasks
      ).show()
    })
    this.append(projectContainer)
    document
      .getElementById(`edit-${newProjectObj.id}`)
      .addEventListener('click', () => {
        const editProjectModal = new NewProjectModal({
          ...newProjectObj,
          projectName: projectName,
          edition: true,
        })
        editProjectModal.show().then((result) => {
          if (result) {
            document.getElementById(`project-${newProjectObj.id}`).innerText =
              result.projectName
            projectName = result.projectName
            new ProjectPlanTask('#view-container', result.id).show()
          }
        })
      })
    document
      .getElementById(`del-${newProjectObj.id}`)
      .addEventListener('click', () => {
        new ConfirmModal({
          modalTitle: 'Delete',
          modalContent: `Would you like to delete ${newProjectObj.projectName} ?`,
        })
          .show()
          .then((result) => {
            if (result) {
              this.delete(newProjectObj.id)
              document.getElementById('today-task').click()
            }
          })
      })
  }
}
