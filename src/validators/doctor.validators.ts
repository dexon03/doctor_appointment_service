import { body } from "express-validator";

export const createDoctorValidationRules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('spec').notEmpty().withMessage('Specialization is required'),
];

export const updateDoctorValidationRules = [
    body('id').notEmpty().withMessage('Id is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('spec').notEmpty().withMessage('Specialization is required'),
];