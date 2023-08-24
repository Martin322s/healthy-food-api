const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
        minLength: 3
    },
    category: {
        type: String,
        required: true,
        minLength: 3
    },
    imageUrl: {
        type: String,
        required: true,
        validate: function() {
            return this.imageUrl.startsWith('https://');
        }
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