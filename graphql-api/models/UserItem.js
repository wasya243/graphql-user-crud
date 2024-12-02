const mongoose = require('mongoose');

const UserItemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    itemName: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
});

module.exports = mongoose.model('UserItem', UserItemSchema);