/* eslint-disable no-unused-vars */
const userModel = require("../model/userModel");
const creditCardModel = require("../model/creditCard");
const uuid = require("uuid");
const commonHelper = require("../helper/common");
const authHelper = require("../helper/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var cloudinary = require("../config/cloudinary");

// verif
const { sendMail } = require("../config/mail");

const userController = {
  registerUser: async (req, res) => {
    try {
      const { fullname, email, password, phone_number } = req.body;
      const checkEmail = await userModel.findEmail(email);
      if (checkEmail.rowCount > 0) {
        return res.json({
          message: "Email already exist",
        });
      }
      const hashPassword = await bcrypt.hash(password, saltRounds);
      const id = uuid.v4();
      const data = {
        id,
        fullname,
        email,
        password: hashPassword,
        phone_number: phone_number,
      };
      const result = await userModel.insertUser(data);
      commonHelper.response(res, result.rows, 201, "Register has been success");
    } catch (err) {
      res.send(err);
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const {
        rows: [user],
      } = await userModel.findEmail(email);
      if (!user) {
        return res.json({
          message: "Email is invalid",
        });
      }
      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) {
        return res.json({
          message: "Password is invalid",
        });
      }
      delete user.password;
      let payload = {
        email: user.email,
        id: user.id, // add the user ID to the payload
        role: "user", // role for middleware check
      };
      user.token = authHelper.generateToken(payload);
      user.refreshToken = authHelper.generateRefreshToken(payload);
      commonHelper.response(res, user, 201, "login is successful");
    } catch (err) {
      res.send(err);
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
      res.send(error);
    }
  },

  profileUser: async (req, res) => {
    try {
      const email = req.payload.email;
      const {
        rows: [user],
        rowCount,
      } = await userModel.findEmail(email);

      if (!rowCount)
        return commonHelper.response(res, null, 404, "User not found");

      const creditCard = await creditCardModel.selectDetailCredit(user.id);
      if(creditCard.rowCount){
        user.creditCards = creditCard.rows;
      } else {
        user.creditCards = []
      }

      delete user.password;
      commonHelper.response(res, user, 200, "Get data profile is successful");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },

  editProfile: async (req, res) => {
    try {
      const userId = req.payload.id;
      const id = req.params.id;
      const {
        fullname,
        email,
        password,
        phone_number,
        city,
        address,
        zipcode,
      } = req.body;
      let image;

      if (userId !== id) {
        return commonHelper.response(
          res,
          null,
          401,
          "You are not authorized to edit this profile"
        );
      }

      let newData = {};
      if (fullname) {
        newData.fullname = fullname;
      }

      if (email) {
        newData.email = email;
      }

      if (password) {
        newData.password = await bcrypt.hash(password, saltRounds);
      }

      if (req.file) {
        const imageUrl = await cloudinary.uploader.upload(req.file.path, {
          folder: "ankasa",
        });
        image = imageUrl.secure_url;
      }

      if (phone_number) {
        newData.phone_number = phone_number;
      }

      if (city) {
        newData.city = city;
      }

      if (address) {
        newData.address = address;
      }

      if (zipcode) {
        newData.zipcode = zipcode;
      }

      const dataPw = await userModel.findId(id);

      const updatedData = {
        name: newData.fullname || dataPw.rows[0].name,
        email: newData.email || dataPw.rows[0].email,
        password: newData.password || dataPw.rows[0].password,
        image: image || dataPw.rows[0].image,
        phone_number: newData.phone_number || dataPw.rows[0].phone_number,
        city: newData.city || dataPw.rows[0].city,
        address: newData.address || dataPw.rows[0].address,
        zipcode: newData.zipcode || dataPw.rows[0].zipcode,
      };

      await userModel.editProfile(
        updatedData.name,
        updatedData.email,
        updatedData.password,
        updatedData.image,
        updatedData.phone_number,
        updatedData.city,
        updatedData.address,
        updatedData.zipcode,
        id
      );

      const responseData = {
        id: dataPw.rows[0].id,
        fullname: updatedData.fullname,
        email: updatedData.email,
        image: updatedData.image,
        phone_number: updatedData.phone_number,
        city: updatedData.city,
        address: updatedData.address,
        zipcode: updatedData.zipcode,
      };

      commonHelper.response(
        res,
        responseData,
        200,
        "Edit profile is successful"
      );
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },

  selectAllUser: async (req, res) => {
    try {
      const result = await userModel.getAllUser();
      const {
        rows: [count],
      } = await userModel.countData();
      const totalData = parseInt(count.count);
      const pagination = {
        totalData: totalData,
      };
      commonHelper.response(
        res,
        result.rows,
        200,
        "get data succes",
        pagination
      );
    } catch (error) {
      console.log(error);
    }
  },

  registerVerif: async (req, res) => {
    try {
      const email = req.body.email;
      const checkEmail = await userModel.findEmail(email);
      if (checkEmail.rowCount > 0) {
        return commonHelper.response(res, null, 400, "Email already used");
      }
      const password = req.body.password;
      const saltRounds = 10
      const hashPassword = await bcrypt.hash(password, saltRounds);
      const id = uuid.v4();
      const payload = {
        fullname: req.body.fullname,
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: hashPassword,
        id: id,
      };
      const token = authHelper.generateToken(payload);
      sendMail(token, req.body.email);
      commonHelper.response(res, null, 200, "Check your email");
    } catch (error) {
      commonHelper.response(res, null, 500, error.detail);
    }
  },

  verifUser: async (req, res) => {
    const token = req.params.id;
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
    } catch (error) {
      if (error && error.name === "JsonWebTokenError") {
        return commonHelper.response(res, null, 401, "Token invalid");
      } else if (error && error.name === "TokenExpiredError") {
        return commonHelper.response(res, null, 403, "Token expired");
      } else {
        return commonHelper.response(res, null, 401, "Token not active");
      }
    }
    try {
      const result = await userModel.selectUserEmail(decoded.email);
      if (result.rowCount > 0) {
        return commonHelper.response(res, null, 400, "Email already verified");
      }
    } catch (err) {
      console.log(err);
      return commonHelper.response(res, null, 500, err.detail);
    }
    userModel
      .insertUser(decoded)
      .then((result) => {
        // Display the result
        return commonHelper.response(res, result.rows, 201, "User created");
      })
      .catch((err) => {
        console.log(err);
        return commonHelper.response(res, null, 400, err.detail);
      });
  },
};

module.exports = userController;
