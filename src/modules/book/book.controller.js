import { Router } from "express";
import { successResponse } from "../../common/utils/index.js";
import {
  CreateBooksIndex,
  findBookByTitle,
  findBooksByGenre,
  findBooksByYear,
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

export default router;
