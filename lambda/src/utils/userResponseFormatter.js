import { userFields } from '../constants/index.js';

export const userResponseFormatter = (user) => {
  user = {
    ...user._doc,
    [userFields.PASSWORD]: undefined,
    [userFields.EMAIL_CONFIRMATION_CODE]: undefined,
  };
  return user;
};
