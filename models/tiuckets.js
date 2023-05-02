const mongoose = require('mongoose');


const ticketSchema = new mongoose.Schema({

    date:{
        type: Date,
        default: Date.now
    },
    department:{
        type: String,
        require: false,
    },
    priority:{
        type: String,
        require: false
    },
    title:{
        type: String,
        required: false
    },
    message:{
        type: String,
        required: true
    },
    ticketType: {
        type: String,
        required: false
    },
    image:{
        type: String
    },
    answers:{
        type: [String]
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }

});




exports.Ticket = mongoose.model('Ticket', ticketSchema);
exports.ticketSchema = ticketSchema;