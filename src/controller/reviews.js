const commonHelper = require('../helper/common');
const { v4: uuidv4 } = require('uuid');
const reviewModel = require('../model/reviews');

const getAllReviews = async (req, res) => {
  try {
    const result = await reviewModel.selectAllReviews();
    if (!result.rowCount) {
      return commonHelper.response(res, null, 404, 'empty review');
    }
    commonHelper.response(res, result.rows, 200, 'done');
  } catch (error) {
    commonHelper.response(res, null, 500, 'fail');

    console.log(error);
  }
};

const getUserReviews = async (req, res) => {
  try {
    const id_user = req.payload.id;
    const result = await reviewModel.selectUserReviews(id_user);
    if (!result.rowCount) {
      return commonHelper.response(res, null, 404, 'empty review');
    }
    commonHelper.response(res, result.rows, 200, 'done');
  } catch (error) {
    commonHelper.response(res, null, 500, 'fail');

    console.log(error);
  }
};

const getDetailReviews = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await reviewModel.selectDetailReviews(id);
    if (!result.rowCount) {
      return commonHelper.response(res, null, 404, 'empty review');
    }
    commonHelper.response(res, result.rows, 200, 'done');
  } catch (error) {
    commonHelper.response(res, null, 500, 'fail');

    console.log(error);
  }
};

const createReviews = async (req, res) => {
  try {
    const data = req.body;
    const id_user = req.payload.id;
    const id_flight = req.params.id;
    data.id_user = id_user;
    data.id_flight = id_flight;
    data.id = uuidv4();
    const result = await reviewModel.insertReviews(data);

    commonHelper.response(res, result.rows, 201, 'done');
  } catch (error) {
    commonHelper.response(res, null, 500, 'fail');

    console.log(error);
  }
};

const updateReviews = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    const findId = await reviewModel.findId(id);
    if (!findId.rowCount) {
      return commonHelper.response(res, null, 404, 'empty review');
    }
    data.id = id;
    const result = await reviewModel.updateReviews(data);
    commonHelper.response(res, result.rows, 201, 'done');
  } catch (error) {
    commonHelper.response(res, null, 500, 'fail');
    console.log(error);
  }
};

const deleteReviews = async (req, res) => {
  try {
    const id = req.params.id;
    const findId = await reviewModel.findId(id);
    if (!findId.rowCount) {
      return commonHelper.response(res, null, 404, 'empty review');
    }
    const result = await reviewModel.deleteReviews(id);
    commonHelper.response(res, result.rows, 200, 'done');
  } catch (error) {
    console.log(error);
    commonHelper.response(res, null, 500, 'fail');
  }
};

module.exports = {
  getAllReviews,
  getUserReviews,
  getDetailReviews,
  createReviews,
  updateReviews,
  deleteReviews,
};
