import { check } from 'express-validator';
import { userFields, errorMessages } from '../constants/index.js';
import { isEmail, duplicateUser } from './common/index.js';

export const registerValidator = [
  isEmail,
  check(userFields.PASSWORD)
    .isLength({ min: 6 })
    .withMessage(errorMessages.PASSWORD_TOO_SHORT),
  check(userFields.AGE)
    .isInt({ min: 13, max: 120 })
    .withMessage(errorMessages.INVALID_AGE),
  check(userFields.FIRST_NAME)
    .notEmpty()
    .withMessage(errorMessages.FIRST_NAME_REQUIRED),
  check(userFields.LAST_NAME)
    .notEmpty()
    .withMessage(errorMessages.LAST_NAME_REQUIRED),
  duplicateUser,
];
