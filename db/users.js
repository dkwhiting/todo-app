const { client } = require("./client")
const bcrypt = require('bcrypt')
const saltRounds = 10;

const createUser = async ({ username, password, email }) => {
  try {
    const hashedPass = await bcrypt.hash(password, saltRounds)
    const { rows: [user] } = await client.query(`
    INSERT INTO users (username, password, email)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [username, hashedPass, email])
    return user
  } catch (error) {
    console.error('error with createUser')
    throw error
  }
}

module.exports = {
  createUser
} 