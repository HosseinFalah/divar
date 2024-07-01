const autoBind = require("auto-bind");
const httpCodes = require('http-codes');
const categoryService = require("./category.service");
const CategoryMessage = require("./category.message");

class CategoryController {
    #service;

    constructor() {
        autoBind(this);
        this.#service = categoryService;
    };

    async create(req, res) {
        try {
            const { name, icon, slug, parent } = req.body;
            await this.#service.create({ name, icon, slug, parent });
            return res.status(httpCodes.CREATED).json({ message: CategoryMessage.Created });
        } catch (error) {
            next(error)
        }
    };

    async find(req, res, next) {
        try {
            const categories = await this.#service.find();
            return res.json(categories);
        } catch (error) {
            next(error)
        }
    };

    async remove(req, res, next) {
        try {
            const { id } = req.params;
            await this.#service.remove(id);
            return res.status(httpCodes.OK).json({ message: CategoryMessage.Deleted });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CategoryController();