const db = require('../../db');

async function uniqueCheckCreate(colName, value) {
    try{
        await db.query('BEGIN');
        const queryText = 'select count(username) as flag from users where '+colName+' = $1';
        console.log(queryText);
        const result = await db.query(queryText, [value]);
        await db.query('COMMIT');
        return result.rows[0].flag;
    }catch (err) {
        await db.query('ROLLBACK');
        throw err;
     }
 }

 async function uniqueCheckUpdate(colName, value, id) {
    try{
        await db.query('BEGIN');
        const queryText = 'select count(username) as flag from users where '+colName+' = $1 and id != $2';
        console.log(queryText);
        const result = await db.query(queryText, [value, id]);
        await db.query('COMMIT');
        return result.rows[0].flag;
    }catch (err) {
        await db.query('ROLLBACK');
        throw err;
     }
 }

async function createUser(username, mobile, name, gender, role, password, data, mimeType) {
    try{
        await db.query('BEGIN')
        const queryText = 'INSERT INTO users (username, mobile, name, gender, role, password) values($1, $2, $3, $4, $5, $6) RETURNING id';
        const result = await db.query(queryText, [username, mobile, name, gender, role, password]);
        const insertimageData = 'INSERT INTO users_image(id, data, mimeType) values($1, $2, $3)';
        await db.query(insertimageData, [result.rows[0].id, data, mimeType]);
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
    const queryText = 'select users.id, username, mobile, name, gender, role from users order by id';
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
        const queryText = 'select users.id, username, mobile, name, gender, role, data, mimeType from users left join users_image on users.id = users_image.id where users.id = $1';
        console.log("inside id");
        const result = await db.query(queryText, [id]);
        await db.query('COMMIT');
        return result.rows;
    }catch (err) {
        await db.query('ROLLBACK');
        throw err;
    }
}

async function updateUser(username, mobile, name, gender, role, password, data, mimeType, id) {
    try{
        await db.query('BEGIN')
        console.log("Update User");
        const queryText = 'Update users SET username = $1, mobile = $2, name = $3, gender = $4, role = $5, password = $6 WHERE id = $7';
        await db.query(queryText, [username, mobile, name, gender, role, password, id]);
        const queryText2 = 'Update users_image SET data = $1, mimeType = $2 WHERE id = $3';
        await db.query(queryText2, [data, mimeType, id]);
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

async function getTotalUser() {
    try{
        await db.query('BEGIN');
        const queryText = 'select count(username) as total from users';
        const result = await db.query(queryText);
        await db.query('COMMIT');
        return result.rows[0].total;
    }catch (err) {
        await db.query('ROLLBACK');
        throw err;
     }
 }

async function getUsersByPagination(itemsPerPage, page) {
    try{
        await db.query('BEGIN');
        const queryText = 'SELECT id, username, mobile, name, gender, role FROM users ORDER BY id LIMIT '+itemsPerPage+' OFFSET('+page+' - 1) * '+itemsPerPage;
        console.log("inside pagination");
        const result = await db.query(queryText);
        await db.query('COMMIT');
        return result.rows;
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
    deleteUser,
    uniqueCheckCreate,
    uniqueCheckUpdate,
    getUsersByPagination,
    getTotalUser
}