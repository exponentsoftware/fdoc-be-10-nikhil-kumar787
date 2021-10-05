import express from "express";
import {
  addComment,
  addLikes,
  addRating,
  addTag,
  addViews,
  deleteComment,
  deleteTag,
  deleteUserComment,
  getComment,
  updateComment,
  updateTag,
  updateUserComment,
  updateUserTag,
  mostLiked,
} from "../controller/featureController";
const router = express.Router();

router.get("/comment/:id", getComment);
router.get("/mostliked", mostLiked);
router.route("/like").post(addLikes);
router.route("/view").post(addViews);
router.route("/rating").post(addRating);
router.route("/comment").post(addComment);
router.route("/tag").post(addTag);
router.route("/updatecomment").post(updateUserComment);
router.route("/comment/:id").put(updateComment).delete(deleteComment);
router.delete("/deletecomment/:id", deleteUserComment);
router.route("/tag/:id").put(updateTag).delete(deleteTag);
router.route("/updatetag").post(updateUserTag);

export default router;
