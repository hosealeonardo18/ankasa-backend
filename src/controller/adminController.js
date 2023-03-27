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
      const { email, password, airline_crud, flight_crud, booking_crud, city_crud } = req.body;
      const checkEmail = await adminModel.findEmail(email);
      if (checkEmail.rowCount > 0) {
        return res.json({
          message: "Email already exist",
        });
      }
      const hashPassword = await bcrypt.hash(password, saltRounds);
      const id = uuid.v4();
      const admin_role = 'admin';
      const data = {
        id,
        email,
        password: hashPassword,
        admin_role,
        airline_crud: false,
        flight_crud: false,
        booking_crud: false,
        city_crud: false
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
        role: admin.admin_role, // role for middleware check
        airline: admin.airline_crud,
        flight: admin.flight_crud,
        booking: admin.booking_crud,
        city: admin.city_crud
      };
      console.log(payload)
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
      // const airline_crud = req.payload.airline;
      // const flight_crud = req.payload.airline;
      // const booking_crud = req.payload.airline;
      // const city_crud = req.payload.airline;
      // if (airline_crud == false) {
      //   delete admin.airline_crud;
      // }
      // if (flight_crud == false) {
      //   delete admin.flight_crud;
      // }
      // if (booking_crud == false) {
      //   delete admin.booking_crud;
      // }
      // if (city_crud == false) {
      //   delete admin.city_crud;
      // }
      commonHelper.response(res, admin, 200, "Get data profile is successful");
    } catch (error) {
      console.log(error);
      commonHelper.response(res, null, 500, "Failed getting admin profile");
    }
  },
  updateAdmin: async (req, res) => {
    const id = req.params.id;
    const { email, password, airline_crud, flight_crud, booking_crud, city_crud } = req.body;
    const { rowCount } = await adminModel.findId(id);
    if (!rowCount) {
      return res.json({
        Message: "data not found",
      });
    }
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const data = { id, email, password: hashPassword, airline_crud, flight_crud, booking_crud, city_crud };
    adminModel.updateAdmin(data)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "Data admin updated");
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteAdmin: async (req, res) => {
    const id = req.params.id;
    const { rowCount } = await adminModel.findId(id);
    if (!rowCount) {
      res.json({ message: "ID is Not Found" });
    }
    adminModel.deleteAdmin(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "Admin deleted")
      })
      .catch((err) => res.send(err));
  },
  selectAllAdmin: async (req, res) => {
    try {
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
  createSuperAdmin: async (req, res) => {
    try {
      const { email, password, airline_crud, flight_crud, booking_crud, city_crud } = req.body;
      const checkEmail = await adminModel.findEmail(email);
      if (checkEmail.rowCount > 0) {
        return res.json({
          message: "Email already exist",
        });
      }
      const hashPassword = await bcrypt.hash(password, saltRounds);
      const id = uuid.v4();
      const admin_role = 'super admin';
      const checkSuperAdmin = await adminModel.findRole(admin_role);
      if (checkSuperAdmin.rowCount > 0) {
        return res.json({
          message: "Super admin just one and only",
        });
      }
      const data = {
        id,
        email,
        password: hashPassword,
        admin_role,
        airline_crud,
        flight_crud,
        booking_crud,
        city_crud
      };
      console.log(data);
      const result = await adminModel.createSuperAdmin(data);
      commonHelper.response(res, result.rows, 201, "success register account super admin");
    } catch (err) {
      res.send(err);
    }
  },
};

module.exports = adminController;
