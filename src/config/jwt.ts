import jwt from "jwt-simple";
import crypto from "crypto";
import moment from "moment";

import { IUser } from "models/userSchema";

export default class TokenService {
  private static readonly key: string = "prueba";
  private static readonly secret: string = "prueba";
  private static readonly salt: string = crypto
    .createHmac("sha256", this.key)
    .update(this.secret)
    .digest("hex");
  private static readonly secretKey: string = crypto.hash("sha256", this.salt);

  public static createToken(user: Partial<IUser>): string {
    const payload = {
      sub: user._id,
      user: {
        name: user.name,
        email: user.email,
        document: user.document,
      },
      // time to expire
      now: moment().unix(),
      exp: moment().add(30, "day").unix(),
    };

    return jwt.encode(payload, this.secretKey);
  }

  public static createForgotPasswordToken(email: string): string {
    const payload = {
      email: email,
      iat: moment().unix(),
      exp: moment().add(1, "days").unix(),
    };
    return jwt.encode(payload, this.secretKey);
  }

  public static decodeToken(token: string): any {
    return jwt.decode(token, this.secretKey);
  }

  public static verifyToken(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    return decodedToken.exp > moment().unix();
  }
}
