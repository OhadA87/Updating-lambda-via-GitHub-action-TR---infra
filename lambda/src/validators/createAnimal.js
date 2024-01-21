import { check, body } from 'express-validator';
import { errorMessages, animalFields } from '../constants/index.js';

const creatorIdValidator = [
  check(animalFields.USER_ID).optional(),
  check(animalFields.BRANCH_ID).optional(),
  check(animalFields.SHELTER_ID).optional(),
  body().custom((_, { req }) => {
    if (
      !req.body[animalFields.USER_ID] &&
      !req.body[animalFields.BRANCH_ID] &&
      !req.body[animalFields.SHELTER_ID]
    ) {
      throw new Error(errorMessages.ANIMAL_CREATOR_ID_REQUIRED);
    }
    return true;
  }),
];

export const createAnimalValidator = [...creatorIdValidator];
