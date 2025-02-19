import { PaymentModel, IPayment } from "./../models/paymentsSchema";

export class PaymentController {
  async createPayment(payment: Partial<IPayment>) {
    return await PaymentModel.create(payment);
  }

  async findPaymentBySessionId(sessionId: string) {
    return await PaymentModel.findOne({ sessionId });
  }

  async confirmToken(sessionId: string, token: string): Promise<boolean> {
    const payment = await this.findPaymentBySessionId(sessionId);
    if (!payment) throw new Error("payment not found");
    return payment.token === token;
  }

  async updateToken(sessionId: string) {
    const payment = await this.findPaymentBySessionId(sessionId);
    if (!payment) throw new Error("payment not found");
    payment.status = "success";
    await payment.save();
    return {
      message: "payment confirmed",
    };
  }
}
