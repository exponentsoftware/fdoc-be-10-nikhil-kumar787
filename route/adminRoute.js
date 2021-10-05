import express from "express";
const router = express.Router();
import { protectAdmin } from "../middlewares/adminMiddleware";

import { getUsers, getAllPayments } from "../controller/authController";
import {
  getAllLikes,
  getAllRatings,
  getAllViews,
  getAllComments,
  getAllTags,
} from "../controller/featureController";
import { getAll } from "../controller/todoController";

router.get("/users", getUsers);
router.get("/todos", getAll);
router.get("/likes", getAllLikes);
router.get("/ratings", getAllRatings);
router.get("/views", getAllViews);
router.get("/comments", getAllComments);
router.get("/tags", getAllTags);
router.get("/payments", getAllPayments);

export default router;
