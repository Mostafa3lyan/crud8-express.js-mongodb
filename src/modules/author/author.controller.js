import { Router } from "express";
import { createAuthorsCollection } from "./author.service.js";
import { successResponse } from "../../common/utils/index.js";

const router = Router();

router.post("/collection/authors", async (req, res) => {
  const result = await createAuthorsCollection(req.body);
    return successResponse({
      res,
      message: "Authors collection created implicitly",
      status: 201,
      data: { result},
    });
});

export default router;
