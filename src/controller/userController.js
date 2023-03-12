/* eslint-disable no-unused-vars */
const userModel = require("../model/userModel");
const uuid = require("uuid");
const commonHelper = require("../helper/common");
const authHelper = require("../helper/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var cloudinary = require("../config/cloudinary");

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
      };
      // console.log(payload)
      user.token = authHelper.generateToken(payload);
      user.refreshToken = authHelper.generateRefreshToken(payload);
      commonHelper.response(res, user, 201, "login is successful");
    } catch (err) {
      res.send(err);
    }
  },

  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_JWT);
    let payload = {
      email: decoded.email,
    };
    const result = {
      token: authHelper.generateToken(payload),
      refreshToken: authHelper.generateRefreshToken(payload),
    };
    commonHelper.response(res, result, 200, "Get refresh token is successful");
  },

  profileUser: async (req, res) => {
    const email = req.payload.email;
    const {
      rows: [user],
    } = await userModel.findEmail(email);
    delete user.password;
    commonHelper.response(res, user, 200, "Get data profile is successful");
  },

  editProfile: async (req, res) => {
    const userId = req.payload.id;
    const id = req.params.id;
    const { fullname, password, phone_number, city, address, zipcode } =
      req.body;
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
    if (password) {
      newData.password = await bcrypt.hash(password, saltRounds);
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

    if (req.file) {
      const imageUrl = await cloudinary.uploader.upload(req.file.path, {
        folder: "ankasa",
      });
      image = imageUrl.secure_url;
    }

    const dataPw = await userModel.findId(id);

    const updatedData = {
      name: newData.fullname || dataPw.rows[0].name,
      password: newData.password || dataPw.rows[0].password,
      image: image || dataPw.rows[0].image,
      phone_number: newData.phone_number || dataPw.rows[0].phone_number,
      city: newData.city || dataPw.rows[0].city,
      address: newData.address || dataPw.rows[0].address,
      zipcode: newData.zipcode || dataPw.rows[0].zipcode,
    };

    await userModel.editProfile(
      updatedData.name,
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
      email: dataPw.rows[0].email,
      phone_number: dataPw.rows[0].phone_number,
      city: dataPw.rows[0].city,
      address: dataPw.rows[0].address,
      zipcode: dataPw.rows[0].zipcode,
      image: updatedData.image,
    };

    commonHelper.response(res, responseData, 200, "Edit profile is successful");
  },
};

module.exports = userController;
