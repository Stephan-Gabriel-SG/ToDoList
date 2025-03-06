import View from './view'
import Task from './taskView'
import { TaskModal as NewTaskModal } from './modalView'
import { applyFilterToTask } from '../utils'

export default class ProjectPlanTask extends View {
  constructor(container, projectID) {
    super(container)
    const db = JSON.parse(localStorage.getItem('db')).find(
      (obj) => obj.id == projectID
    )
    this.container = container
    this.projectID = projectID
    this.projectName = db.projectName
    this.tasks = db.tasks
  }

  show() {
    this.render(`<h1>${this.projectName} - Task List</h1>
      <div class="view-container-option">
          <button id='btn-new-task' class='hvr-grow'><i class='bx bxs-plus-circle' ></i> Add task</button>
          <div class="filter-container flex-center fl-jc" style="font-size:.9rem;gap:5px;">
          <i class='bx bx-filter' ></i> Filter by
          <select id='filter-task' name='filter-task'>
              <option value='date[A-Z]'>date [A-Z]</option>
              <option value='date[Z-A]'>date [Z-A]</option>
              <option value='priority[A-Z]'>priority [A-Z]</option>
              <option value='priority[Z-A]'>priority [Z-A]</option>
          </select>
          </div>
      </div>
      <div id='task-list-container'></div>
    `)

    this.taskListContainer = document.getElementById('task-list-container')
    this.append(this.taskListContainer)

    const filterTask = document.getElementById('filter-task')
    filterTask.addEventListener('change', () => {
      this.tasks = applyFilterToTask(
        filterTask.value,
        JSON.parse(localStorage.getItem('db')).find(
          (obj) => obj.id == this.projectID
        ).tasks
      )
      this.showTasks()
    })

    this.showTasks()

    const btnNewTask = document.getElementById('btn-new-task')
    btnNewTask.addEventListener('click', () => {
      const createNewTask = new NewTaskModal({ projectName: this.projectName })
      createNewTask.show().then((result) => {
        if (result) {
          this.tasks.push(result)
          this.tasks = applyFilterToTask(filterTask.value, this.tasks)
          this.showTasks()
        }
      })
    })
  }

  showTasks() {
    this.taskListContainer.innerHTML = ''
    this.tasks.forEach((task) => {
      const div = document.createElement('div')
      div.classList.add('task')
      div.setAttribute('id', `task-${task.id}`)
      this.taskListContainer.appendChild(div)
      new Task({
        container: `#task-${task.id}`,
        projectName: this.projectName,
        ...task,
      }).show()
    })
  }
}
