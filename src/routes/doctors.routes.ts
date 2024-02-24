import express, { Router } from 'express';
import { getDoctors, createDoctor, updateDoctor, deleteDoctor } from '../controllers/doctor.controller';
import { createDoctorValidationRules, updateDoctorValidationRules } from '../validators/doctor.validators';
import { validate } from '../middlewares/validate';

const router: Router = express.Router();

router.get('/doctor', getDoctors);
router.post('/doctor', createDoctorValidationRules, validate, createDoctor);
router.put('/doctor', updateDoctorValidationRules, validate, updateDoctor);
router.delete('/doctor/:id', deleteDoctor);

export default router;
