import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET

export const signToken = (payload: object) => {
    return jwt.sign(payload, SECRET, { expiresIn: "7D"});
}

export const verifyToken = (token: string) => jwt.verify(token, SECRET);