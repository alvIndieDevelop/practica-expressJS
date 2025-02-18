import { connect, ConnectOptions } from "mongoose";
import { options } from ".";

export const connectToDB = async () =>
  await connect(options.DB.MONGO.uri, {
    autoIndex: true,
    autoCreate: true,
  } as ConnectOptions);
