import { OAuth2Client } from 'google-auth-library';
import { platforms } from '../constants/index.js';
const client = new OAuth2Client();

export const verifyGoogleToken = async (token, platform = platforms.WEB) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: getEnvVarForPlatform(platform),
  });
  return ticket?.payload;
};

const getEnvVarForPlatform = (platform) =>
  process.env[`GOOGLE_AUTH_${platform}_CLIENT_ID`];
