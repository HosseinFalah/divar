const { AuthMessage } = require("./auth.messages");
const authService = require("./auth.service");
const autoBind = require('auto-bind');

class AuthController {
    #service;

    constructor() {
        autoBind(this);
        this.#service = authService;
    }

    async sendOTP(req, res, next) {
        try {
            const { mobile } = req.body;
            await this.#service.sendOTP(mobile);
            return res.json({
                message: AuthMessage.SendOtpSuccessFully
            });
        } catch (error) {
            next(error)
        }
    }

    async checkOTP(req, res, next) {
        try {
            const { mobile, code } = req.body;
            await this.#service.checkOTP(mobile, code);
            return res.json({
                message: AuthMessage.LogingSuccessFully
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();