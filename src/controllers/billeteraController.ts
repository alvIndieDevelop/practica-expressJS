import { BilleteraModel } from "../models/billeteraSchema";
import { IUser, UserModel } from "../models/userSchema";
import { PaymentModel } from "../models/paymentsSchema";
import crypto from "crypto";

type T_confirmPaymentPayload = {
  sessionId: string;
  token: string;
  userId: string;
  amount: number;
};

export class BilleteraController {
  // asign the wallet to a user
  async asignWallet(userId: string) {
    const findUser = await UserModel.findById(userId);
    if (!findUser) throw new Error("user not found");

    const walletExists = await BilleteraModel.findOne({ userId: userId });
    if (walletExists) throw new Error("this user already have a wallet");

    // create the wallet
    const wallet = new BilleteraModel({ userId: userId, amount: 0 });
    await wallet.save();
    return wallet;
  }

  async findWalletByUserId(userId: string) {
    const wallet = await BilleteraModel.findOne({ userId: userId }).populate(
      "userId",
      {
        password: 0,
        createdAt: 0,
        updatedAt: 0,
        walletId: 0,
      }
    );
    if (!wallet) throw new Error("wallet not found");
    return wallet;
  }

  // add amount to wallet
  async addToWallet(userData: Partial<IUser>, amount: number) {
    // find user first
    const findUser = await UserModel.findOne({ document: userData.document });
    if (!findUser) throw new Error("user not found");

    // find wallet of the user.
    const findWallet = await BilleteraModel.findOne({ userId: findUser._id });
    if (!findWallet) throw new Error("wallet of user not found");

    (findWallet.amount as number) += amount;
    await findWallet.save();
    return {
      message: "amount is added to wallet.",
    };
  }

  // pay
  async payProduct(userId: string, amount: number) {
    // find user first
    const wallet = await this.findWalletByUserId(userId);
    if (!wallet) throw new Error("wallet not found");

    if ((wallet.amount as number) < amount)
      throw new Error("not enough balance in wallet");

    // create or simulate a sessionID
    const sessionId = crypto.randomBytes(16).toString("hex");
    // get a random number of 6 digits
    const token = Math.floor(100000 + Math.random() * 900000).toString();

    // create payment
    await PaymentModel.create({
      userId: userId,
      sessionId: sessionId,
      token: token,
      amount: amount,
    });

    // simulate send to email.
    return { sessionId, token };
  }

  // confirm payment
  async confirmPayment(payload: T_confirmPaymentPayload) {
    const { sessionId, token, userId, amount } = payload;

    // here we need to check the sessionID and the token to validated.
    const payment = await PaymentModel.findOne({ sessionId });
    if (!payment) throw new Error("payment not found");
    if (payment.token !== token) throw new Error("invalid token");

    // find the wallet.
    const wallet = await this.findWalletByUserId(userId);
    if (!wallet) throw new Error("wallet not found");
    if ((wallet.amount as number) < amount)
      throw new Error("not enough balance");

    // update the wallet
    (wallet.amount as number) -= amount;
    await wallet.save();

    // update the payment
    payment.status = "success";
    await payment.save();

    return {
      message: "payment confirmed.",
      payment: payment,
    };
  }
}
