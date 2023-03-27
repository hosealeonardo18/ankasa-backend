const cityModel = require("../model/city");

const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");
var cloudinary = require("../config/cloudinary");

const cityController = {
    getAllCity: async (req, res) => {
        try {
            let sortBY = req.query.sortBY || "id";
            let search = req.query.search || "";
            let sort = req.query.sort || "ASC";
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            const result = await cityModel.selectAllCity(search, sortBY, sort, limit, offset);
            const { rows: [count], } = await cityModel.countData();
            const totalData = parseInt(count.count);
            const totalPage = Math.ceil(totalData / limit);
            const pagination = {
                currentPage: page,
                limit: limit,
                totalData: totalData,
                totalPage: totalPage,
            };
            commonHelper.response(res, result.rows, 200, "Get all cities success", pagination);
        } catch (error) {
            console.log(error);
            commonHelper.response(res, null, 500, "Failed getting all cities");
        }
    },
    getDetailCity: async (req, res) => {
        try {
            const id = req.params.id;
            const { rowCount } = await cityModel.findId(id);
            if (!rowCount) {
                return res.json({
                    Message: "data not found",
                });
            }
            const result = await cityModel.selectDetailCity(id)
            commonHelper.response(res, result.rows, 200, "get data by id success");
        } catch (error) {
            console.log(error);
            commonHelper.response(res, null, 500, "Failed getting detail city")
        }
    },
    createCity: async (req, res) => {
        try {
            const { name, country, description } = req.body;
            const id = uuidv4();
            const result = await cloudinary.uploader.upload(req.file.path)
            const image = result.secure_url;
            const data = { id, name, country, image, description };
            const result2 = await cityModel.insertCity(data)
            commonHelper.response(res, result2.rows, 201, "City created");
        } catch (error) {
            console.log(error)
            commonHelper.response(res, null, 500, "Failed creating city");
        }
    },
    updateCity: async (req, res) => {
        try {
            const id = req.params.id;
            const { name, country, description } = req.body;
            const result = await cloudinary.uploader.upload(req.file.path)
            const image = result.secure_url;
            const { rowCount } = await cityModel.findId(id);
            if (!rowCount) {
                return res.json({
                    Message: "data not found",
                });
            }
            const data = { id, name, country, image, description };
            const result2 = await cityModel.updateCity(data);

            commonHelper.response(res, result2.rows, 200, "City updated");
        } catch (error) {
            console.log(error)
            commonHelper.response(res, null, 500, "Failed updating city")
        }
    },
    deleteCity: async (req, res) => {
        try {
            const id = req.params.id;
            const { rowCount } = await cityModel.findId(id);
            if (!rowCount) {
                res.json({ message: "ID is Not Found" });
            }
            const result = await cityModel.deleteCity(id)
            commonHelper.response(res, result.rows, 200, "City deleted")
        } catch (error) {
            console.log(error)
            commonHelper.response(res, null, 500, "Failed deleting city")
        }
    },
};

module.exports = cityController;