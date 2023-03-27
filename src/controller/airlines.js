const airlineModel = require("../model/airlines");
const googleDrive = require("../config/googleDrive");

const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");

const airlinesController = {
  getAllAirlines: async (req, res) => {
    try {
      let sortBY = req.query.sortBY || "id";
      let search = req.query.search || "";
      let sort = req.query.sort || "ASC";
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const result = await airlineModel.selectAllAirlines(search, sortBY, sort, limit, offset);
      const { rows: [count], } = await airlineModel.countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      commonHelper.response(res, result.rows, 200, "get data succes", pagination);
    } catch (error) {
      console.log(error);
      commonHelper.response(res, null, 500, "Failed getting all airlines");
    }
  },
  getDetailAirlines: async (req, res) => {
    try {
      const id = req.params.id;
      const { rowCount } = await airlineModel.findId(id);
      if (!rowCount) {
        return res.json({
          Message: "data not found",
        });
      }
      const result = await airlineModel.selectDetailAirlines(id)
      commonHelper.response(res, result.rows, 200, "get data by id success");

    } catch (error) {
      console.log(error);
      commonHelper.response(res, null, 500, "Failed getting detail airline");
    }
  },
  createAirlines: async (req, res) => {
    try {
      let { name, email, website, phone_number, availability } = req.body;
      if (availability == undefined) {
        availability = true;
      }
      const id = uuidv4();

      // Google Drive
      const uploadResult = await googleDrive.uploadImage(req.file)
      const parentPath = process.env.GOOGLE_DRIVE_PHOTO_PATH;
      const image = parentPath.concat(uploadResult.id)

      const data = { id, name, email, image, website, phone_number, availability };

      const result2 = airlineModel.insertAirlines(data)

      commonHelper.response(res, result2.rows, 201, "Airlines created");
    } catch (error) {
      console.log(error)
      commonHelper.response(res, null, 500, "Failed getting airlines");
    }
  },

  updateAirlines: async (req, res) => {
    try {
      const id = req.params.id;
      let { name, email, website, phone_number, availability } = req.body;
      if (availability == undefined) {
        availability = true;
      }
      let image = "";
      const oldAirline = await airlineModel.selectDetailAirlines(id)

      if (req.file) {
        const oldPhoto = oldAirline.rows[0].image;
        const oldPhotoId = oldPhoto.split("=")[1];
        const updateResult = await googleDrive.updateImage(req.file, oldPhotoId)
        const parentPath = process.env.GOOGLE_DRIVE_PHOTO_PATH;
        image = parentPath.concat(updateResult.id)
      } else {
        image = oldAirline.rows[0].image;
      }

      const { rowCount } = await airlineModel.findId(id);
      if (!rowCount) {
        return res.json({
          Message: "data not found",
        });
      }
      const data = { id, name, email, image, website, phone_number, availability };
      const result = await airlineModel.updateAirlines(data);

      commonHelper.response(res, result.rows, 201, "Airline updated");
    } catch (error) {
      console.log(error);
      commonHelper.response(res, null, 500, "Failed updating airline")
    }
  },
  airlinesAvailability: async (req, res) => {
    try {
      const id = req.params.id;
      let { availability } = req.body;
  
      const { rowCount } = await airlineModel.findId(id);
      if (!rowCount) {
        return res.json({
          Message: "data not found",
        });
      }
      const data = { id, availability }
      const result = await airlineModel.setAirlineAvailability(data)
      commonHelper.response(res, result.rows, 200, "Airline status updated");
    } catch (error) {
      console.log(error)
      commonHelper.response(res, null, 500, "Failed updating airline availability");
    }
  },
  deleteAirlines: async (req, res) => {
    try {
      const id = req.params.id;
      const { rowCount } = await airlineModel.findId(id);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      const oldAirline = await airlineModel.selectDetailAirlines(id);
      const oldPhoto = oldAirline.rows[0].image;
      const oldPhotoId = oldPhoto.split("=")[1];
      await googleDrive.deleteImage(oldPhotoId)
      const result = await airlineModel.deleteAirlines(id)
      commonHelper.response(res, result.rows, 200, "Airline deleted")
    } catch (error) {
      console.log(error)
      commonHelper.response(res, null, 500, "Failed deleting airline");
    }
  }
};

module.exports = airlinesController;