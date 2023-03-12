const {
  selectAllAirlines,
  selectDetailAirlines,
  insertAirlines,
  updateAirlines,
  deleteAirlines,
  countData,
  findId,
} = require("../model/airlines");

const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");
var cloudinary = require("../config/cloudinary");

const airlinesController = {
  getAllAirlines: async (req, res) => {
    try {
      let sortBY = req.query.sortBY || "id";
      let search = req.query.search || "";
      let sort = req.query.sort || "ASC";
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const result = await selectAllAirlines(search, sortBY, sort, limit, offset);
      const { rows: [count], } = await countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      commonHelper.response(res,result.rows,200,"get data succes",pagination);
    } catch (error) {
        console.log(error);
    }
  },
  getDetailAirlines: async (req, res) => {
    try {
        const id = req.params.id;
        const { rowCount } = await findId(id);
        if (!rowCount) {
          return res.json({
            Message: "data not found",
          });
        }
        selectDetailAirlines(id)
        .then((result) => {
            commonHelper.response(res, result.rows, 200, "get data by id success");
          })
        .catch((err) => res.send(err));
    } catch (error) {
        console.log(error);
    }
  },
  createAirlines: async (req, res) => {
    const { name, email, website, phone_number, availability } = req.body;
    const id = uuidv4();
    const result = await cloudinary.uploader.upload(req.file.path)
    const image = result.secure_url;
    const data = { id, name, email, image, website, phone_number, availability };
    console.log(data);
    insertAirlines(data)
    .then((result) => {
        commonHelper.response(res, result.rows, 201, "Airlines created");
    })
    .catch((err) => res.status(500).json(err));
  },
  updateAirlines: async (req, res) => {
    const id = req.params.id;
    const { name, email, image, website, phone_number, availability } = req.body;
    const { rowCount } = await findId(id);
    if (!rowCount) {
        return res.json({
          Message: "data not found",
        });
    }
    const data = { id, name, email, image, website, phone_number, availability };
    updateAirlines(data)
    .then((result) => {
        console.log(result);
        commonHelper.response(res, result.rows, 200, "Worker updated");
      })
    .catch((err) => res.status(500).json(err));
  },
  deleteAirlines: async (req, res) => {
    const id = req.params.id;
    const { rowCount } = await findId(id);
    if (!rowCount) {
        res.json({ message: "ID is Not Found" });
    }
    deleteAirlines(id)
    .then((result) => {
        commonHelper.response(res, result.rows, 200, "Airlines deleted")
    })
    .catch((err) => res.send(err));
  }
};

module.exports = airlinesController;