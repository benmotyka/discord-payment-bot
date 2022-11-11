import mongoose from "mongoose";
import pg from "pg";
import knex from "knex";

import config from "../../knexfile.js";

export const connectDatabase = async () => {
  await mongoose.connect(
    //   `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.rye0p.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/?retryWrites=true&w=majority`
  );
};


pg.types.setTypeParser(1700, "text", parseFloat);

const knexConfig = knex(config);

export default knexConfig;
