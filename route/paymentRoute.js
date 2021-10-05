import express from "express";
const router = express.Router();
import { createOrder, verifyOrder } from "../controller/paymentController";

router.post("/createOrder", createOrder);
router.post("/verifyOrder", verifyOrder);

export default router;
