const autoBind = require("auto-bind");
const HttpCode = require('http-codes')
const optionService = require("./option.service");
const { OptionMessage } = require("./option.message");

class OptionController {
    #service;

    constructor() {
        autoBind(this);
        this.#service = optionService;
    }

    async create(req, res) {
        try {
            const { title, key, type, enum: list, guid, category } = req.body;
            await this.#service.create({ title, key, type, enum: list, guid, category });
            return res.status(HttpCode.CREATED).json({ message: OptionMessage.Created });
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async findByCategoryId (req, res, next) {
        try {
            const { categoryId } = req.params;
            const options = await this.#service.findByCategoryId(categoryId);
            return res.status(HttpCode.OK).json(options);
        } catch (error) {
            next(error)
        }
    }

    async findByCategorySlug (req, res, next) {
        try {
            const { slug } = req.params;
            const options = await this.#service.findByCategorySlug(slug);
            return res.status(HttpCode.OK).json(options);
        } catch (error) {
            next(error)
        }
    }

    async findById (req, res, next) {
        try {
            const { id } = req.params;
            const option = await this.#service.findById(id);
            return res.status(HttpCode.OK).json(option);
        } catch (error) {
            next(error)
        }
    }

    async find(req, res, next) {
        try {
            const options = await this.#service.find();
            return res.status(HttpCode.OK).json(options);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new OptionController();