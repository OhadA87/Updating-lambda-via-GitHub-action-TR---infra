import { check } from 'express-validator';
import { errorMessages, shelterFields } from '../constants/index.js';
import {
  isEmail,
  emailNotEmpty,
  passwordNotEmpty,
  duplicateUser,
} from './common/index.js';

export const newShelterValidator = [
  emailNotEmpty,
  passwordNotEmpty,
  isEmail,
  duplicateUser,
  check(shelterFields.NAME)
    .notEmpty()
    .withMessage(errorMessages.SHELTER_NAME_REQUIRED),
  check(shelterFields.CONTACT_INFO)
    .notEmpty()
    .withMessage(errorMessages.SHELTER_CONTACT_REQUIRED),
];
