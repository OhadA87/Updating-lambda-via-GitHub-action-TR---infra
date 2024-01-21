import { check } from 'express-validator';
import { errorMessages, branchFields } from '../constants/index.js';

const common = [
  check(branchFields.LOCATION)
    .notEmpty()
    .withMessage(errorMessages.branch_LOCATION_REQUIRED),
  check(branchFields.CONTACT_NAME)
    .notEmpty()
    .withMessage(errorMessages.branch_CONTACT_NAME_REQUIRED),
  check(branchFields.CONTACT_INFO)
    .notEmpty()
    .withMessage(errorMessages.branch_CONTACT_INFO_REQUIRED),
];

export const createBranchValidator = [
  check(branchFields.SHELTER_ID)
    .notEmpty()
    .withMessage(errorMessages.branch_SHELTER_ID_REQUIRED),
  ...common,
];

export const updateBranchValidator = common;
