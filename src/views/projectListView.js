import View from './view'
import ProjectPlanTask from './projectTaskView'
import { NewProjectModal } from './modalView'

export default class ProjectList extends View {
  constructor(container) {
    super(container)
    this.projectLists = Array.from(JSON.parse(localStorage.getItem('db')))
    this.showProjectList()
    const addProject = document.getElementById('btn-new-project')

    const newProjectModal = new NewProjectModal(this)
    addProject.addEventListener('click', () => {
      newProjectModal.show()
    })
  }

  showProjectList() {
    this.projectLists.forEach((projectObj) => {
      const button = document.createElement('button')
      button.textContent = projectObj.projectName
      button.setAttribute('id', projectObj.projectName)
      button.setAttribute('class', 'project-item')
      button.addEventListener('click', () => {
        new ProjectPlanTask(
          '#view-container',
          projectObj.projectName,
          projectObj.tasks
        ).show()
      })
      this.append(button)
    })
  }

  update(newProjectObj) {
    this.projectLists = Array.from(JSON.parse(localStorage.getItem('db')))
    const button = document.createElement('button')
    button.textContent = newProjectObj.projectName
    button.setAttribute('id', newProjectObj.projectName)
    button.setAttribute('class', 'project-item')
    button.addEventListener('click', () => {
      new ProjectPlanTask(
        '#view-container',
        newProjectObj.projectName,
        newProjectObj.tasks
      ).show()
    })
    this.append(button)
  }
}
