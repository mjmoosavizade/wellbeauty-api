const express = require('express');
const router = express.Router();
const multer = require("multer");
const ticketController = require('../controllers/tickets');
const checkAuth = require('../middleware/chcek-auth');




const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
});

router.get('/', checkAuth, ticketController.getAllTickets);

router.get('/:id', checkAuth, ticketController.getOneTickets);

router.post('/', checkAuth, ticketController.createTicket);

router.patch('/:id', checkAuth, ticketController.updateTicket);

router.post('/message', checkAuth, upload.single('image') ,ticketController.sendMessage);

module.exports = router;