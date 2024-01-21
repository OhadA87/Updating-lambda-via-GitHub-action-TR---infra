import { User } from '../../models/index.js';
import { check } from 'express-validator';
import { userFields, errorMessages } from '../../constants/index.js';

export const userExists = check(userFields.EMAIL).custom(async (email) => {
  const user = await User.findOne({ email: email?.toLowerCase() });
  if (!user) {
    throw new Error(errorMessages.USER_NOT_FOUND);
  }
});
