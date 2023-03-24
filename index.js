// Import environtment variable
require("dotenv").config();

// Import
const mainRouter = require("./src/router/index"); // Import main router
const express = require("express"); // Import express library
const helmet = require("helmet"); // Import helmet
const cors = require("cors"); // Import cors
const morgan = require("morgan"); // Import morgan
const xss = require("xss-clean"); // Import xss
const app = express(); // Import express
const { Server } = require("socket.io");
const http = require("http");
const commonHelper = require("./src/helper/common");
const createError = require("http-errors");
const messageModel = require("./src/model/messageModel");

// Use middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(xss());
app.use("/img", express.static("src/upload"));

// Port choice
const port = process.env.PORT || 443;

// use Main Router
app.use("/", mainRouter);
app.all("*", (req, res, next) => {
  next(commonHelper.response(res, null, 404, "URL not Found"));
});

//Error code and message
app.use((err, req, res, next) => {
  const messageError = err.message || "Internal server error";
  const statusCode = err.status || 500;

  //Fix multer file too large message to a proper one
  if (messageError == "File too large") {
    commonHelper.response(res, null, 413, "File too large (Max. 2MB)");
  } else {
    commonHelper.response(res, null, statusCode, messageError);
  }
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:4000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// io.use((socket, next) => {
//   const token = socket.handshake.query.token;
//   jwt.verify(token, process.env.SECRET_KEY_JWT, (err, decoded) => {
//     if (err) {
//       if (err.name === "JsonWebTokenError") {
//         next(createError(400, "token is invalid"));
//       } else if (err.name === "TokenExpiredError") {
//         next(createError(400, "token is expired"));
//       } else {
//         next(createError(400, "error occured"));
//       }
//     }
//     socket.userId = decoded.id;
//     socket.join(decoded.id);
//     next();
//   });
// });

// io.on("connection", (socket) => {
//   console.log(`device connected : ${socket.id} - ${socket.userId}`);

//   socket.on("private-msg", (data, callback) => {
//     const newMessage = {
//       receiver: data.receiver,
//       message: data.msg,
//       sender: socket.userId,
//       date: moment(new Date()).format("LT"),
//     };

//     console.log(newMessage);

//     callback(newMessage);

//     messageModel.newMessage(newMessage).then(() => {
//       socket.broadcast
//         .to(data.receiver)
//         .emit("private-msg-BE", { ...newMessage, date: new Date() });
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log(`device disconnected : ${socket.id}`);
//   });
// });

// Listening port awaiting requests
app.listen(port, () => {
  console.log(`Server run on port: ${port}`);
});

//bikin crud reviews  