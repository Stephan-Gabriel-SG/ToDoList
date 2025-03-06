import { isToday, isPast } from 'date-fns'
import _ from 'lodash'

export function applyFilterToTask(filter, tasks) {
  const priorityOrder = { Urgent: 1, High: 2, Normal: 3 }

  return (
    _.orderBy(
      tasks,
      [
        (task) => {
          switch (filter) {
            case 'date[A-Z]':
              return new Date(task.date)
            case 'date[Z-A]':
              return new Date(task.date)
            case 'priority[A-Z]':
              return priorityOrder[task.priority] ?? Infinity
            case 'priority[Z-A]':
              return priorityOrder[task.priority] ?? Infinity
            default:
              return null
          }
        },
      ],
      ['date[Z-A]', 'priority[Z-A]'].includes(filter) ? ['desc'] : ['asc']
    ) || tasks
  )
}

export function updateNotificationNumber() {
  let result = { today: 0, done: 0, forgotten: 0 }
  const db = JSON.parse(localStorage.getItem('db')) || []

  db.forEach((projectObj) => {
    projectObj.tasks.forEach((task) => {
      const taskDate = new Date(task.date)

      if (isToday(taskDate)) {
        result.today++
      } else if (task.status) {
        result.done++
      } else if (isPast(taskDate)) {
        result.forgotten++
      }
    })
  })

  document.getElementById('today-notif').innerText = result.today
  document.getElementById('done-notif').innerText = result.done
  document.getElementById('forgotten-notif').innerText = result.forgotten
}

export function activateMenu() {
  const menuContainer = document.querySelector('.menu')

  if (!menuContainer) return

  menuContainer.removeEventListener('click', handleMenuClick)
  menuContainer.addEventListener('click', handleMenuClick)
}

function handleMenuClick(event) {
  const target = event.target.closest('.menu-item')

  if (!target) return

  document
    .querySelectorAll('.menu-item')
    .forEach((btn) => btn.classList.remove('active'))

  target.classList.add('active')
}
