const {Ticket, TicketConvo} = require('../models/tickets');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.getAllTickets = (req, res) => {
    Ticket.find().populate({path: "TicketConvo", populate: "ticketId"}).then(result => {
        if (result.length >= 1) {
            return res.status(200).json({success: true, data: result});
        } else {
            return res.status(404).json({success: false, message: "No tickets"});
        }
    }).catch(err => {
        return res.status(500).json({success: false, message: "Error getting tickets", error: err});
    });
};

exports.getOneTickets = (req, res) => {
    Ticket.findOne({_id: req.params.id}).then(ticket => {
        if (ticket) {
            TicketConvo.find({ticketId: req.params.id}).exec().then(convo => {
                console.log(convo);
                return res.status(200).json({
                    success: true,
                    data: convo
                });
            }).catch(err => {
                return res.status(500).json({success: false, message: "Error getting tickets", error: err});
            })
        } else {
            return res.status(404).json({success: false, message: "No tickets"});
        }
    }).catch(err => {
        return res.status(500).json({success: false, message: "Error getting tickets", error: err});
    });
};

exports.createTicket = (req, res) => {
    Ticket.find({lastname: req.userData.userId}).then(result => {
        if (result >= 1) {
            return res.status(200).json({
                success: true,
                data: result
            })
        } else {
            const createObj = {};
            for (const [objKey, value] of Object.entries(req.body)) {
                createObj[objKey] = value;
            }
            const ticket = new Ticket({
                customer: req.userData.userId,
            });
            ticket.save().then(result => {
                res.status(201).json({success: true, data: result})
            }).catch(err => {
                res.status(500).json({success: 'false', message: "Error creating a ticket", error: err})
            })
        }
    }).catch(err => {
        return res.status(500).json({success: false, message: "Error getting tickets", error: err});
    })

};


exports.sendMessage = (req, res) => {
    let authorType = "";
    Ticket.findById(req.body.ticketId).exec().then(async result => {
        if (result) {
            console.log(result)
            console.log(req.body.author)
            const imageName = Date.now() + '.jpg';
            if (result['customer'] === req.body.author) {
                const ticketConvo = new TicketConvo({
                    ticketId: req.body.ticketId,
                    message: req.body.message,
                    author: req.body.author,
                    authorType: 'customer',
                });

                ticketConvo.save().then(result => {
                    res.status(201).json({success: true, data: result})
                }).catch(err => {
                    res.status(500).json({success: false, message: err})
                })
            } else {
                const ticketConvo = new TicketConvo({
                    ticketId: req.body.ticketId,
                    message: req.body.message,
                    author: req.body.author,
                    authorType: 'responder',
                });

                ticketConvo.save().then(result => {
                    res.status(201).json({success: true, data: result})
                }).catch(err => {
                    res.status(500).json({success: false, message: err})
                })
            }
        } else {
            res.status(500).json({success: false, message: "Message send failed"})
        }
    })
        .catch(err => {
            res.status(500).json({success: false, message: "Message send failed"})
        });

};

exports.updateTicket = (req, res) => {
    const updateOps = {};
    for (const [objKey, value] of Object.entries(req.body)) {
        updateOps[objKey] = value;
    }
    Ticket.updateOne({_id: req.params.id}, {$set: updateOps}, {new: true})
        .exec()
        .then((doc) => {
            res.status(200).json({success: true, data: doc});
        })
        .catch((err) => {
            res.status(500).json({success: false, message: "error updating the ticket", error: err});
        });
};

exports.deleteTicket = (req, res) => {
    Ticket.deleteOne({_id: req.params.id})
        .exec()
        .then(ticket => {
            if (ticket) {
                res.status(202).json({success: true, message: 'Ticket deleted successfuly '})
            } else {
                res.status(404).json({success: false, message: 'Ticket id incorect'})
            }
        })
        .catch(err => {
            res.status(500).json({success: true, message: 'Error deleting ticket', error: err})
        });
};