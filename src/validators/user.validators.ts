import { body } from "express-validator";

export const createUserValidationRules = [
    body('phone').isMobilePhone('uk-UA').withMessage('Invalid phone number'),
    body('name').notEmpty().withMessage('Name is required'),
];

export const updateUserValidationRules = [
    body('id').notEmpty().withMessage('Id is required'),
    body('phone').isMobilePhone('uk-UA').withMessage('Invalid phone number'),
    body('name').notEmpty().withMessage('Name is required'),
];

