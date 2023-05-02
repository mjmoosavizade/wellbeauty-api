const express = require('express');
const router = express.Router();
const messageController = require("../controllers/supportMessages");
const checkAuth = require('../middleware/chcek-auth');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/messages');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

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

router.get(`/`, checkAuth, messageController.getAllMessages);

router.get(`/:id`, checkAuth, messageController.getOneMessage);

router.post(`/`, checkAuth, upload.single('image'), messageController.createMessage);

router.post(`/answer`, checkAuth, upload.single('image'), messageController.answerMessage);

router.delete('/:id', checkAuth, messageController.deleteMessage);

router.put('/:id', checkAuth, messageController.updateMessage);


module.exports = router;