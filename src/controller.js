export const createProjectHandle = (event) => {
  event.preventDefault()
  const newProject = event.target.elements.project_name.value

  if (newProject) {
    const db = JSON.parse(localStorage.getItem('db'))
    localStorage.setItem(
      'db',
      JSON.stringify(db.concat({ projectName: newProject, tasks: [] }))
    )
  }
  return { projectName: newProject, tasks: [] }
}

export const createTaskHandle = (event, projectName) => {
  event.preventDefault()
  const newTask = new FormData(event.target)
  const res = {
    title: newTask.get('taskTitle'),
    description: newTask.get('taskDescription'),
    date: newTask.get('taskDate'),
    priority: newTask.get('taskPriority'),
  }

  const db = JSON.parse(localStorage.getItem('db')) || []
  const projectToUpdate = db.find((obj) => obj.projectName === projectName)
  projectToUpdate.tasks.push(res)
  localStorage.setItem(
    'db',
    JSON.stringify(
      db.map((projectObj) =>
        projectObj.projectName === projectName ? projectToUpdate : projectObj
      )
    )
  )

  return res
}
