import * as jwt from "jsonwebtoken";

interface IJwtData {
  uid: string;
}

const sign = (data: IJwtData): string | "JWT_SECRET not found in .env file." => {
  if (!process.env.JWT_SECRET) {
    return "JWT_SECRET not found in .env file.";
  }

  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });
};

const verify = (token: string): IJwtData | "JWT_SECRET not found in .env file." | "Token inválido." => {
  if (!process.env.JWT_SECRET) {
    return "JWT_SECRET not found in .env file.";
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof decoded === "string") {
      return "Token inválido.";
    }

    return decoded as IJwtData;
  } catch (error) {
    return "Token inválido.";
  }
};

export const jwtService = {
  sign,
  verify
};
