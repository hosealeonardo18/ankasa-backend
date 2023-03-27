const Pool = require("../config/db");

const findId = (id) => {
  return Pool.query("SELECT * FROM admin WHERE id = $1", [id]);
};

const findEmail = (email) => {
  return Pool.query("SELECT * FROM admin WHERE email = $1", [email]);
};

const insertAdmin = async (data) => {
  return await Pool.query(
    "INSERT INTO admin (id, fullname, email, password, admin_role, admin_status, airline_crud, flight_crud, booking_crud, city_crud) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
    [data.id, data.fullname, data.email, data.password, data.admin_role, data.admin_status, data.airline_crud, data.flight_crud, data.booking_crud, data.city_crud]
  );
};

const createSuperAdmin = async (data) => {
  return await Pool.query(
    "INSERT INTO admin (id, fullname, email, password, admin_role, admin_status, airline_crud, flight_crud, booking_crud, city_crud) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
    [data.id, data.fullname, data.email, data.password, data.admin_role, data.admin_status, data.airline_crud, data.flight_crud, data.booking_crud, data.city_crud]
  );
};

const getAllAdmin = async () => {
  return await Pool.query("SELECT * FROM admin")
}

const countData = () => {
  return Pool.query('SELECT COUNT(*) FROM admin')
};

const findRole = (admin_role) => {
  return Pool.query("SELECT * FROM admin WHERE admin_role = $1", [admin_role]);
};

const updateAdmin = (data) => {
  const {id, fullname, email, password, admin_status, airline_crud, flight_crud, booking_crud, city_crud} = data;
  return Pool.query(`UPDATE admin set fullname='${fullname}', email='${email}', password='${password}', admin_status='${admin_status}', airline_crud='${airline_crud}', flight_crud='${flight_crud}', booking_crud='${booking_crud}', city_crud='${city_crud}' WHERE id='${id}'`)
}

const deleteAdmin = (id) => {
  return Pool.query(`DELETE FROM admin WHERE id='${id}'`);
};

module.exports = { findId, findEmail, insertAdmin, createSuperAdmin, getAllAdmin, countData, findRole, updateAdmin, deleteAdmin };
