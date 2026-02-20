import { db } from "../connection.db.js";

export const books = [];

const bookSchema = {
  bsonType: "object",
  required: ["title"],
  properties: {
    title: {
      bsonType: "string",
      minLength: 1,
      description: "title must be a non-empty string",
    },
  },
};

export const BookModel = await db.createCollection("books", {
  validator: { $jsonSchema: bookSchema },
});
