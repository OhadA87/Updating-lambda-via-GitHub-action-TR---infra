import { check } from 'express-validator';
import { errorMessages, shelterFields } from '../constants/index.js';

export const updateShelterValidator = [
  check(shelterFields.NAME)
    .notEmpty()
    .withMessage(errorMessages.SHELTER_NAME_REQUIRED),
  check(shelterFields.CONTACT_INFO)
    .notEmpty()
    .withMessage(errorMessages.SHELTER_CONTACT_REQUIRED),
  check(shelterFields.IDENTIFIER_NUMBER)
    .notEmpty()
    .withMessage(errorMessages.SHELTER_IDENTIFIER_NUMBER_REQUIRED),
];
