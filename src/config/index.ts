const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

export const options = {
  DB: {
    MONGO: {
      uri: `mongodb+srv://${username}:${password}@${database}.p86m4.mongodb.net/?retryWrites=true&w=majority&appName=${database}`,
    },
  },
};
