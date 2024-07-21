import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export function parseJwt(token: string) {
  try {
    let payload = jwt.verify(token, SECRET_KEY);
    if(typeof payload !== "string"){
        return payload.id as { userId: number };
    } else{
        throw new Error('Invalid token');
    }
  } catch (error) {
    throw new Error('Invalid token');
  }
}