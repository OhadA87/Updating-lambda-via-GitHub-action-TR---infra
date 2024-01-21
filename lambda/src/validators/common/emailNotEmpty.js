import { check } from 'express-validator';
import { userFields, errorMessages } from '../../constants/index.js';

export const emailNotEmpty = check(userFields.EMAIL)
  .notEmpty()
  .withMessage(errorMessages.EMAIL_REQUIRED);
