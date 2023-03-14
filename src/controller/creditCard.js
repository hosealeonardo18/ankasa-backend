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
            const result = await selectAllCredit(search,sortBY,sort,limit,offset);
            const { rows: [count], } = await countData();
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
        }
    },
    getDetailCredit: async (req, res) => {
        try {
            const id_user = req.params.id;
            console.log(id_user);
            const { rowCount } = await findIdUser(id_user);
            if (!rowCount) {
                return res.json({
                    Message: "data not found",
                });
            }
            selectDetailCredit(id_user)
                .then((result) => {
                    commonHelper.response(res, result.rows, 200, "get data by user id success");
                })
                .catch((err) => res.send(err));
        } catch (error) {
            console.log(error);
        }
    },
    createCredit: async (req, res) => {
        const { fullname, credit_number, expire, cvv, balance } = req.body;
        const id = uuidv4();
        const id_user = req.payload.id;
        const data = { id, fullname, credit_number, expire, cvv, balance };
        data.id_user = id_user;
        console.log(data);
        insertCredit(data)
            .then((result) => {
                commonHelper.response(res, result.rows, 201, "Credit Card created");
            })
            .catch((err) => res.status(500).json(err));
    },
    setPreffered: async (req, res) => {
        try {
            const id = req.params.id;
            const id_user = req.payload.id;
            
            const unsetResult = await unsetPreffered(id_user);
            const setResult = await setPreffered(id);

            commonHelper.response(res, setResult.rows, 201, "set preffered credit card success");
        } catch (error) {
            commonHelper.response(res, null, "set preffered credit card failed")
        }
    },
    updateCredit: async (req, res) => {
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
        console.log(data);
        updateCredit(data)
            .then((result) => {
                console.log(result);
                commonHelper.response(res, result.rows, 200, "Credit Card updated");
            })
            .catch((err) => res.status(500).json(err));
    },
    deleteCredit: async (req, res) => {
        const id = req.params.id;
        const { rowCount } = await findId(id);
        if (!rowCount) {
            res.json({ message: "ID is Not Found" });
        }
        deleteCredit(id)
            .then((result) => {
                commonHelper.response(res, result.rows, 200, "Credit Card deleted")
            })
            .catch((err) => res.send(err));
    },
};

module.exports = creditCardController;