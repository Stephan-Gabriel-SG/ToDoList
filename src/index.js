import 'boxicons/css/boxicons.min.css'
import '@fontsource-variable/inter'
import db from './db.json'
import './style.css'
import ToDoToday from './views/todayView'
import ProjectList from './views/projectListView'
import ForgottenTask from './views/forgottenView'
import DoneTask from './views/doneView'
import { activateMenu, updateNotificationNumber } from './utils'

if (!localStorage.getItem('db')) {
  localStorage.setItem('db', JSON.stringify(db))
}
new ToDoToday('#view-container').show()
new DoneTask('#view-container')
new ForgottenTask('#view-container')
new ProjectList('#project-container')
updateNotificationNumber()

activateMenu()

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar-menu')
  const toggleButton = document.getElementById('toggle-sidebar')
  const container = document.getElementById('container')

  toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar-hidden')
    container.classList.toggle('collapse-container')
  })
})
