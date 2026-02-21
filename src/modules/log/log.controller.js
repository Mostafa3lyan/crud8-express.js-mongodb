import { Router } from 'express';
import { createCappedLog, insertLog } from "./log.service.js";
import { successResponse } from "../../common/utils/index.js";

const router = Router()

router.post("/collection/logs/capped",  async (req,res) => {
  const result = await createCappedLog();
  return successResponse({
    res,
    message: "Logs capped collection created with 1MB size limit",
    status: 201,
    data: result,
  });
})

router.post("/logs", async (req, res) => {
  const result = await insertLog(req.body);
  return successResponse({
    res,
    message: "Log inserted",
    data: result
  });
});

export default router;
