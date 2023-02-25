const { client } = require('./client')

const createTask = async (fields) => {
  const insertString = Object.keys(fields).map(field => field === "userId" ? '"userId"' : field).join(', ')
  const setString = Object.keys(fields).map((field, index) => `$${index + 1}`).join(', ')

  try {
    const { rows: [task] } = await client.query(`
    INSERT INTO tasks(${insertString})
    VALUES (${setString})
    RETURNING *
    `, Object.values(fields))
    return task
  } catch (error) {
    console.error('error creating task')
    throw error
  }
}

const createCategory = async ({ name, userId }) => {
  try {
    const { rows: [category] } = await client.query(`
    INSERT INTO categories(name, "userId")
    VALUES ($1, $2)
    RETURNING *
    `, [name, userId])
    return category
  } catch (error) {
    console.error('error creating category')
    throw error
  }
}

const createTaskCategory = async (taskId, categoryId) => {
  try {
    const { rows: [taskCategory] } = await client.query(`
    INSERT INTO task_categories("taskId", "categoryId")
    VALUES ($1, $2)
    RETURNING *
    `, [taskId, categoryId])
    return taskCategory
  } catch (error) {
    console.error('error creating task_category')
    throw error
  }
}

const getTaskById = async (taskId) => {
  try {
    const { rows: [task] } = await client.query(`
    SELECT * FROM tasks
    WHERE id = ${taskId}
    `)
    return task
  } catch (error) {
    console.error('error getting task')
    throw error
  }
}

const getTasksByUserId = async (userId) => {
  try {
    const { rows: tasks } = await client.query(`
    SELECT * FROM tasks
    WHERE "userId" = ${userId}
    `)
    const newTasks = []
    tasks.forEach(async (task) => {
      const category = await getCategoryByTaskId(task.id)
      task.category = category.name
      newTasks.push(task)
    })
    return newTasks
  } catch (error) {
    console.error('error getting tasks')
    throw error
  }
}

const getCategoriesByUserId = async (userId) => {
  try {
    const { rows: categories } = await client.query(`
    SELECT * FROM categories
    WHERE "userId" = ${userId}
    `)
    return categories
  } catch (error) {
    console.error('error getting categories')
    throw error
  }
}

const getCategoryByTaskId = async (taskId) => {
  try {
    const { rows: [category] } = await client.query(`
    SELECT * FROM categories
    JOIN task_categories
      ON categories.id = task_categories."categoryId"
    WHERE task_categories."taskId" = ${taskId}
    `)
    return category
  } catch (error) {
    console.error('error getting categories')
    throw error
  }
}

module.exports = {
  createTask,
  createCategory,
  createTaskCategory,
  getTasksByUserId,
  getCategoriesByUserId
}