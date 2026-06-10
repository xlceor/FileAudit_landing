import jwt from 'jsonwebtoken';

const privateKey = process.env.JWT_PRIVATE_KEY_PEM?.replace(/\\n/g, '\n');

export const signLicenseToken = (payload: object, options?: { expiresIn?: string }) => {
  if (!privateKey) throw new Error('JWT_PRIVATE_KEY_PEM not found');
  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: options?.expiresIn || '365d',
  });
};
