const express = require('express');
const { json, urlencoded } = require('body-parser');

// module import
const userModule = require('./users');

const errorHandler = require('./middlewares/error-handler.middle');
const bodyParser = require('body-parser');

const app = express();

app.use(json());
app.use(
    urlencoded({
      extended: true,
    })
);



process.on("uncaughtException", (err) => {
    console.error("[ERROR] Uncaught Exception : ", err.message);
    process.exit(1);
});


// process.on("unhandledRejection", (error) => {
//     console.error("[ERROR] From event: ", error?.toString());
//     process.exit(1);
// });


userModule.init(app);


app.use(errorHandler);


app.listen(8080, () => console.log("Server started at port 8080"));