const { client } = require('./client');
const { createTask, createCategory, createTaskCategory } = require('./tasks');
const { createUser } = require('./users')

const dropTables = async () => {
  try {
    console.log('dropping tables')
    await client.query(`
    DROP TABLE IF EXISTS task_categories;
    DROP TABLE IF EXISTS categories;
    DROP TABLE IF EXISTS tasks;
    DROP TABLE IF EXISTS users;
    `)
    console.log('finished dropping tables')
  } catch (error) {
    console.error('error dropping tables')
    throw error
  }
}

const createTables = async () => {
  try {
    console.log('creating tables')
    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY, 
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL
    );
    CREATE TABLE tasks(
      id SERIAL PRIMARY KEY, 
      "userId" INTEGER REFERENCES users(id) NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      due_date DATE,
      status VARCHAR(20) DEFAULT ('incomplete')
    );
    CREATE TABLE categories(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      "userId" INTEGER REFERENCES users(id) NOT NULL
    );
    CREATE TABLE task_categories(
      "taskId" INTEGER REFERENCES tasks(id) NOT NULL,
      "categoryId" INTEGER REFERENCES categories(id) NOT NULL,
      UNIQUE ("taskId", "categoryId")
    );
    `)
    console.log('finished creating tables')
  } catch (error) {
    console.error('error creating tables')
    throw error
  }
}

(async () => {
  try {
    await dropTables();
    await createTables();
    await createUser({ username: 'jobin', password: 'password', email: 'myemail@email.com' })
    await createTask({ userId: '1', title: 'title', description: 'description', due_date: '2023-02-25', status: 'complete' })
    await createCategory({ name: 'New Category', userId: 1 })
    await createTaskCategory(1, 1)
  } catch (error) {
    console.error('Error during rebuildDB', error);
    throw error;
  } finally {
    console.log("Database has been rebuilt");
    await client.end()
    console.log('Pool ended')
  }
})();