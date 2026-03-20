const express = require("express");
const cors = require("cors");
const path = require("path");
const { error } = require("./utils/response");
const { HTTP_STATUS, MESSAGES } = require("./utils/constants");

const app = express();

/*
|--------------------------------------------------------------------------
| Global Middlewares
|--------------------------------------------------------------------------
*/

app.use(express.static(path.join(__dirname, "public")));

// enable CORS
app.use(cors());

// parse JSON body
app.use(express.json());

// parse URL encoded data
app.use(express.urlencoded({ extended: true }));

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

// health check route
// app.get("/", (req, res) => {
//   res.json({
//     message: "Expense Tracker API is running"
//   });
// });

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
})

// import routes
const authRoutes = require("./routes/auth.routes");
const expenseRoutes = require("./routes/expense.routes");
const categoryRoutes = require("./routes/category.routes");

// route registration
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/categories", categoryRoutes);

/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/

app.use((req, res) => {
  return error(
    res,
    "Route not found",
    HTTP_STATUS.NOT_FOUND
  );
});

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use((err, req, res, next) => {
  console.error(err);

  return error(
    res,
    MESSAGES.SERVER_ERROR,
    HTTP_STATUS.INTERNAL_SERVER_ERROR
  );
});

module.exports = app;