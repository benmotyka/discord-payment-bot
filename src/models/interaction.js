import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const Interaction = sequelize.define(
  "interaction",
  {
    serverId: {
      type: DataTypes.STRING,
      require: true,
      allowNull: false,
    },
    channelId: {
      type: DataTypes.STRING,
      require: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      require: true,
      allowNull: false,
    },
    transactionId: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

export default Interaction