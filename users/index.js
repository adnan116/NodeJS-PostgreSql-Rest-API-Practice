const userRouter = require('./routes/user.route');


function init(app) {
    app.use('/', userRouter);
}

module.exports = {
    init
}