const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');

const { ConnectToDB } = require('./src/config/mongoose.config');
const { SwaggerConfig } = require('./src/config/swagger.config');
const mainRouter = require('./src/routes/app.routes');
const NotFoundHandler = require('./src/common/exception/not-found.handler');
const AllExceptionHandler = require('./src/common/exception/all-exception.handler');
const cookieParser = require('cookie-parser');

dotenv.config();
dotenv.config({
    path: path.join(__dirname, `.env.${process.env.NODE_ENV}`)
})

async function main() {
    const app = express();

    ConnectToDB();

    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
    
    app.use(mainRouter);

    SwaggerConfig(app);
    
    // handle route notfound error
    NotFoundHandler(app);
    AllExceptionHandler(app);
    app.listen(process.env.PORT || 3000, () => {
        console.log(`server is running in port ${process.env.PORT} base-url: http://localhost:${process.env.PORT}`);
    })
}

main();