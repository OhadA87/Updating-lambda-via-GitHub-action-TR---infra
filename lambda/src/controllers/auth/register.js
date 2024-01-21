import bcrypt from 'bcryptjs';
import User from '../../models/user.js';
import {
  generateNewTokens,
  sendEmailConfirmationCode,
  userResponseFormatter,
} from '../../utils/index.js';
import { userFields } from '../../constants/index.js';

const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email: reqEmail,
      password,
      age,
      location,
      platform,
    } = req.body;

    const email = reqEmail?.toLowerCase().trim();
    const encryptedPassword = await bcrypt.hash(password, 10);
    const emailConfirmationCode = await sendEmailConfirmationCode(email);
    // @TODO: check if user is active or unActive

    const createdUser = await User.create({
      [userFields.FIRST_NAME]: first_name,
      [userFields.LAST_NAME]: last_name,
      [userFields.AGE]: parseInt(age),
      [userFields.LOCATION]: location,
      [userFields.EMAIL]: email,
      [userFields.PASSWORD]: encryptedPassword,
      [userFields.ACTIVE]: false,
      [userFields.EMAIL_CONFIRMATION_CODE]: emailConfirmationCode,
    });

    const { accessToken, refreshToken } = generateNewTokens(email);

    res.status(201).json({
      user: userResponseFormatter(createdUser),
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error(err);
  }
};

export default register;
