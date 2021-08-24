const db = require('../../db');

async function createUser(username, mobile, name, gender, role, password, data, mimeType) {
    try{
        await db.query('BEGIN')
        const queryText = 'INSERT INTO users (username, mobile, name, gender, role, password) values($1, $2, $3, $4, $5, $6) RETURNING id';
        const result = await db.query(queryText, [username, mobile, name, gender, role, password]);
        const insertimageData = 'INSERT INTO users_image(id, "data", "mimeType") values($1, $2, $3)';
        const insertImageValues = [result.rows[0].id, data, mimeType ];
        await db.query(insertimageData, insertImageValues);
        await db.query('COMMIT');
        return result.rows[0].id;
    }catch (err) {
        await db.query('ROLLBACK');
        throw err;
    }
}


async function getUser() {
   try{
    await db.query('BEGIN');
    const queryText = 'select users.id, username, mobile, name, gender, role, data, "mimeType" from users left join users_image on users.id = users_image.id order by users.id';
    const result = await db.query(queryText);
    await db.query('COMMIT');
    return result.rows;
   }catch (err) {
       await db.query('ROLLBACK');
       throw err;
    }
}

async function getUserWithId(id) {
    try{
        await db.query('BEGIN');
        const queryText = 'select users.id, username, mobile, name, gender, role, data, "mimeType" from users left join users_image on users.id = users_image.id where users.id = $1';
        console.log("inside id");
        const result = await db.query(queryText, [id]);
        await db.query('COMMIT');
        return result.rows;
    }catch (err) {
        await db.query('ROLLBACK');
        throw err;
    }
}

async function updateUser(username, mobile, name, gender, role, password, id) {
    try{
        await db.query('BEGIN')
        console.log("Update User");
        const queryText = 'Update users SET username = $1, mobile = $2, name = $3, gender = $4, role = $5, password = $6 WHERE id = $7';
        await db.query(queryText, [username, mobile, name, gender, role, password, id]);
        await db.query('COMMIT');
        console.log("update done");
    }catch (err) {
        await db.query('ROLLBACK');
        throw err;
    }
}

async function deleteUser(id) {
    try{
        console.log("Delete User");
        await db.query('BEGIN');
        const queryText1 = 'DELETE FROM users WHERE id = $1';
        const queryText2 = 'DELETE FROM users_image WHERE id = $1';
        console.log("inside delete");
        await db.query(queryText2, [id]);
        await db.query(queryText1, [id]);
        await db.query('COMMIT');
        console.log("delete done");
    }catch (err) {
        await db.query('ROLLBACK');
        throw err;
    }
}

module.exports = {
    createUser,
    getUser,
    getUserWithId,
    updateUser,
    deleteUser
}