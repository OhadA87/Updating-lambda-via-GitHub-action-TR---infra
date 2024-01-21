import User from '../../models/user.js';
import {
  generateNewAccessToken,
  generateNewRefreshToken,
  verifyGoogleToken,
  userResponseFormatter,
} from '../../utils/index.js';

// This method is valid for both login and register
const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;
    const { email, given_name, family_name, picture } = await verifyGoogleToken(
      idToken,
    );

    let user = await User.findOne({ 'google.email': email });
    if (!user)
      user = await createGoogleUser({
        email,
        first_name: given_name,
        last_name: family_name,
        picture,
      });

    const refreshToken = generateNewRefreshToken(email);
    const accessToken = generateNewAccessToken(email);

    return res.status(200).json({
      accessToken,
      refreshToken,
      user: userResponseFormatter(user),
    });
  } catch (err) {
    console.error(err);
    return res.status(500);
  }
};

const createGoogleUser = async ({ email, first_name, last_name, picture }) => {
  const user = await User.create({
    first_name,
    last_name,
    picture,
    google: {
      email,
    },
  });
  return user;
};

export default googleAuth;
