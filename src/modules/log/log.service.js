import { db } from "../../DB/connection.db.js"

export const createLog = async (inputs) => {
  const result = await db.createCollection("logs", {
    capped: true,
    size: 1048576,
    max: 2,
  });
  return result
}