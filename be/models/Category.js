var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    title: String,
    image: String,
    displayOrder: Number,
    showOnHome: {
        type: Boolean,
        required: true,
        default: true
    },
    status: {
        type: String,
        required: true,
        default: "active"
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

mongoose.model('Category', CategorySchema);
