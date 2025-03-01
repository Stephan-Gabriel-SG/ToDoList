import View from './view'
import ProjectPlanTask from './projectTaskView'

export default class ProjectList extends View {
  constructor(container, projectLists) {
    super(container)
    this.projectLists = Array.from(projectLists)
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
  showProjectList() {
    this.projectLists.forEach((element) => {
      console.log(element.projectName)
    })
  }
}
