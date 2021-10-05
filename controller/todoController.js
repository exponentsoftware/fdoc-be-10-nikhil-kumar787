import Todo from "../model/todoModel";
import User from "../model/userModel";
import asyncHandler from "express-async-handler";
import ErrorHandler from "../utils/errorHandler";
import APIFeatures from "../utils/apiFeatures";

// @desc    Get logged in for all todos
// @route   GET /todo
// @access  Private
const getAll = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;

  const apiFeatures = new APIFeatures(
    Todo.find()
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit),
    req.query
  ).filter();
  let todos = await apiFeatures.query;

  if (todos == 0) {
    return next(new ErrorHandler("Not found any todo data", 404));
  }

  res.status(200).json({
    success: true,
    todos,
  });
});

// @desc    fetching todo by it's id
// @route   GET /todo/:id
// @access  Private
const getSingleTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return next(new ErrorHandler("Todo not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    todo,
  });
});

// @desc    fetching only authorized user's todo
// @route   GET /todo/user
// @access  Private
const getTodos = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const apiFeatures = new APIFeatures(
    Todo.find({ username: id }).sort({ createdAt: -1 }),
    req.query
  ).filter();
  let todo = await apiFeatures.query;

  if (!todo) {
    return next(new ErrorHandler("Todo not found with this user_id", 404));
  }

  res.status(200).json({
    success: true,
    todo,
  });
});

// @desc    Create new todo
// @route   POST /todo
// @access  Private
const createTodo = asyncHandler(async (req, res, next) => {
  const { username, title, category } = req.body;

  const user = await User.findOne({ _id: username });

  if (user.todo_count <= 20) {
    if (!username || !title || !category) {
      return next(new ErrorHandler("Please enter the appropriate fields", 400));
    } else {
      const todo = new Todo({ username, title, category });

      const createdTodo = await todo.save();

      const todoCount = await User.findOneAndUpdate(
        { _id: username },
        { $inc: { todo_count: 1 } },
        { new: true, upsert: true, useFindAndModify: false }
      );

      res.status(201).json(createdTodo);
    }
  } else {
    res.send("Maximum limit reached");
  }
});

// @desc    Updating single todo
// @route   POST /todo/:id
// @access  Private
const updateTodo = asyncHandler(async (req, res, next) => {
  let todo = await Todo.findById(req.params.id);

  if (!todo) {
    return next(new ErrorHandler("Todo not found with this id", 404));
  }

  todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidator: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    todo,
  });
});

// @desc    Deleting single todo
// @route   POST /todo/:id
// @access  Private
const deleteTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return next(new ErrorHandler("Todo not found with this id", 404));
  }

  await todo.remove();

  res.status(200).json({
    success: true,
    message: "Todo is deleted",
  });
});

const updateStatus = async (req, res) => {
  try {
  } catch (err) {
    res.status(404).json({ success: false, message: "todo not update", err });
  }
  const todoid = req.params.id;
  // console.log(todoid);
  await Todo.find({ _id: todoid }).exec(async (err, update) => {
    // console.log(update);
    if (update[0].status == true) {
      res.send("Already task completed");
    } else {
      Todo.findOneAndUpdate(
        { _id: todoid },
        {
          $set: {
            status: true,
          },
        },
        { new: true }
      )
        .exec()
        .then(async (result) => {
          console.log(result);
          await User.findByIdAndUpdate(
            { _id: result.userId },
            { $inc: { task_count: 1 } },
            { new: true, runValidator: true, useFindAndModify: false }
          );
          res.status(200).json({ message: result });
        })
        .catch((e) => {
          console.log(e);
          res.status(400).json({ error: e });
        });
    }
  });
};

const usersCompletedMaxTask = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne().sort("-task_count");
    console.log(user);
    if (!user) {
      res.status(404).json({
        success: false,
        message: `Not Found any Todo Data`,
      });
    }

    res.status(200).json({ success: true, message: "All Todo", user });
  } catch (err) {
    console.log(err);
  }
});

const getCompletedTodo = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const apiFeatures = new APIFeatures(
    Todo.find({ status: true, username: id }).sort({ createdAt: -1 }),
    req.query
  ).filter();
  let todo = await apiFeatures.query;

  if (!todo) {
    return next(new ErrorHandler("Todo not found with this user_id", 404));
  }

  res.status(200).json({
    success: true,
    todo,
  });
});

export {
  getAll,
  getSingleTodo,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  updateStatus,
  usersCompletedMaxTask,
  getCompletedTodo,
};
