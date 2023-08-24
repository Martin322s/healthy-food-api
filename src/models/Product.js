const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3
    },
    type: {
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
    nutrition: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        required: true
    },
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;