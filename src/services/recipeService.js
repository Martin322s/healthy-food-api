const Recipe = require('../models/Recipe');

exports.createRecipe = async (data) => {
    const recipe = await Recipe.create(data);
    return recipe;
};
exports.getAll = async () => await Recipe.find();
exports.getOne = async (recipeId) => await Recipe.findById({ _id: recipeId });
exports.getMyRecipes = async (ownerId) => await Recipe.find().where({ _ownerId: ownerId });
exports.editRecipe = async (recipeId, data) => await Recipe.findByIdAndUpdate({ _id: recipeId }, data);
exports.deleteRecipe = async (recipeId) => await Recipe.findByIdAndDelete({ _id: recipeId });