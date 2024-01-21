import { verifyConfirmationCode } from '../../utils/index.js';

const verifyEmailCode = async (req, res) => {
  const { email, code } = req.body;
  const isCodeMatch = await verifyConfirmationCode(email, code);
  if (isCodeMatch) return res.status(201).json({ isMatch: true });
  return res.status(404).json({ isMatch: false });
};

export default verifyEmailCode;
