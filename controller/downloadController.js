import User from "../model/userModel";
import Todo from "../model/todoModel";
import Like from "../model/likeModel";
import Rating from "../model/ratingModel";
import View from "../model/viewModel";
import Comment from "../model/commentModel";
import Tag from "../model/tagModel";
import excel from "exceljs";

const userExcel = (req, res) => {
  User.find({ role: "user" }).then((objs) => {
    let user = [];

    objs.forEach((obj) => {
      user.push({
        id: obj._id,
        email: obj.email,
        phone: obj.phone,
      });
    });

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("User");

    worksheet.columns = [
      { header: "Id", key: "id", width: 25 },
      { header: "Email", key: "email", width: 25 },
      { header: "Phone", key: "phone", width: 25 },
    ];

    // Add Array Rows
    worksheet.addRows(user);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=" + "user.xlsx");

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  });
};

const todoExcel = (req, res) => {
  Todo.find({}).then((objs) => {
    let todo = [];

    objs.forEach((obj) => {
      todo.push({
        id: obj._id,
        title: obj.title,
        status: obj.status,
        username: obj.username,
        category: obj.category,
      });
    });

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Todo");

    worksheet.columns = [
      { header: "Id", key: "id", width: 25 },
      { header: "Title", key: "title", width: 25 },
      { header: "Status", key: "status", width: 25 },
      { header: "UserId", key: "username", width: 25 },
      { header: "Category", key: "category", width: 25 },
    ];

    // Add Array Rows
    worksheet.addRows(todo);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=" + "todo.xlsx");

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  });
};

const likeExcel = (req, res) => {
  Like.find().then((objs) => {
    let like = [];

    objs.forEach((obj) => {
      like.push({
        id: obj._id,
        userId: obj.userId,
        todoId: obj.todoId,
      });
    });

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Like");

    worksheet.columns = [
      { header: "Id", key: "id", width: 25 },
      { header: "Users", key: "userId", width: 25 },
      { header: "TodoId", key: "todoId", width: 25 },
    ];

    // Add Array Rows
    worksheet.addRows(like);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=" + "like.xlsx");

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  });
};

const ratingExcel = (req, res) => {
  Rating.find({}).then((objs) => {
    let rating = [];

    objs.forEach((obj) => {
      rating.push({
        id: obj._id,
        ratings: obj.rating,
        userId: obj.userId,
        todoId: obj.todoId,
      });
    });

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Rating");

    worksheet.columns = [
      { header: "Id", key: "id", width: 25 },
      { header: "Rating", key: "ratings", width: 25 },
      { header: "Users", key: "userId", width: 25 },
      { header: "TodoId", key: "todoId", width: 25 },
    ];

    // Add Array Rows
    worksheet.addRows(rating);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "rating.xlsx"
    );

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  });
};

const viewExcel = (req, res) => {
  View.find().then((objs) => {
    let view = [];

    objs.forEach((obj) => {
      view.push({
        id: obj._id,
        userId: obj.userId,
        todoId: obj.todoId,
      });
    });

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("View");

    worksheet.columns = [
      { header: "Id", key: "id", width: 25 },
      { header: "Users", key: "userId", width: 25 },
      { header: "TodoId", key: "todoId", width: 25 },
    ];

    // Add Array Rows
    worksheet.addRows(view);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=" + "view.xlsx");

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  });
};

const tagExcel = (req, res) => {
  Tag.find().then((objs) => {
    let tag = [];

    objs.forEach((obj) => {
      tag.push({
        id: obj._id,
        title: obj.title,
        category: obj.category,
        todoId: obj.todoId,
      });
    });

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Tag");

    worksheet.columns = [
      { header: "Id", key: "id", width: 25 },
      { header: "Title", key: "title", width: 25 },
      { header: "Category", key: "category", width: 25 },
      { header: "TodoId", key: "todoId", width: 25 },
    ];

    // Add Array Rows
    worksheet.addRows(tag);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=" + "tag.xlsx");

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  });
};

const commentExcel = (req, res) => {
  Comment.find().then((objs) => {
    let comment = [];

    objs.forEach((obj) => {
      comment.push({
        id: obj._id,
        comments: obj.comment,
        userId: obj.userId,
        todoId: obj.todoId,
      });
    });

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Comment");

    worksheet.columns = [
      { header: "Id", key: "id", width: 25 },
      { header: "Comments", key: "comments", width: 25 },
      { header: "Users", key: "userId", width: 25 },
      { header: "TodoId", key: "todoId", width: 25 },
    ];

    // Add Array Rows
    worksheet.addRows(comment);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "comment.xlsx"
    );

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  });
};

export {
  userExcel,
  todoExcel,
  likeExcel,
  ratingExcel,
  viewExcel,
  commentExcel,
  tagExcel,
};
