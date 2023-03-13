const Pool = require('../config/db');

const selectAllFlights = (data) => {
    const { cityDept, cityDest, transit, luggage, inflight_meal, wifi,
        deptTimeStart, deptTimeEnd, arriveTimeStart, arriveTimeEnd, airline,
        ticketPriceStart, ticketPriceEnd, sortBY, sort, limit, offset } = data;

    //Main query
    let filterQuery = `SELECT airlines.name AS "airline", airlines.availability, 
        airlines.image, flights.* FROM flights INNER JOIN airlines ON 
        flights.id_airline = airlines.id WHERE `

    //City search destination and arrival query
    filterQuery += `city_departure ILIKE '%${cityDept}%' AND 
        city_destination ILIKE '%${cityDest}%' `

    //Transit query
    console.log(typeof transit)
    console.log(transit)
    if (transit === "0") {
        filterQuery += `AND transit_count=0 `
    } else if (transit === "1") {
        filterQuery += `AND transit_count=1 `
    } else if (transit) {
        filterQuery += `AND transit_count>=${transit} `
    }

    //Amenities
    if (wifi) filterQuery += `AND wifi=${wifi} `
    if (luggage) filterQuery += `AND luggage=${luggage} `
    if (inflight_meal) filterQuery += `AND inflight_meal=${inflight_meal} `

    //Departure time start and end
    if (deptTimeStart && deptTimeEnd)
        filterQuery += `AND time_departure>=${deptTimeStart} 
        AND time_departure<=${deptTimeEnd} `

    //Arrival time start and end
    if (arriveTimeStart && arriveTimeEnd)
        filterQuery += `AND time_arrival>=${arriveTimeStart} AND 
        time_arrival<=${arriveTimeEnd} `

    //Airline search
    if (airline) filterQuery += `AND airline ILIKE '%${airline}%' `

    //Flight ticket price search
    if (ticketPriceStart && ticketPriceEnd)
        filterQuery += `AND price>=${ticketPriceStart} AND 
        price<=${ticketPriceEnd} `

    //Flight must be available to show up in search
    filterQuery += `AND availability=true `

    //Pagination query
    filterQuery += `ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`
    console.log(filterQuery)
    return Pool.query(filterQuery);
};

const selectDetailFlights = (id) => {
    return Pool.query(`SELECT airlines.name AS "airline", airlines.availability, airlines.image, flights.* FROM flights INNER JOIN airlines ON flights.id_airline = airlines.id WHERE flights.id='${id}'`);
};

const insertFlights = (data) => {
    let { id, id_airline, city_departure, city_departure_code, city_destination, city_destination_code, date_departure, time_departure, date_arrival, time_arrival, transit_count, flight_trip, flight_class, capacity, price, luggage, inflight_meal, wifi, refundable, reschedule, code, terminal, gate, created_at, updated_at } = data;

    return Pool.query(`INSERT INTO flights VALUES('${id}','${id_airline}','${city_departure}', '${city_departure_code}', '${city_destination}', '${city_destination_code}', '${date_departure}', '${time_departure}', '${date_arrival}', '${time_arrival}', '${transit_count}', '${flight_trip}','${flight_class}', '${capacity}', '${price}', '${luggage}', '${inflight_meal}', '${wifi}', '${refundable}', '${reschedule}', '${code}', '${terminal}', '${gate}', to_timestamp(${created_at} / 1000.0), to_timestamp(${updated_at} / 1000.0))`);
};

const updateFlights = (data) => {
    const { id, id_airline, city_departure, city_departure_code, city_destination, city_destination_code, date_departure, time_departure, date_arrival, time_arrival, transit_count, flight_trip, flight_class, capacity, price, luggage, inflight_meal, wifi, refundable, reschedule, code, terminal, gate, created_at, updated_at } = data;

    return Pool.query(`UPDATE flights SET id_airline='${id_airline}', city_departure='${city_departure}', city_departure_code='${city_departure_code}', city_destination='${city_destination}', city_destination_code='${city_destination_code}', date_departure='${date_departure}', time_departure='${time_departure}', date_arrival='${date_arrival}',
    time_arrival='${time_arrival}',
    transit_count='${transit_count}', flight_trip='${flight_trip}', flight_class='${flight_class}', capacity='${capacity}', price='${price}', luggage='${luggage}', inflight_meal='${inflight_meal}', wifi='${wifi}', refundable='${refundable}', reschedule='${reschedule}', code='${code}', terminal='${terminal}', gate='${gate}', updated_at=to_timestamp(${updated_at} / 1000.0) WHERE id='${id}'`);
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