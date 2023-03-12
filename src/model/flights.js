const Pool = require('../config/db');

const selectAllFlights = (data) => {
    const { cityDept, cityDest, transit, luggage, inflight_meal, wifi, deptTimeStart,
        deptTimeEnd, arriveTimeStart, arriveTimeEnd, airline, ticketPriceStart, ticketPriceEnd, sortBY, sort, limit, offset } = data;

    let filterQuery = `SELECT airlines.name AS "airline", airlines.availability, airlines.image, flights.* FROM flights INNER JOIN airlines ON flights.id_airline = airlines.id WHERE `
    
    filterQuery += `city_departure ILIKE '%${cityDept}%' AND city_destination ILIKE '%${cityDest}%' `
    if (transit) filterQuery += `AND transit_count>=${transit} `
    if (luggage) filterQuery += `AND luggage=${luggage} `
    if (inflight_meal) filterQuery += `AND inflight_meal=${inflight_meal} `
    if (wifi) filterQuery += `AND wifi=${wifi} `
    if (deptTimeStart && deptTimeEnd) filterQuery += `AND time_departure>=${deptTimeStart} AND time_departure<=${deptTimeEnd} `
    if (arriveTimeStart && arriveTimeEnd) filterQuery += `AND time_arrival>=${arriveTimeStart} AND time_arrival<=${arriveTimeEnd} `
    if (arriveTimeStart && arriveTimeEnd) filterQuery += `AND time_arrival>=${arriveTimeStart} AND time_arrival<=${arriveTimeEnd} `
    if (airline) filterQuery += `AND airline ILIKE '${airline}' `
    if (ticketPriceStart && ticketPriceEnd) filterQuery += `AND price>=${ticketPriceStart} AND price<=${ticketPriceEnd} `
    filterQuery += `AND availability=true `

    filterQuery += `ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`
    
    console.log(filterQuery)

    return Pool.query(filterQuery);
};

const selectDetailFlights = (id) => {
    return Pool.query(`SELECT airlines.name AS "airline", airlines.availability, airlines.image, flights.* FROM flights INNER JOIN airlines ON flights.id_airline = airlines.id WHERE id='${id}'`);
};

const insertFlights = (data) => {
    const { id, id_airline, city_departure, city_departure_code, city_destination, city_destination_code, time_departure, time_arrival, transit_count, stock, price, luggage, inflight_meal, refundable, reschedule, code, terminal, gate, created_at, updated_at } = data;
    return Pool.query(`INSERT INTO flights VALUES('${id}','${id_airline}','${city_departure}', '${city_departure_code}', '${city_destination}', '${city_destination_code}', '${time_departure}', '${time_arrival}', '${transit_count}', '${stock}', '${price}', '${luggage}', '${inflight_meal}', '${refundable}', '${reschedule}', '${code}', '${terminal}', '${gate}', to_timestamp(${created_at} / 1000.0), to_timestamp(${updated_at} / 1000.0))`);
};

const updateFlights = (data) => {
    const { id, id_airline, city_departure, city_departure_code, city_destination, city_destination_code, time_departure, time_arrival, transit_count, stock, price, luggage, inflight_meal, refundable, reschedule, code, terminal, gate, created_at, updated_at } = data;
    return Pool.query(`UPDATE flights SET city_departure='${city_departure}', city_departure_code='${city_departure_code}', city_destination='${city_destination}', city_destination_code='${city_destination_code}', time_departure='${time_departure}', time_arrival='${time_arrival}', transit_count='${transit_count}', stock='${stock}', price='${price}', luggage='${luggage}', inflight_meal='${inflight_meal}', refundable='${refundable}', reschedule='${reschedule}', code='${code}', terminal='${terminal}', gate='${gate}', updated_at=to_timestamp(${updated_at} / 1000.0) WHERE id='${id}'`);
};

const deleteFlights = (id) => {
    return Pool.query(`DELETE FROM flights WHERE id='${id}'`);
};

const findId = (id) => {
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT id FROM flights WHERE id='${id}'`, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    )
};

const countData = () => {
    return Pool.query('SELECT COUNT(*) FROM flights')
};

module.exports = {
    selectAllFlights,
    selectDetailFlights,
    insertFlights,
    updateFlights,
    deleteFlights,
    countData,
    findId
}