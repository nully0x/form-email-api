const dotenv = require("dotenv");

dotenv.config();

const config: unknown | any = {
  port: process.env.PORT || 3000,
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
};

export default config;
