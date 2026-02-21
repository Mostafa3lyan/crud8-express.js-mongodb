import { Router } from 'express';
import { successResponse } from "../../common/utils/index.js";
import { CreateBooksIndex } from './book.service.js';

const router = Router()

router.post("/collection/books/index", (req,res) => {
  const result = CreateBooksIndex();
  return successResponse({
    res,
    message: "Books index created",
    data: result
  });
})

export default router;
