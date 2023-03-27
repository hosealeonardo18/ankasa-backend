const Pool = require('../config/db');

const selectAllBooking = (search, sortBY, sort, limit, offset) => {
    return Pool.query(`select booking.*, flights.id_airline, 
        flights.date_departure, flights.time_departure, 
        flights.city_departure_code, flights.city_destination_code, 
        airlines.name, flights.code, jsonb_agg(passengers.*) as passengers 
        from booking left join passengers on booking.id = passengers.id_booking 
        inner join flights on booking.id_flight = flights.id inner join 
        airlines on flights.id_airline = airlines.id WHERE booking.booking_name ILIKE '%${search}%' group by booking.id, 
        flights.id_airline, flights.date_departure, flights.time_departure, 
        flights.city_departure_code, flights.city_destination_code, airlines.name, 
        flights.code ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectUserBooking = (id_user) => {
    return Pool.query(`select booking.*, flights.id_airline, 
    flights.date_departure, flights.time_departure, 
    flights.city_departure_code, flights.city_destination_code, 
    airlines.name, flights.code, jsonb_agg(passengers.*) as passengers 
    from booking left join passengers on booking.id = passengers.id_booking 
    inner join flights on booking.id_flight = flights.id inner join 
    airlines on flights.id_airline = airlines.id where booking.id_user='${id_user}' group by booking.id, 
    flights.id_airline, flights.date_departure, flights.time_departure, 
    flights.city_departure_code, flights.city_destination_code, airlines.name, 
    flights.code`);
};

const selectDetailBooking = (id) => {
    return Pool.query(`select booking.*, flights.id_airline, 
    flights.date_departure, flights.time_departure, 
    flights.city_departure_code, flights.city_destination_code, 
    airlines.name, flights.code, jsonb_agg(passengers.*) as passengers 
    from booking left join passengers on booking.id = passengers.id_booking 
    inner join flights on booking.id_flight = flights.id inner join 
    airlines on flights.id_airline = airlines.id WHERE booking.id='${id}' group by booking.id, 
    flights.id_airline, flights.date_departure, flights.time_departure, 
    flights.city_departure_code, flights.city_destination_code, airlines.name, 
    flights.code`);
};

const insertBooking = (data) => {
    const { id, id_user, id_flight, id_credit_card, insurance, status,
        created_at, booking_name, email, phone_number } = data;
    return Pool.query(`INSERT INTO booking VALUES('${id}', '${id_user}', 
        '${id_flight}','${id_credit_card}', '${insurance}', '${status}', 
        to_timestamp(${created_at} / 1000.0), '${booking_name}', '${email}', 
        '${phone_number}')`);
};

const setBookingStatus = (id, status) => {
    return Pool.query(`UPDATE booking SET status='${status}' WHERE id='${id}'`);
}

const updateBooking = (data) => {
    const { id, id_flight, id_credit_card, insurance, status, booking_name,
        email, phone_number } = data;
    return Pool.query(`UPDATE booking SET id_flight='${id_flight}', 
        id_credit_card='${id_credit_card}', insurance='${insurance}', 
        status='${status}', booking_name='${booking_name}', email='${email}', 
        phone_number='${phone_number}' WHERE id='${id}'`);
};

const deleteBooking = (id) => {
    return Pool.query(`DELETE FROM booking WHERE id='${id}'`);
};

const findId = (id) => {
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT id FROM booking WHERE id='${id}'`,
            (error, result) => (!error) ? resolve(result) : reject(error)));
};

const countData = () => {
    return Pool.query('SELECT COUNT(*) FROM booking')
};

module.exports = {
    selectAllBooking,
    selectUserBooking,
    selectDetailBooking,
    setBookingStatus,
    insertBooking,
    updateBooking,
    deleteBooking,
    countData,
    findId
}