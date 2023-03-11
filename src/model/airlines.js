const Pool = require('../config/db');

const selectAllAirlines = (search, sortBY, sort, limit, offset) => {
    return Pool.query(`SELECT * FROM airlines WHERE name LIKE '%${search}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectDetailAirlines = (id) =>{
    return Pool.query(`SELECT * FROM airlines WHERE id='${id}'`);
};

const insertAirlines = (data) => {
    const { id, name, logo, date_created } = data;
    return Pool.query(`INSERT INTO airlines(id,name,logo,date_created) VALUES('${id}','${name}','${logo}','${date_created}')`);
};

const updateAirlines = (data) => {
    const { id, name, logo, date_created } = data;
    return Pool.query(`UPDATE airlines SET name='${name}', logo='${logo}', date_created='${date_created}' WHERE id='${id}'`);
};

const deleteAirlines = (id) => {
    return Pool.query(`DELETE FROM airlines WHERE id='${id}'`);
};

const findId = (id) => {
    return new Promise((resolve, reject) => 
        Pool.query(`SELECT id FROM airlines WHERE id='${id}'`, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    )
};

const countData = () => {
    return Pool.query('SELECT COUNT(*) FROM airlines')
};

module.exports = {
    selectAllAirlines,
    selectDetailAirlines,
    insertAirlines,
    updateAirlines,
    deleteAirlines,
    countData,
    findId
}