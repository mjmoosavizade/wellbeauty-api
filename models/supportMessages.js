const mongoose = require('mongoose');

const SupportMessagesSchema = mongoose.Schema({
    message: { type: String, required: true },
    image: String,
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    replier: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: Date.now }
});


exports.SupportMessages = mongoose.model('SupportMessages', SupportMessagesSchema);

