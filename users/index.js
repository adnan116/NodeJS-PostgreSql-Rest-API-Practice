const userRouter = require('./routes/user.route');


function init(app) {
    app.use('/user/create', userRouter);
}

module.exports = {
    init
}