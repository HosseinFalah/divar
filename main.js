const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { ConnectToDB } = require('./src/config/mongoose.config');
const { SwaggerConfig } = require('./src/config/swagger.config');
dotenv.config();
dotenv.config({
    path: path.join(__dirname, `.env.${process.env.NODE_ENV}`)
})

async function main() {
    const app = express();

    ConnectToDB();

    SwaggerConfig(app);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.listen(process.env.PORT || 3000, () => {
        console.log(`server is running in port ${process.env.PORT} base-url: http://localhost:${process.env.PORT}`);
    })
}

main();