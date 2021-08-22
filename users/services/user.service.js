const db = require('../../db');

async function createUser(username, mobile, name, gender, role, password) {
    console.log("Create User");
    const result = await db.query('INSERT INTO users (username, mobile, name, gender, role, password) values($1, $2, $3, $4, $5, $6) RETURNING id'
    ,[username, mobile, name, gender, role, password]);
    return result.rows[0].id;
}

async function getUser() {
    const users = await db.query("SELECT * FROM users");
    return users.rows;
}

async function getUserWithId(id) {
    console.log("inside id");
    const users = await db.query("SELECT * FROM users where id = $1",[id]);
    return users.rows;
}

async function updateUser(username, mobile, name, gender, role, password, id) {
    console.log("Update User");
    await db.query('Update users SET username = $1, mobile = $2, name = $3, gender = $4, role = $5, password = $6 WHERE id = $7 RETURNING id'
    ,[username, mobile, name, gender, role, password, id]);
    console.log("done");
}

module.exports = {
    createUser,
    getUser,
    getUserWithId,
    updateUser
}