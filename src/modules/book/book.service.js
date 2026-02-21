import { db } from "../../DB/connection.db.js";

export const CreateBooksIndex = async () => {

  const result = await db.users.createIndex({ title: 1 });

  return result;
};
