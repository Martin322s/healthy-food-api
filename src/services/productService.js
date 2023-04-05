const Product = require('../models/Product');

exports.createProduct = async (data) => {
    const recipe = await Product.create(data);
    return recipe;
};
exports.getAll = async () => await Product.find();
exports.getOne = async (productId) => await Product.findById({ _id: productId });
exports.getMyProducts = async (ownerId) => await Product.find().where({ _ownerId: ownerId });
exports.editProduct = async (productId, data) => 
    await Product.findByIdAndUpdate({ _id: productId }, data);
exports.deleteProduct = async (productId) => await Product.findByIdAndDelete({ _id: productId });