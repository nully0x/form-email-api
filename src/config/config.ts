const dotenv = require("dotenv");

dotenv.config();

const config: string | any = {
  port: process.env.PORT,
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
};

export default config;
