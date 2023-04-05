const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    ingredients: [{
        type: String,
        required: true
    }],
    preparation: {
        type: String,
        required: true
    },
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;