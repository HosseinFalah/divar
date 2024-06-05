const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

const { ConnectToDB } = require('./src/config/mongoose.config');
const { SwaggerConfig } = require('./src/config/swagger.config');
const mainRouter = require('./src/routes/app.routes');
const NotFoundHandler = require('./src/common/exception/not-found.handler');

dotenv.config();
dotenv.config({
    path: path.join(__dirname, `.env.${process.env.NODE_ENV}`)
})

async function main() {
    const app = express();

    ConnectToDB();

    SwaggerConfig(app);
    app.use(mainRouter);
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    // handle route notfound error
    NotFoundHandler(app);
    
    app.listen(process.env.PORT || 3000, () => {
        console.log(`server is running in port ${process.env.PORT} base-url: http://localhost:${process.env.PORT}`);
    })
}

main();