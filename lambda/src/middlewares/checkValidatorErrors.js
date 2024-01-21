import { validationResult } from 'express-validator';

const checkValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

// That's a Shortcut function: Spread this function to use it as a middleWare ...checkValidation(fields)
// You cannot use it with validator function, in that case, use the checkValidationError instead.
export const checkValidation = (validators = []) => {
  return [validators, checkValidationErrors];
};
