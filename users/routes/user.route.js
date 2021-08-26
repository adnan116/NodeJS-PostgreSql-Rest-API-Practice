const express = require('express');
const userService = require('../services/user.service');
const userValidators = require('../validators/user.validator');
const { validationResult, body } = require('express-validator');
const { validates } = require('../middlewares/validation.middle');
const bcrypt = require("bcryptjs");



const router = express.Router();


router.post('/user/create',
    [...userValidators.createUserSchema, validates],
    async (req, res) => {
        console.log("Create User API")
        const { username, mobile, name, gender, role, password, data, mimeType } = req.body;
        console.log(await userService.uniqueCheckCreate('username', username));
        var uniqueUsername = await userService.uniqueCheckCreate('username', username);
        var uniqueMobile = await userService.uniqueCheckCreate('mobile', mobile);
        if(uniqueUsername > 0){
            const err = new Error('Username is not unique. It already exists');
            return res.status(400).json({
                message: err.message
            })
        }else if(uniqueMobile > 0){
            const err = new Error('Mobile number is not unique. It already exists');
            return res.status(400).json({
                message: err.message
            })
        }else{
            const salt = await bcrypt.genSalt(10);
            var hashPassword = await bcrypt.hash(password, salt);
            const newUserId = await userService.createUser(username, mobile, name, gender, role, hashPassword, data, mimeType);
            return res.status(201).json({
                id: newUserId,
                message: "User Created"
            })
        }
    }
);

router.get('/user/list', async (req, res) => {
    const users = await userService.getUser();
    return res.status(200).json({
        message: "Request Successful",
        data: users
    })
});

router.get('/user/:id', async (req, res) => {
    var id = req.params.id;
    console.log(id);
    const users = await userService.getUserWithId(id);
    return res.status(200).json({
        message: "Request Successful",
        data: users
    })
});

router.put('/user/update/:id',
    [...userValidators.createUserSchema, validates],
    async (req, res) => {
        console.log("Update User API");
        var id = req.params.id;
        console.log(id);
        const { username, mobile, name, gender, role, password , data, mimeType} = req.body;
        var uniqueUsername = await userService.uniqueCheckUpdate('username', username, id);
        var uniqueMobile = await userService.uniqueCheckUpdate('mobile', mobile, id);
        if(uniqueUsername > 0){
            const err = new Error('Username is not unique. It already exists');
            return res.status(400).json({
                message: err.message
            })
        }else if(uniqueMobile > 0){
            const err = new Error('Mobile number is not unique. It already exists');
            return res.status(400).json({
                message: err.message
            })
        }else{
            const salt = await bcrypt.genSalt(10);
            var hashPassword = await bcrypt.hash(password, salt);
            await userService.updateUser(username, mobile, name, gender, role, hashPassword, data, mimeType, id);
            return res.status(201).json({
                id: id,
                message: "Updated Successfully"
            })
        }         
    }
);

router.delete('/user/delete/:id',
    async (req, res) => {
        console.log("Delete User API");
        var id = req.params.id;
        console.log(id);
        await userService.deleteUser(id);
        return res.status(201).json({
            id: id,
            message: "Delete Successfully"
        })
    }
);

router.get('/user/list/pagination', async (req, res) => {
    var limit = req.query.limit;
    var pageno = req.query.pageno;
    console.log(limit);
    console.log(pageno);
    const users = await userService.getUsersByPagination(limit, pageno);
    const totalUsers = await userService.getTotalUser();
    const totalPages = Math.ceil(totalUsers/limit);
    return res.status(200).json({
        message: "Request Successful",
        limit: limit,
        totalPages: totalPages,
        currentPage: pageno,
        totalLogs: totalUsers,
        data: users
    })
});

module.exports = router;