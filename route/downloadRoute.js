import express from "express";
import {
  commentExcel,
  likeExcel,
  ratingExcel,
  tagExcel,
  todoExcel,
  userExcel,
  viewExcel,
} from "../controller/downloadController";
const router = express.Router();

router.get("/users", userExcel);
router.get("/todos", todoExcel);
router.get("/likes", likeExcel);
router.get("/views", viewExcel);
router.get("/ratings", ratingExcel);
router.get("/comments", commentExcel);
router.get("/tags", tagExcel);

export default router;
