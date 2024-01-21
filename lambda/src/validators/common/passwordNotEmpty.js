import { check } from 'express-validator';
import { userFields, errorMessages } from '../../constants/index.js';

export const passwordNotEmpty = check(userFields.PASSWORD)
  .notEmpty()
  .withMessage(errorMessages.PASSWORD_REQUIRED);
