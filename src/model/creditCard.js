const Pool = require('../config/db');

const selectAllCredit = (search, sortBY, sort, limit, offset) => {
    return Pool.query(`SELECT * FROM credit_card WHERE name LIKE '%${search}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectDetailCredit = (id) =>{
    return Pool.query(`SELECT * FROM credit_card WHERE id='${id}'`);
};

const insertCredit = (data) => {
    const { id, fullname, credit_number, expire, cvv, balance } = data;
    return Pool.query(`INSERT INTO credit_card(id,fullname,credit_number,expire,cvv,balance) VALUES('${id}','${fullname}','${credit_number}','${expire}','${cvv}','${balance}')`);
};

const updateCredit = (data) => {
    const { id, fullname, credit_number, expire, cvv, balance } = data;
    return Pool.query(`UPDATE credit_card SET fullname='${fullname}', credit_number='${credit_number}', expire='${expire}', cvv='${cvv}', balance='${balance}' WHERE id='${id}'`);
};

const deleteCredit = (id) => {
    return Pool.query(`DELETE FROM credit_card WHERE id='${id}'`);
};

const findId = (id) => {
    return new Promise((resolve, reject) => 
        Pool.query(`SELECT id FROM credit_card WHERE id='${id}'`, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    )
};

const countData = () => {
    return Pool.query('SELECT COUNT(*) FROM credit_card')
};

module.exports = {
    selectAllCredit,
    selectDetailCredit,
    insertCredit,
    updateCredit,
    deleteCredit,
    countData,
    findId
}