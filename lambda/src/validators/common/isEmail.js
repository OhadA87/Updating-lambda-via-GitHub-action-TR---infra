import { check } from 'express-validator';
import { userFields, errorMessages } from '../../constants/index.js';

export const isEmail = check(userFields.EMAIL)
  .isEmail()
  .withMessage(errorMessages.INVALID_EMAIL_FORMAT);
