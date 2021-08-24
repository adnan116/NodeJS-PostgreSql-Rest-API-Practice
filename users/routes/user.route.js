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
        const salt = await bcrypt.genSalt(10);
        var hashPassword = await bcrypt.hash(password, salt);
        const newIUserId = await userService.createUser(username, mobile, name, gender, role, hashPassword, data, mimeType);
        return res.status(201).json({
            id: newIUserId
        })
    }
);

router.get('/user/list', async (req, res) => {
    const users = await userService.getUser();
    return res.status(200).json({
        message: "Request Successful",
        data: users
    })
});

router.post('/user/:id', async (req, res) => {
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
        const { username, mobile, name, gender, role, password } = req.body;
        await userService.updateUser(username, mobile, name, gender, role, password, id);
        return res.status(201).json({
            id: id,
            message: "Updated Successfully"
        })
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

module.exports = router;