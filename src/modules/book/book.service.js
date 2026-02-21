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
    throw NotFoundException({ message: "Books not found" });
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
    throw NotFoundException({
      message:
        "No books found with genres other than Horror and Science Fiction",
    });
  }

  return result;
};

export const deleteBooksBeforeYear = async (year) => {
  const result = await db.collection("books").deleteMany({
    year: { $lt: Number(year) },
  });

  if (!result.deletedCount) {
    throw NotFoundException({ message: "No books found before this year" });
  }

  return result;
};

export const aggregateBooks = async () => {
  const result = await db
    .collection("books")
    .aggregate([{ $match: { year: { $gt: 2000 } } }, { $sort: { year: -1 } }])
    .toArray();

  if (!result.length) {
    throw NotFoundException({ message: "No books found after 2000" });
  }

  return result;
};

export const aggregateBooks2 = async () => {
  const result = await db
    .collection("books")
    .aggregate([
      { $match: { year: { $gt: 2000 } } },
      { $project: { title: 1, author: 1, year: 1, _id: 0 } },
    ])
    .toArray();

  if (!result.length) {
    throw NotFoundException({ message: `No books found after 2000` });
  }

  return result;
};

export const aggregateBooks3 = async () => {
  const result = await db
    .collection("books")
    .aggregate([
      { $unwind: "$genres" },
      { $project: { title: 1, genres: 1, _id: 0 } },
    ])
    .toArray();

  if (!result.length) {
    throw NotFoundException({ message: "No books found" });
  }

  return result;
};

export const aggregateBooks4 = async () => {
  const result = await db
    .collection("logs")
    .aggregate([
      {
        $addFields: {
          book_id: { $toObjectId: "$book_id" }, 
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "book_id",
          foreignField: "_id",
          as: "book_details",
          pipeline: [{ $project: { title: 1, author: 1, year: 1, _id: 0 } }],
        },
      },
      {
        $project: {
          _id: 0,
          action: 1,
          book_details: 1,
        },
      },
    ])
    .toArray();

  if (!result.length) {
    throw NotFoundException({ message: "No logs found" });
  }

  return result;
};