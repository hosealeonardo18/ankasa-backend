const Pool = require("../config/db");

const findId = (id) => {
  return Pool.query("SELECT * FROM users WHERE id = $1", [id]);
};

const findEmail = (email) => {
  return Pool.query("SELECT * FROM users WHERE email = $1", [email]);
};

const insertUser = async (data) => {
  return await Pool.query(
    "INSERT INTO users (id, fullname, email, password, phone_number) VALUES ($1, $2, $3, $4, $5)",
    [data.id, data.fullname, data.email, data.password, data.phone_number]
  );
};

const editProfile = (
  fullname,
  email,
  password,
  image,
  phone_number,
  city,
  address,
  zipcode,
  id
) => {
  return new Promise((resolve, reject) => {
    const query = {
      text: "UPDATE users SET fullname=$1, email=$2, password=$3, image=$4, phone_number=$5, city=$6, address=$7, zipcode=$8 WHERE id=$9",
      values: [
        fullname,
        email,
        password,
        image,
        phone_number,
        city,
        address,
        zipcode,
        id,
      ],
    };
    Pool.query(query, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const getAllUser = async () => {
  return await Pool.query("SELECT * FROM users")
}

const countData = () => {
  return Pool.query('SELECT COUNT(*) FROM users')
};

module.exports = { findId, findEmail, insertUser, editProfile, getAllUser, countData };
