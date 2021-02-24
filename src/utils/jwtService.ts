import jwt from 'jsonwebtoken';

export const verifyJwt = (jwtToken: string) => {
  const [bearer, token] = jwtToken.split(' ');

  if (!bearer || !token) return false;

  try {
    jwt.verify(token, 'MdxxrDPO7x');

    return true;
  } catch (error) {
    return false;
  }
};

export const createJwt = (params: any) =>
  jwt.sign(params, 'MdxxrDPO7x', { expiresIn: 30000 });
