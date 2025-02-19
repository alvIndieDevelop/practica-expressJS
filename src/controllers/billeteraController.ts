import { BilleteraModel } from "../models/billeteraSchema";
import { IUser, UserModel } from "../models/userSchema";

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

  // add amount to wallet
  async addToWallet(userData: Partial<IUser>, amount: number) {
    // find user first
    const findUser = await UserModel.findOne({ document: userData.document });
    if (!findUser) throw new Error("user not found");

    // find wallet of the user.
    const findWallet = await BilleteraModel.findOne({ userId: findUser._id });
    if (!findWallet) throw new Error("wallet of user not found");

    findWallet.amount += amount;
    await findWallet.save();
    return {
      message: "amount is added to wallet.",
    };
  }

  // pay
  async payProduct() {}

  // confirm payment
  async confirmPayment() {}

  // Check Wallet amount
  async checkWalletAmount() {}
}
