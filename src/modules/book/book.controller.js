import { Router } from "express";
import { successResponse } from "../../common/utils/index.js";
import {
  aggregateBooks,
  aggregateBooks2,
  aggregateBooks3,
  aggregateBooks4,
  CreateBooksIndex,
  deleteBooksBeforeYear,
  findBookByTitle,
  findBooksByGenre,
  findBooksByYear,
  findBooksByYearInteger,
  findBooksExcludeGenres,
  findBooksWithSkipLimit,
  insertBook,
  insertManyBooks,
  updateBook,
} from "./book.service.js";

const router = Router();

router.post("/collection/books/index", async (req, res) => {
  const result = await CreateBooksIndex();
  return successResponse({
    res,
    message: "Books index created",
    data: result,
  });
});

router.post("/books", async (req, res) => {
  const result = await insertBook(req.body);
  return successResponse({
    res,
    data: result,
  });
});

router.post("/books/batch", async (req, res) => {
  const result = await insertManyBooks(req.body);
  return successResponse({
    res,
    data: result,
  });
});

router.patch("/books/:title", async (req, res) => {
  const result = await updateBook(req.params.title, req.body);
  return successResponse({
    res,
    data: result,
  });
});

router.get("/books/title", async (req, res, next) => {
  try {
    const result = await findBookByTitle(req.query.title);

    return successResponse({
      res,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/books/year", async (req, res, next) => {
  try {
    const { from, to } = req.query;
    const result = await findBooksByYear(from, to);

    return successResponse({
      res,
      data: result,
    });

  } catch (error) {
    next(error);
  }
});

router.get("/books/genre", async (req, res, next) => {
  try {
    const { genre } = req.query;

    const result = await findBooksByGenre(genre);

    return successResponse({
      res,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/books/skip-limit", async (req, res, next) => {
  try {
    const result = await findBooksWithSkipLimit();

    return successResponse({
      res,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/books/year-integer", async (req, res, next) => {
  try {
    const result = await findBooksByYearInteger();

    return successResponse({
      res,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/books/exclude-genres", async (req, res, next) => {
  try {
    const result = await findBooksExcludeGenres();

    return successResponse({
      res,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/books/before-year", async (req, res, next) => {
  try {
    const { year } = req.query;

    const result = await deleteBooksBeforeYear(year);

    return successResponse({
      res,
      data: {
        message: `All books published before ${year} deleted successfully`,
        deletedCount: result.deletedCount,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/books/aggregate1", async (req, res, next) => {
  try {
    const result = await aggregateBooks();

    return successResponse({
      res,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/books/aggregate2", async (req, res, next) => {
  try {

    const result = await aggregateBooks2();

    return successResponse({
      res,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/books/aggregate3", async (req, res, next) => {
  try {
    const result = await aggregateBooks3();

    return successResponse({
      res,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/books/aggregate4", async (req, res, next) => {
  try {
    const result = await aggregateBooks4();

    return successResponse({
      res,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
