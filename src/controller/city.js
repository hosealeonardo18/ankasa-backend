const cityModel = require("../model/city");
const googleDrive = require("../config/googleDrive");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");

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

            // Google drive
            const uploadResult = await googleDrive.uploadImage(req.file)
            const parentPath = process.env.GOOGLE_DRIVE_PHOTO_PATH;
            const image = parentPath.concat(uploadResult.id);

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
            const result = await cityModel.findId(id);
            if (!result.rowCount) {
                return res.json({
                    Message: "data not found",
                });
            }

            // Google drive
            let image = "";
            if (req.file) {
                const oldPhoto = result.rows[0].image;
                const oldPhotoId = oldPhoto.split("=")[1];
                const updateResult = await googleDrive.updateImage(req.file, oldPhotoId)
                const parentPath = process.env.GOOGLE_DRIVE_PHOTO_PATH;
                image = parentPath.concat(updateResult.id);
            } else {
                image = result.rows[0].image;
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
            const result = await cityModel.findId(id);
            if (!result.rowCount) {
                return res.json({ message: "ID is Not Found" });
            }

            // Google drive
            const oldImage = result.rows[0].image;
            const oldImageid = oldImage.split("=")[1];
            await googleDrive.deleteImage(oldImageid);

            const result2 = await cityModel.deleteCity(id)
            commonHelper.response(res, result2.rows, 200, "City deleted")
        } catch (error) {
            console.log(error)
            commonHelper.response(res, null, 500, "Failed deleting city")
        }
    },
};

module.exports = cityController;