const Pool = require('../config/db');

const selectAllReviews = () => {
  return Pool.query(`SELECT * FROM reviews`);
};

const selectDetailReviews = (id) => {
  return Pool.query(`SELECT * FROM reviews WHERE id='${id}'`);
};

const selectUserReviews = (id_user) => {
  return Pool.query(`SELECT * FROM reviews WHERE id_user= '${id_user}'`);
};

const insertReviews = (data) => {
  const { id, id_user, id_flight, rating, title, description } = data;
  return Pool.query(`INSERT INTO reviews(id,id_user, id_flight, rating, title, description ) VALUES('${id}','${id_user}','${id_flight}','${rating}', '${title}' , '${description}')`);
};

const updateReviews = (data) => {
  const { id, rating, title, description } = data;
  return Pool.query(`UPDATE reviews SET rating='${rating}', title='${title}', description='${description}' WHERE id='${id}'`);
};

const deleteReviews = (id) => {
  return Pool.query(`DELETE FROM reviews WHERE id='${id}'`);
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM reviews WHERE id='${id}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const countData = () => {
  return Pool.query('SELECT COUNT(*) FROM reviews');
};

module.exports = {
  selectAllReviews,
  selectUserReviews,
  selectDetailReviews,
  insertReviews,
  updateReviews,
  deleteReviews,
  countData,
  findId,
};
