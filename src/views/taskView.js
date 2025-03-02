import View from './view'

export default class Task extends View {
  constructor(
    container,
    projectName,
    title,
    description,
    date,
    priority,
    status = false
  ) {
    super(container)
    this.projectName = projectName
    this.title = title
    this.description = description
    this.date = date
    this.priority = priority
    this.status = status
  }

  show() {
    this.render(`
        <span class="task-title">${this.title}<span>
        <span class="task-description">${this.description}</span>
        <span class="task-date">${this.date}</span>
        <span class="task-priority">${this.priority}</span>
        <span class="task-status">${this.status}</span>
    `)
  }

  edit(newTitle, newDescription, newDate, newPriority, newStatus) {
    this.title = newTitle
    this.description = newDescription
    this.date = newDate
    this.priority = newPriority
    this.status = newStatus
  }
}
