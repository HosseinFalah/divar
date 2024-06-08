const autoBind = require('auto-bind');

const { AuthMessage } = require("./auth.messages");
const authService = require("./auth.service");
const { Node_Env } = require('../../common/constants/env.enum');
const CookieNames = require('../../common/constants/cookie.enum');

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
            const token = await this.#service.checkOTP(mobile, code);
            return res.cookie(CookieNames.AccessToken, token, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === Node_Env.Production
            }).status(200).json({ message: AuthMessage.LogingSuccessFully, token })
        } catch (error) {
            next(error);
        }
    }

    async logOut(req, res, next) {
        try {
            return res.clearCookie(CookieNames.AccessToken).status(200).json({
                message: AuthMessage.LogoutSuccessFully
            })
        } catch (error) {
            next(error);
        }   
    }
}

module.exports = new AuthController();