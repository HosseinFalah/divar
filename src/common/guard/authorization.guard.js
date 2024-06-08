const createHttpError = require("http-errors");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const AuthorizationMessage = require("../messages/auth.message");
const userModel = require("../../modules/user/user.model");

const Authorization = async (req, res, next) => {
    try {
        const token = req?.cookies?.access_token;
        console.log(token);
        if (!token) throw new createHttpError.Unauthorized(AuthorizationMessage.Login);
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(data);
        if (typeof data === "object" && "id" in data) {
            const user = await userModel.findById(data.id, { accessToken: 0, otp: 0, __v: 0, updatedAt: 0, verifiedMobile: 0 }).lean();
            if (!user) throw new createHttpError.Unauthorized(AuthorizationMessage.NotFoundAccount);
            req.user = user;
            return next();
        }
        throw new createHttpError.Unauthorized(AuthorizationMessage.InvalidToken);
    } catch (error) {
        next(error);
    }
}

module.exports = Authorization;