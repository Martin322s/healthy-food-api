const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true 
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "The password must be at least 6 characters!"]
    },
    savedRecipes: [{
        type: mongoose.Types.ObjectId,
        ref: 'Recipe'
    }],
    secretWord: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;