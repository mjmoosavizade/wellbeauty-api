const mongoose = require('mongoose');

const authorType = ['customer', 'responder']

const TicketSchema = new mongoose.Schema({
    status: {type: Boolean, default: true},
    customer: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    responder: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date_created: {type: Date, default: Date.now}
});

const TicketConvoSchema = new  mongoose.Schema({
    ticketId: {type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true},
    message: {type: String,},
    media: {type: String,},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    authorType: {type: String, enum: authorType, required: true},
    date_created: {type: Date, default: Date.now}
});

TicketSchema.virtual('messages', {
    ref: 'TicketConvo',
    localField: '_id',
    foreignField: 'ticketId'
});

exports.Ticket = mongoose.model('Ticket', TicketSchema);
exports.TicketConvo = mongoose.model('TicketConvo', TicketConvoSchema);