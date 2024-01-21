import jwt from 'jsonwebtoken';
import {
  generateNewAccessToken,
  generateNewRefreshToken,
} from '../../utils/index.js';

const renewRefreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const claims = atob(refreshToken.split('.')[1]);
  const userData = JSON.parse(claims);

  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
    const newRefreshToken = generateNewRefreshToken(userData.email);
    const newAccessToken = generateNewAccessToken(userData.email);
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      maxAge: '10039203200',
    });

    res.status(200).json({
      accessToken: newAccessToken,
      message: 'Refresh token has renewd and stored in httpOnly cookie',
    });
  } catch (err) {
    res.status(401).send('Refresh token is incorrect or has expired already');
  }
};

export default renewRefreshToken;
