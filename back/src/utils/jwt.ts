import * as jwt from 'jsonwebtoken';

interface Payload {
  id: number;
  email: string;
  role: number
}

export const generateToken = (payload: Payload): string => {
  const secretKey = process.env.JWT_SECRET; // Remplacez par votre propre clé secrète
  const options = {
    expiresIn: process.env.JWT_DURING, // Temps d'expiration du token
  };
  
  const token = jwt.sign(payload, secretKey, options);
  return token;
};
