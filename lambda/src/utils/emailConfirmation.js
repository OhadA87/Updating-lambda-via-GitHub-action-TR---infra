import { createNodeMailerAwsTransporter } from './index.js';
import User from '../models/user.js';
import { userFields } from '../constants/index.js';
import bcrypt from 'bcryptjs';

const gernerateMessage = (code) => `Confirmation Code: ${code}
Please enter this code on the confirmation page to verify your email address. If you did not request this registration, please ignore this email.`;

const sendEmail = (email, code) => {
  const transporter = createNodeMailerAwsTransporter();

  transporter.sendMail(
    {
      from: 'adoptmecoil@gmail.com',
      to: email,
      subject: 'Adopt Me confirmation code',
      text: gernerateMessage(code),
    },
    (err) => {
      if (err) console.error(err);
    },
  );
};

const generateCode = () => Math.floor(100000 + Math.random() * 900000);

const verifyUserInDB = async (user) => {
  await user.updateOne({
    active: true,
    emailConfirmationCode: null,
  });
};

const updateConfirmationCodeInDB = async (user, code) => {
  await user.updateOne({
    emailConfirmationCode: code,
  });
};

export const sendEmailConfirmationCode = async (email, updateUser) => {
  const sixDigitsCode = generateCode();
  sendEmail(email, sixDigitsCode);
  if (updateUser) {
    const user = await User.findOne({ email });
    updateConfirmationCodeInDB(user, sixDigitsCode);
  }
  return sixDigitsCode;
};

export const verifyConfirmationCode = async (email, code, password) => {
  try {
    const user = await User.findOne({ email });
    if (user && password && code === user?.emailConfirmationCode) {
      await verifyUserInDB(user);
      const encryptedPassword = await bcrypt.hash(password, 10);
      await user.updateOne({ [userFields.PASSWORD]: encryptedPassword });
      return { user: user, isMatch: true };
    } else if (user && code === user?.emailConfirmationCode) {
      await verifyUserInDB(user);
      return true;
    } else return false;
    // @TODO: Return the reason why the function failed (code or password) in else condition
  } catch (err) {
    console.error(err);
    return;
  }
};
