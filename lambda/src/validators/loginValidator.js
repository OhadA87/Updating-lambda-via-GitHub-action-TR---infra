import { isEmail, emailNotEmpty, passwordNotEmpty } from './common/index.js';

export const loginValidator = [
  emailNotEmpty,
  passwordNotEmpty,
  // Include this check on PROD:
  // isEmail,
];
