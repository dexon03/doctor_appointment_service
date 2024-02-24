import express from 'express';
import { bookAppointment } from '../controllers/appointment.controller';

const router = express.Router();

router.post('/appointment/book', bookAppointment);

export default router;
