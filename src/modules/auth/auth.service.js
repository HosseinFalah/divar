const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const crypto = require('crypto');
const userModel = require("../user/user.model");
const { AuthMessage } = require("./auth.messages");

class AuthService {
    #model;

    constructor() {
        autoBind(this);
        this.#model = userModel;
    };

    async sendOTP(mobile) {
        const user = this.#model.findOne({ mobile });
        const now = new Date().getTime();
        const otp = {
            code: crypto.randomInt(10000, 99999),
            expiresIn: now + (1000*60*2)
        };
        if (!user) {
            const newUser = await this.#model.create({ mobile, otp });
            return newUser;
        }
        if (user.otp && user.otp.expiresIn > now) {
            throw new createHttpError.BadRequest(AuthMessage.OtpCodeNotExpired)
        }

        user.otp = otp;
        await user.save();
        return user;
    }

    async checkOTP(mobile, code) {

    }

    async checkExistByMobile(mobile) {
        const user = this.#model.findOne({ mobile });
        if(!user) throw new createHttpError.NotFound(AuthMessage.NotFound);
        return user;
    }
}

module.exports = new AuthService();