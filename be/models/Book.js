var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    title: String,
    image: String,
    price: {
        type:String,
        default: "0"
    },
    showOnHome: {
        type:Boolean,
        required: true,
        default: true
    },
    status: {
        type:String,
        required: true,
        default: "active"
    },
    quantity: {
        type:Number,
        default: 0
    },
    rate:Number,
    comment: String,
    createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bookList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
}, { timestamps: true });


mongoose.model('Book', BookSchema);
