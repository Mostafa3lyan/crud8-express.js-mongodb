import { Router } from 'express';
import { createLog } from './log.service.js';
import { successResponse } from "../../common/utils/index.js";

const router = Router()

router.post("/collection/logs/capped", (req,res) => {
  const result = createLog()
  return successResponse({
    res,
    message: "Logs capped collection created with 1MB size limit",
    status: 201,
  });
})

export default router;
