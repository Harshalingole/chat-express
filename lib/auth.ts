import { supabase } from "./supabase";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const hashPassword = async(password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}


export const comparePassword = async(password:string,hash:string):Promise<boolean> => {
  return await bcrypt.compare(password,hash)
}

const secret = process.env.NEXT_PUBLIC_JWT_SECRET

export const generateToken = (payload:object):string => {
  return jwt.sign(payload,secret,{expiresIn: '1h'})
}


export const verifyToken = (token: string): object | null  => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}
