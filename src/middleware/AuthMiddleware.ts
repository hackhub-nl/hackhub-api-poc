import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction): any => {
  if (!req.headers.authorization) {
    return res.status(401).send("No token!");
  }

  let secretKey = process.env.JWT_SECRET_KEY || "secret";
  const token: string = req.headers.authorization.split(" ")[1];

  try {
    const credentials: string | Object = jwt.verify(token, secretKey);
    if (credentials) {
      req.app.locals.credentials = credentials;
      return next();
    }
    return res.send("Invalid token!");
  } catch (error) {
    return res.send(error);
  }
};
