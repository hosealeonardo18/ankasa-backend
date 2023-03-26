/* eslint-disable no-unused-vars */
const adminModel = require("../model/adminModel");
const uuid = require("uuid");
const commonHelper = require("../helper/common");
const authHelper = require("../helper/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const adminController = {
  registerAdmin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkEmail = await adminModel.findEmail(email);
      if (checkEmail.rowCount > 0) {
        return res.json({
          message: "Email already exist",
        });
      }
      const hashPassword = await bcrypt.hash(password, saltRounds);
      const id = uuid.v4();
      const data = {
        id,
        email,
        password: hashPassword,
      };
      const result = await adminModel.insertAdmin(data);
      commonHelper.response(res, result.rows, 201, "Register has been success");
    } catch (error) {
      console.log(error);
      commonHelper.response(res, null, 500, "Failed registering admin");
    }
  },

  loginAdmin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const {
        rows: [admin],
      } = await adminModel.findEmail(email);
      if (!admin) {
        return res.json({
          message: "Email is invalid",
        });
      }
      const isValidPassword = bcrypt.compareSync(password, admin.password);
      if (!isValidPassword) {
        return res.json({
          message: "Password is invalid",
        });
      }
      delete admin.password;
      let payload = {
        email: admin.email,
        id: admin.id, // add the user ID to the payload
        role: "admin", // role for middleware check
      };
      admin.token = authHelper.generateToken(payload);
      admin.refreshToken = authHelper.generateRefreshToken(payload);
      commonHelper.response(res, admin, 201, "login is successful");
    } catch (error) {
      console.log(error);
      commonHelper.response(res, null, 500, "Failed log in as admin");
    }
  },

  refreshToken: (req, res) => {
    try {
      const refreshToken = req.body.refreshToken;
      const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_JWT);
      let payload = {
        email: decoded.email,
        id: decoded.id, // add the user ID to the payload
        role: decoded.role, // role for middleware check
      };
      const result = {
        token: authHelper.generateToken(payload),
        refreshToken: authHelper.generateRefreshToken(payload),
      };
      commonHelper.response(
        res,
        result,
        200,
        "Get refresh token is successful"
      );
    } catch (error) {
      console.log(error);
      commonHelper.response(res, null, 500, "Failed generation refresh token");
    }
  },

  profileAdmin: async (req, res) => {
    try {
      const email = req.payload.email;
      const {
        rows: [admin],
        rowCount,
      } = await adminModel.findEmail(email);

      if (!rowCount)
        return commonHelper.response(res, null, 404, "User not found");

      delete admin.password;
      commonHelper.response(res, admin, 200, "Get data profile is successful");
    } catch (error) {
      console.log(error);
      commonHelper.response(res, null, 500, "Failed getting admin profile");
    }
  },
  selectAllAdmin: async (req, res) => {
    try {
      // let sortBY = req.query.sortBY || "id";
      // let search = req.query.search || "";
      // let sort = req.query.sort || "ASC";
      // const page = Number(req.query.page) || 1;
      // const limit = Number(req.query.limit) || 10;
      // const offset = (page - 1) * limit;
      const result = await adminModel.getAllAdmin();

      // const { rows: [count], } = await adminModel.countData();
      // const totalData = parseInt(count.count);
      // const pagination = {
      //   totalData: totalData,
      // };
      commonHelper.response(res, result.rows, 200, "get all admins succes");
    } catch (error) {
      console.log(error);
      commonHelper.response(res, null, 500, "Failed getting all admins");
    }
  },
};

module.exports = adminController;
