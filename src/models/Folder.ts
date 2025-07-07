import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize";

export const Folder = sequelize.define(
  "Folder",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "folders",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
