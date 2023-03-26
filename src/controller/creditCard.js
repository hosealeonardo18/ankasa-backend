const {
    selectAllCredit,
    selectDetailCredit,
    insertCredit,
    updateCredit,
    deleteCredit,
    countData,
    findId,
    findIdUser,
    setPreffered,
    unsetPreffered
} = require("../model/creditCard");

const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");

const creditCardController = {
    getAllCredit: async (req, res) => {
        try {
            let sortBY = req.query.sortBY || "id";
            let search = req.query.search || "";
            let sort = req.query.sort || "ASC";
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            const result = await selectAllCredit(search, sortBY, sort, limit, offset);
            const { rows: [count], } = await countData();
            const totalData = parseInt(count.count);
            const totalPage = Math.ceil(totalData / limit);
            const pagination = {
                currentPage: page,
                limit: limit,
                totalData: totalData,
                totalPage: totalPage,
            };
            commonHelper.response(res, result.rows, 200, "Get all credit cards success", pagination);
        } catch (error) {
            commonHelper.response(res, null, 500, "Failed getting all credit cards");
            console.log(error);
        }
    },
    getUserCreditCards: async (req, res) => {
        try {
            const id_user = req.params.id;
            const { rowCount } = await findIdUser(id_user);
            if (!rowCount) return commonHelper.response(res, null, 404,
                "User doesn't have a credit card");

            const result = await selectDetailCredit(id_user);
            commonHelper.response(res, result.rows, 200, "Get user credit cards success");
        } catch (error) {
            console.log(error);
            commonHelper.response(res, null, 500, "Failed getting user credit cards");
        }
    },
    createCreditCard: async (req, res) => {
        try {
            const { fullname, credit_number, expire, cvv, balance } = req.body;
            const id = uuidv4();
            const id_user = req.payload.id;
            const data = { id, fullname, credit_number, expire, cvv, balance };
            data.id_user = id_user;
            const result = await insertCredit(data)
            commonHelper.response(res, result.rows, 201, "Credit card added");
        } catch (error) {
            console.log(error);
            commonHelper.response(res, null, 500, "Failed adding credit card");
        }
    },
    setPreffered: async (req, res) => {
        try {
            const id = req.params.id;
            const id_user = req.payload.id;

            await unsetPreffered(id_user);
            const setResult = await setPreffered(id);

            commonHelper.response(res, setResult.rows, 201, "set preffered credit card success");
        } catch (error) {
            console.log(error);
            commonHelper.response(res, null, "set preffered credit card failed");
        }
    },

    updateCredit: async (req, res) => {
        try {
            const id = req.params.id;
            const { fullname, credit_number, expire, cvv, balance } = req.body;
            const id_user = req.payload.id;
            const { rowCount } = await findId(id);
            if (!rowCount) {
                return res.json({
                    Message: "data not found",
                });
            }
            const data = { id, fullname, credit_number, expire, cvv, balance };
            data.id_user = id_user;
            const result = await updateCredit(data)
            commonHelper.response(res, result.rows, 201, "Credit card updated");
        } catch (error) {
            console.log(error)
            commonHelper.response(res, null, 500, "Failed updating credit card");
        }
    },

    deleteCredit: async (req, res) => {
        try {
            const id = req.params.id;
            const { rowCount } = await findId(id);
            if (!rowCount) return commonHelper.response(res, null, 404,
                "Credit card not found");
            const result = await deleteCredit(id)
            commonHelper.response(res, result.rows, 200, "Credit Card deleted");
        } catch (error) {
            console.log(error)
            commonHelper.response(res, null, 500, "Failed deleting credit card");
        }
    },
};

module.exports = creditCardController;