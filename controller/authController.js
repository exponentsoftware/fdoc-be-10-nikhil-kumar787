import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import Payment from "../model/paymentModel";
import ErrorHandler from "../utils/errorHandler.js";
import generateTokenUser from "../utils/generateTokenUser.js";
import generateTokenAdmin from "../utils/generateTokenAdmin.js";
import ActiveUser from "../model/activeUserModel.js";
import { currentDate, month, month1, nextDate } from "../utils/dateFormat.js";
import APIFeatures from "../utils/apiFeatures.js";

const getUsers = asyncHandler(async (req, res) => {
  const apiFeatures = new APIFeatures(
    User.find({ role: "user" }).sort({ createdAt: -1 }),
    req.query
  ).filter();
  let users = await apiFeatures.query;

  if (!users) {
    return next(new ErrorHandler("No users found", 404));
  }

  res.status(200).json({
    success: true,
    users,
  });
});

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new ErrorHandler("User already exists", 404));
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
  });

  if (user) {
    res.status(201).json({
      message: "User Created Successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  } else {
    return next(new ErrorHandler("User not found", 400));
  }
});

const registerAdmin = asyncHandler(async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  const adminExists = await User.findOne({ email });

  if (adminExists) {
    return next(new ErrorHandler("Admin already exists", 404));
  }

  let role = "admin";

  const admin = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });

  if (admin) {
    res.status(201).json({
      message: "Admin Created Successfully",
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
    });
  } else {
    return next(new ErrorHandler("Admin not found", 400));
  }
});

const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (user && (await user.comparePassword(password))) {
    const existUser = await ActiveUser.findOne({ userId: user._id });
    if (!existUser) {
      const active = await ActiveUser.create({
        userId: user._id,
        name: user.name,
      });
    }

    res.json({
      message: "User logged in successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateTokenUser(user._id),
    });
  } else {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
});

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await User.findOne({ email }).select("+password");

  if (admin && (await admin.comparePassword(password))) {
    res.json({
      message: "Admin logged in successfully",
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateTokenAdmin(admin._id),
    });
  } else {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
});

const getActiveUsers = async (req, res, next) => {
  try {
    const todayActive = await ActiveUser.find();

    if (!todayActive) {
      return next(new ErrorHandler("Not found any users for current day", 404));
    }

    res.status(200).json({
      success: true,
      message: " All Active User for current day ",
      todayActive,
    });
  } catch (err) {
    console.log(err);
  }
};

const getRegisteredUsers = async (req, res, next) => {
  try {
    //db.User.find({"created_on": {"$gte": new Date(2012, 7, 14), "$lt": new Date(2012, 7, 15)}})
    //console.log(dateFormat.currentDate);
    //console.log(dateFormat.nextDate);
    const user = await User.findOne({
      createdAt: { $gte: currentDate, $lt: nextDate },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: `Not Found any registered Users for the_Day`,
      });
      return next(
        new ErrorHandler("Not found any registered users for the day", 404)
      );
    }

    res.status(200).json({
      success: true,
      message: " All registered Users for the_Day",
      user,
    });
  } catch (err) {
    console.log(err);
  }
};

const getMonthUsers = async (req, res, next) => {
  try {
    //db.User.find({"created_on": {"$gte": new Date(2012, 7, 14), "$lt": new Date(2012, 7, 15)}})
    //console.log(dateFormat.currentDate);
    //console.log(dateFormat.nextDate);
    const user = await User.find({
      day: { $eq: month },
    });

    if (!user) {
      return next(new ErrorHandler("Not found any active for the month", 404));
    }

    res.status(200).json({
      success: true,
      message: " All Active Users for the month",
      user,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllPayments = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;

  const apiFeatures = new APIFeatures(
    Payment.find()
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit),
    req.query
  ).filter();
  let payments = await apiFeatures.query;

  if (!payments) {
    return next(new ErrorHandler("Not found any todo data", 404));
  }

  res.status(200).json({
    success: true,
    payments,
  });
});

export {
  registerUser,
  registerAdmin,
  authUser,
  authAdmin,
  getActiveUsers,
  getRegisteredUsers,
  getUsers,
  getMonthUsers,
  getAllPayments,
};
