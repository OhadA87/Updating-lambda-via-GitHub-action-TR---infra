import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  if (process.env.NODE_ENV === 'development') return next();
  // @TODO: CRITICAL - Generate accessToken on client (ApiEndPoint) and send it instead of refreshToken
  const bearer = req.body.accessToken || req.headers.authorization;
  const token = bearer?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    req.user = decoded;
    return next();
  } catch (err) {
    console.error(err);
    return res.status(401).send('Invalid Token');
  }
};
