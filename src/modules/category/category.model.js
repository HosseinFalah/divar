const { Schema, Types, model } = require("mongoose");

const CategorySchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, index: false },
    icon: { type: String, required: true },
    parent: { type: Types.ObjectId, ref: 'Category', required: false },
    parents: { type: [Types.ObjectId], required: false, default: [] }
}, { toJSON: { virtuals: true }, versionKey: false, id: false });

CategorySchema.virtual("children", {
    ref: "Category",
    localField: "_id",
    foreignField: "parent"
});

function autoPopulate(next) {
    this.populate([{ path: 'children'}]);
    next();
}

CategorySchema.pre('find', autoPopulate).pre('findOne', autoPopulate); 

const CategoryModel = model('Category', CategorySchema);

module.exports = CategoryModel;