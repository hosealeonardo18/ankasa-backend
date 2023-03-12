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
  password,
  image,
  city,
  address,
  phone_number,
  zipcode,
  id
) => {
  return new Promise((resolve, reject) => {
    const query = {
      text: "UPDATE users SET fullname=$1, password=$2, image=$3, city=$4, address=$5, phone_number=$6, zipcode=$7 WHERE id=$8",
      values: [
        fullname,
        password,
        image,
        city,
        address,
        phone_number,
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

module.exports = { findId, findEmail, insertUser, editProfile };
