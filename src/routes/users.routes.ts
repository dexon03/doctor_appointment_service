import express from 'express';
import { createUser, deleteUser, getUsers, updateUser } from '../controllers/user.controller';
import { createUserValidationRules, updateUserValidationRules } from '../validators/user.validators';
import { validate } from '../middlewares/validate';

const router = express.Router();

router.get('/users', getUsers);
router.post('/users', createUserValidationRules, validate, createUser);
router.put('/users', updateUserValidationRules, validate, updateUser);
router.delete('/users/:id', deleteUser);

export default router;