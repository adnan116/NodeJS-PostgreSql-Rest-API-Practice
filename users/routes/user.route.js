const express = require('express');
const userService = require('../services/user.service');
const userValidators = require('../validators/user.validator');
const { validationResult, body } = require('express-validator');
const { validates } = require('../middlewares/validation.middle');



const router = express.Router();


router.get('/user/list', async (req, res) => {
    const users = await userService.getUser();
    return res.status(200).json({
        message: "Request Successful",
        data: users
    })
});

router.post('/user/create',
    [...userValidators.createUserSchema, validates],
    async (req, res) => {
        console.log("Create User API")
        const { username, mobile, name, gender, role, password } = req.body;
        const newIUserId = await userService.createUser(username, mobile, name, gender, role, password);
        return res.status(201).json({
            id: newIUserId
        })
    }
);

module.exports = router;