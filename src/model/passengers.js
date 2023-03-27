const Pool = require('../config/db');

const selectAllPassengers = () => {
    return Pool.query(`SELECT * FROM passengers`);
};

const selectBookingPassengers = (id_booking) => {
    return Pool.query(`SELECT * FROM passengers WHERE 
        id_booking='${id_booking}'`);
};

const selectDetailPassengers = (id) => {
    return Pool.query(`select passengers.*, booking.id_user, booking.id_flight, 
        flights.id_airline, airlines.name, airlines.image, 
        flights.city_departure_code, flights.city_destination_code, 
        flights.code, flights.flight_class, flights.terminal, flights.gate, 
        flights.date_departure, flights.time_departure from passengers 
        right join booking on booking.id = passengers.id_booking inner join 
        flights on booking.id_flight = flights.id inner join airlines on 
        flights.id_airline = airlines.id where passengers.id='${id}'`);
};

const insertPassengers = (data) => {
    const { id, id_booking, title, fullname, nationality, passenger_type,
        seat } = data;
    return Pool.query(`INSERT INTO passengers VALUES('${id}', '${id_booking}', 
        '${title}','${fullname}', '${nationality}', '${passenger_type}')`);
};

const updatePassengers = (data) => {
    const { id, title, fullname, nationality, passenger_type, seat } = data;
    return Pool.query(`UPDATE passengers title='${title}', 
        fullname='${fullname}', nationality='${nationality}', 
        passengers_type='${passenger_type}' WHERE id='${id}'`);
};

const deletePassengers = (id) => {
    return Pool.query(`DELETE FROM passengers WHERE id='${id}'`);
};

const findId = (id) => {
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT id FROM passengers WHERE id='${id}'`,
            (error, result) => (!error) ? resolve(result) : reject(error)));
};

const countData = () => {
    return Pool.query('SELECT COUNT(*) FROM passengers')
};

module.exports = {
    selectAllPassengers,
    selectDetailPassengers,
    selectBookingPassengers,
    insertPassengers,
    updatePassengers,
    deletePassengers,
    countData,
    findId
}