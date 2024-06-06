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

    async checkOTP() {
        try {
            
        } catch (error) {
            
        }
    }
}

module.exports = new AuthController();