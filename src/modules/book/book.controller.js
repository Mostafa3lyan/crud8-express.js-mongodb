import { Router } from "express";
import { successResponse } from "../../common/utils/index.js";
import { CreateBooksIndex, insertBook, insertManyBooks } from "./book.service.js";

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

export default router;
