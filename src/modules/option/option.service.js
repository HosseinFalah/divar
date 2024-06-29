const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const { default: slugify } = require("slugify");

const OptionModel = require("./option.model");
const { OptionMessage } = require("./option.message");

class OptionService {
    #model;

    constructor() {
        autoBind(this);
        this.#model = OptionModel;
    };

    async find() {
        const option = await this.#model.find({}, {__v: 0}, { sort: { _id: -1 }}).populate([{ path: "category", select: { name: 1, slug: 1 }}]);
        return option;
    };

    async findById(id) {
        return await this.checkExistById(id);
    };

    async findByCategoryId(category) {
        return await this.#model.find({ category }, { __v: 0 }).populate([{ path: "category", select: { name: 1, slug: 1 }}]);;
    };

    async findByCategorySlug (slug) {
        const options = this.#model.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            },
            {
                $addFields: {
                    categorySlug: "$category.slug",
                    categoryName: "$category.name",
                    categoryIcon: "$category.icon",
                }
            },
            {
                $project: {
                    category: 0,
                    __v: 0
                }
            },
            {
                $match: {
                    categorySlug: slug
                }
            }
        ]);

        return options;
    };

    async removeById (id) {
        await this.checkExistById(id);
        return await this.#model.deleteOne({ _id: id });
    };

    async create(optionDto) {
        const category = await this.checkExistById(optionDto?.category);
        optionDto.category = category._id;
        optionDto.key = slugify(optionDto.key, { trim: true, replacement: '_', lower: true });
        await this.alreadyExistByCategoryAndKey(optionDto?.key, optionDto?.category);
        if (optionDto?.enum && typeof optionDto?.enum === "string") {
            optionDto.enum = optionDto.enum.split(",");
        } else if (Array.isArray(optionDto?.enum)) optionDto.enum = [];
        const option = await this.#model.create(optionDto);
        return option;
    };

    async checkExistById(id) {
        const option = await this.#model.findById(id);
        if (!option) throw new createHttpError.NotFound(OptionMessage.NotFound);
        return option;
    };

    async alreadyExistByCategoryAndKey(key, category) {
        const isExist = await this.#model.findOne({ category, key });
        if (isExist) throw new createHttpError.Conflict(OptionMessage.AlreadyExist);
        return null;
    };
}

module.exports = new OptionService();