const Pool = require('../config/db');

const selectAllCity = (search, sortBY, sort, limit, offset) => {
    return Pool.query(`SELECT * FROM city WHERE name LIKE '%${search}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectDetailCity = (id) =>{
    return Pool.query(`SELECT * FROM city WHERE id='${id}'`);
};

const insertCity = (data) => {
    const { id, name, country, image } = data;
    return Pool.query(`INSERT INTO city(id,name,country,image) VALUES('${id}','${name}','${country}','${image}')`);
};

const updateCity = (data) => {
    const { id, name, email, country, image } = data;
    return Pool.query(`UPDATE city SET name='${name}', country='${country}', image='${image}' WHERE id='${id}'`);
};

const deleteCity = (id) => {
    return Pool.query(`DELETE FROM city WHERE id='${id}'`);
};

const findId = (id) => {
    return new Promise((resolve, reject) => 
        Pool.query(`SELECT id FROM city WHERE id='${id}'`, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    )
};

const countData = () => {
    return Pool.query('SELECT COUNT(*) FROM city')
};

module.exports = {
    selectAllCity,
    selectDetailCity,
    insertCity,
    updateCity,
    deleteCity,
    countData,
    findId
}