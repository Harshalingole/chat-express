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


