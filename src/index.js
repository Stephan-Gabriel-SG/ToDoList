import '@fortawesome/fontawesome-free'
import db from './db.json'
import './style.css'
import ToDoToday from './views/todayView'
import ProjectList from './views/projectListView'
import ForgottenTask from './views/forgottenView'
import DoneTask from './views/doneView'
import { updateNotificationNumber } from './utils'

localStorage.setItem('db', JSON.stringify(db))
new ToDoToday('#view-container').show()
new DoneTask('#view-container')
new ForgottenTask('#view-container')
new ProjectList('#project-container')
updateNotificationNumber()
