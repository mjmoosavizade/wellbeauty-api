const express = require('express');
const router = express.Router();
const appointmentController = require("../controllers/appointments");
const checkAuth = require('../middleware/chcek-auth');


router.post('/chack-date', checkAuth, appointmentController.checkAppoitment);

router.get(`/my-appointments`, checkAuth, appointmentController.getMyAppointments);

router.get(`/get-unresponsed/:type`, checkAuth, appointmentController.geyUnresponsed);

router.get(`/:id`, checkAuth, appointmentController.getOneAppointment);

router.get(`/`, checkAuth, appointmentController.getAllAppointments);

router.post(`/`, checkAuth, appointmentController.makeAppoinment);

router.delete('/:id', checkAuth, appointmentController.deleteAppointment);

router.put('/:id', checkAuth, appointmentController.updateAppointment);


module.exports = router;