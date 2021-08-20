const db = require('../../db');

async function createUser(username, mobile, name, gender, role, password) {
    console.log("Create User");
    const result = await db.query("INSERT INTO users(username, mobile, name, gender, role, password) RETURNING id",
    [username, mobile, name, gender, role, password]
    );
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