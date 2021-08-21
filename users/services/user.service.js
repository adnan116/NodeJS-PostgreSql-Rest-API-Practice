const db = require('../../db');

async function createUser(username, mobile, name, gender, role, password) {
    console.log("Create User");
    const result = await db.query('INSERT INTO users (username, mobile, name, gender, role, password) values($1, $2, $3, $4, $5, $6) RETURNING id'
    ,[username, mobile, name, gender, role, password]);
    return result.rows[0].id;
}

// async function getUser() {
//     const users = await db.query("SELECT * FROM users");
//     return users.rows;
// }

module.exports = {
    createUser,
    //getUser
}