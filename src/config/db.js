import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

try {
  await sequelize.authenticate();
  console.log("Connected to db successfully");
} catch (error) {
  console.error("Unable to connect to db:", error);
}

export default sequelize;
