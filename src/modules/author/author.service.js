import { db } from "../../DB/connection.db.js";

export const createAuthorsCollection = async (inputs) => {

  const result = await db.collection("authors").insertOne(inputs);

  return result;
};
