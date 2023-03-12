const Pool = require('../config/db');

const selectAllAirlines = (search, sortBY, sort, limit, offset) => {
    return Pool.query(`SELECT * FROM airlines WHERE name LIKE '%${search}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectDetailAirlines = (id) =>{
    return Pool.query(`SELECT * FROM airlines WHERE id='${id}'`);
};

const insertAirlines = (data) => {
    const { id, name, email, image, website, phone_number, availability } = data;
    return Pool.query(`INSERT INTO airlines(id,name,email,image,website,phone_number,availability) VALUES('${id}','${name}','${email}','${image}','${website}','${phone_number}','${availability}')`);
};

const updateAirlines = (data) => {
    const { id, name, email, image, website, phone_number, availability } = data;
    return Pool.query(`UPDATE airlines SET name='${name}', email='${email}', image='${image}', website='${website}', phone_number='${phone_number}', availability='${availability}' WHERE id='${id}'`);
};

const setAirlineAvailability = (data) => {
    const { id, availability } = data;
    return Pool.query(`UPDATE airlines SET availability='${availability}' WHERE id='${id}'`);
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
    setAirlineAvailability,
    deleteAirlines,
    countData,
    findId
}