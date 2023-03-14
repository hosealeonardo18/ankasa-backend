const Pool = require('../config/db');

const selectAllNotifications = (search, sortBY, sort, limit, offset) => {
    return Pool.query(`SELECT * FROM notifications WHERE name ILIKE '%${search}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectDetailNotifications = (id) =>{
    return Pool.query(`SELECT * FROM notifications WHERE id='${id}'`);
};

const insertNotifications = (data) => {
    const { id, name, country, image, description } = data;
    return Pool.query(`INSERT INTO notifications(id,name,country,image, description) VALUES('${id}','${name}','${country}','${image}', '${description}')`);
};

const updateNotifications = (data) => {
    const { id, name, country, image, description } = data;
    return Pool.query(`UPDATE notifications SET name='${name}', country='${country}', image='${image}', description='${description}' WHERE id='${id}'`);
};

const deleteNotifications = (id) => {
    return Pool.query(`DELETE FROM notifications WHERE id='${id}'`);
};

const findId = (id) => {
    return new Promise((resolve, reject) => 
        Pool.query(`SELECT id FROM notifications WHERE id='${id}'`, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    )
};

const countData = () => {
    return Pool.query('SELECT COUNT(*) FROM notifications')
};

module.exports = {
    selectAllNotifications,
    selectDetailNotifications,
    insertNotifications,
    updateNotifications,
    deleteNotifications,
    countData,
    findId
}