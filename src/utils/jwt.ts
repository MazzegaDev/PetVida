import jwt from "jsonwebtoken";
import "dotenv/config";
import { IAuthPayload } from "../interfaces/loginDTO";
import AppError from "../errors/error";

const SECRET = process.env.JWT_SECRET as string;

export function jwtSingIn(payload: object): string {
   return jwt.sign(payload, SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string): IAuthPayload {
   const decoded = jwt.verify(token, SECRET);

   if (typeof decoded === "string") {
      throw new AppError("Token malformado", 500);
   }

   return decoded as IAuthPayload;
}
