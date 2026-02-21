import { NotFoundException } from "../../common/utils/index.js";
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
    throw NotFoundException({ message: "Book not found" });
  }

  return result;
};

export const findBooksByYear = async (from, to) => {
  const result = await db
    .collection("books")
    .find({
      year: {
        $gte: Number(from),
        $lte: Number(to),
      },
    })
    .toArray();

  if (!result.length) {
    throw NotFoundException({ message: "No books found in this range" });
  }

  return result;
};

export const findBooksByGenre = async (genre) => {
  const result = await db
    .collection("books")
    .find({
      genres: { $in: [genre] },
    })
    .toArray();

  if (!result.length) {
    throw NotFoundException({ message: "No books found for this genre" });
  }

  return result;
};

export const findBooksWithSkipLimit = async () => {
  const result = await db
    .collection("books")
    .find()
    .sort({ year: -1 })
    .skip(2)
    .limit(3)
    .toArray();

  if (!result.length) {
    throw NotFoundException({ message: "Book not found" });
  }

  return result;
};

export const findBooksByYearInteger = async () => {
  const result = await db
    .collection("books")
    .find({
      year: { $type: "int" },
    })
    .toArray();

  if (!result.length) {
    throw NotFoundException({ message: "No books found with integer year" });
  }

  return result;
};

export const findBooksExcludeGenres = async () => {
  const result = await db
    .collection("books")
    .find({
      genres: { $nin: ["Horror", "Science Fiction"] },
    })
    .toArray();

  if (!result.length) {
    throw new Error("No books found");
  }

  return result;
};

