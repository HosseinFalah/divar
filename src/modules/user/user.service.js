const autoBind = require("auto-bind");
const userModel = require("./user.model");

class UserService {
    #model;

    constructor () {
        autoBind(this);
        this.#model = userModel;
    }
}

module.exports = new UserService();