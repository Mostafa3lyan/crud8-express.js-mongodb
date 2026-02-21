import { db } from "../../DB/connection.db.js";

export const createCappedLog = async (inputs) => {
  const result = await db.createCollection("logs", {
    capped: true,
    size: 1048576,
    max: 2,
  });
  return result;
};

export const insertLog = async (inputs) => {
  const result = await db.collection("logs").insertOne(inputs);

  return result;
};