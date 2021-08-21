const { body, check } = require('express-validator');

const createUserSchema = [
    body('username', "Invalid username")
        .isLength({min: 3, max: 20})
    ,
    body('mobile', "Invalid Mobile No")
        .matches(/^\+(?:[0-9]●?){6,14}[0-9]$/)
    ,
    body('password', "Invalid Password")
        .isLength({min: 8})
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
]


module.exports = {
    createUserSchema
}