const Pool = require('../config/db');

const selectAllCity = (search, sortBY, sort, limit, offset) => {
    return Pool.query(`SELECT * FROM city WHERE name LIKE '%${search}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectDetailCity = (id) =>{
    return Pool.query(`SELECT * FROM city WHERE id='${id}'`);
};

const insertCity = (data) => {
    const { id, name, country, image, description } = data;
    return Pool.query(`INSERT INTO city(id,name,country,image, description) VALUES('${id}','${name}','${country}','${image}', '${description}')`);
};

const updateCity = (data) => {
    const { id, name, country, image, description } = data;
    return Pool.query(`UPDATE city SET name='${name}', country='${country}', image='${image}', description='${description}' WHERE id='${id}'`);
};

const deleteCity = (id) => {
    return Pool.query(`DELETE FROM city WHERE id='${id}'`);
};

const findId = (id) => {
    return new Promise((resolve, reject) => 
        Pool.query(`SELECT * FROM city WHERE id='${id}'`, (error, result) => {
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