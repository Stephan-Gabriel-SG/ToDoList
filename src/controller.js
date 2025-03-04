import { updateNotificationNumber } from './utils'

export const createProjectHandle = (data) => {
  const newProject = data.projectName
  let db
  if (newProject) {
    db = JSON.parse(localStorage.getItem('db'))
    localStorage.setItem(
      'db',
      JSON.stringify(
        db.concat({ id: db.length + 1, projectName: newProject, tasks: [] })
      )
    )
  }
  return { id: db.length + 1, projectName: newProject, tasks: [] }
}

export const editProjectHandle = (data) => {
  if (data.id) {
    const db = JSON.parse(localStorage.getItem('db'))
    localStorage.setItem(
      'db',
      JSON.stringify(
        db.map((projectObj) =>
          projectObj.id == data.id
            ? { ...projectObj, projectName: data.projectName }
            : projectObj
        )
      )
    )
  }
  return data
}

export const deleteProjectHandle = (projectID) => {
  if (projectID) {
    const db = JSON.parse(localStorage.getItem('db'))
    localStorage.setItem(
      'db',
      JSON.stringify(db.filter((projectObj) => projectObj.id != projectID))
    )
    updateNotificationNumber()
  }
}
export const createTaskHandle = async (data) => {
  const result = {
    title: data.taskTitle,
    description: data.taskDescription,
    date: data.taskDate,
    priority: data.taskPriority,
  }

  const db = JSON.parse(localStorage.getItem('db')) || []
  const projectToUpdate = db.find((obj) => obj.projectName === data.projectName)
  projectToUpdate.tasks.push({
    id: projectToUpdate.tasks.length + 1,
    ...result,
  })
  localStorage.setItem(
    'db',
    JSON.stringify(
      db.map((projectObj) =>
        projectObj.projectName === data.projectName
          ? projectToUpdate
          : projectObj
      )
    )
  )
  updateNotificationNumber()
  return {
    id: projectToUpdate.tasks.length,
    ...result,
    projectName: data.projectName,
  }
}

export const editTaskHandle = (data) => {
  console.log({ data })
  const result = {
    id: data.id,
    title: data.taskTitle,
    description: data.taskDescription,
    date: data.taskDate,
    priority: data.taskPriority,
  }

  const db = JSON.parse(localStorage.getItem('db')) || []
  const projectToUpdate = db.find((obj) => obj.projectName == data.projectName)
  console.log({ projectToUpdate })
  projectToUpdate.tasks.map((task) => (task.id == result.id ? result : task))
  localStorage.setItem(
    'db',
    JSON.stringify(
      db.map((projectObj) =>
        projectObj.projectName === data.projectName
          ? projectToUpdate
          : projectObj
      )
    )
  )

  return {
    ...result,
    projectName: data.projectName,
  }
}

export const deleteTaskHandle = (data) => {
  if (data.id && data.projectName) {
    const db = JSON.parse(localStorage.getItem('db'))
    const projectToUpdate = db.find(
      (project) => project.projectName == data.projectName
    )
    projectToUpdate.tasks = projectToUpdate.tasks.filter(
      (task) => task.id != data.id
    )
    localStorage.setItem(
      'db',
      JSON.stringify(
        db.map((projectObj) =>
          projectObj.projectName === data.projectName
            ? projectToUpdate
            : projectObj
        )
      )
    )
    updateNotificationNumber()
  }
}

export const toggleTaskStatus = (projectName, taskId) => {
  if (projectName && taskId) {
    const db = JSON.parse(localStorage.getItem('db'))
    const projectToUpdate = db.find(
      (project) => project.projectName == projectName
    )
    projectToUpdate.tasks = projectToUpdate.tasks.map((task) =>
      task.id == taskId ? { ...task, status: !task.status } : task
    )
    localStorage.setItem(
      'db',
      JSON.stringify(
        db.map((projectObj) =>
          projectObj.projectName === projectName ? projectToUpdate : projectObj
        )
      )
    )
    updateNotificationNumber()
  }
}
