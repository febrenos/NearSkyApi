// exampleRoutes.ts

import express from "express";
import { getWeathers } from "../controllers/weatherController";

const router = express.Router();

router.post("/", getWeathers);

export default router;
