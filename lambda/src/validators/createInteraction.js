import { check } from 'express-validator';
import { errorMessages, interactionFields } from '../constants/index.js';

export const createInteractionValidator = [
  check(interactionFields.INTERACTION_TYPE)
    .notEmpty()
    .withMessage(errorMessages.INTERACTION_TYPE_REQUIRED),
  check(interactionFields.USER_ID)
    .notEmpty()
    .withMessage(errorMessages.INTERACTION_USER_ID_REQUIRED),
  check(interactionFields.ANIMAL_ID)
    .notEmpty()
    .withMessage(errorMessages.INTERACTION_ANIMAL_ID_REQUIRED),
];
