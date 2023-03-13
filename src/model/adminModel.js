const Pool = require("../config/db");

const findId = (id) => {
  return Pool.query("SELECT * FROM admin WHERE id = $1", [id]);
};

const findEmail = (email) => {
  return Pool.query("SELECT * FROM admin WHERE email = $1", [email]);
};

const insertAdmin = async (data) => {
  return await Pool.query(
    "INSERT INTO admin (id, email, password) VALUES ($1, $2, $3)",
    [data.id, data.email, data.password]
  );
};

const getAllAdmin = async () => {
  return await Pool.query("SELECT * FROM admin")
}

const countData = () => {
  return Pool.query('SELECT COUNT(*) FROM admin')
};

module.exports = { findId, findEmail, insertAdmin, getAllAdmin, countData };
