import { db } from "../../DB/connection.db.js";

export const CreateBooksIndex = async () => {
  const result = await db.collection("books").createIndex({ title: 1 });

  return result;
};

export const insertBook = async (inputs) => {
  const result = await db.collection("books").insertOne(inputs);

  return result;
};

export const insertManyBooks = async (inputs) => {
  const result = await db.collection("books").insertMany(inputs);

  return result;
};

export const updateBook = async (title, inputs) => {
  const result = await db
    .collection("books")
    .updateOne({ title }, { $set: inputs });

  return result;
};

export const findBookByTitle = async (title) => {
  const result = await db.collection("books").findOne({ title });

  if (!result) {
    throw new Error("Book not found");
  }

  return result;
};