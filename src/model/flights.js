const Pool = require('../config/db');

const selectAllFlights = (data) => {
    const {
        cityDept, cityDest, transit, flightTrip, flightClass, luggage,
        inflight_meal, wifi, deptDate, deptTimeStart, deptTimeEnd,
        arrivalTimeStart, arrivalTimeEnd, person, airline, ticketPriceStart,
        ticketPriceEnd, sortBY, sort, limit, offset
    } = data;

    //convert "0900" string to "09:00"
    const joinTime = (value, index) => {
        return value.substring(0, index) + ":" + value.substring(index);
    }

    //Main query
    let filterQuery = `SELECT airlines.name AS "airline", airlines.availability, 
        airlines.image, flights.* FROM flights INNER JOIN airlines ON 
        flights.id_airline = airlines.id WHERE `

    //City departure and arrival search
    filterQuery += `city_departure ILIKE '%${cityDept}%' AND 
        city_destination ILIKE '%${cityDest}%' `

    //Departure date
    if (deptDate) filterQuery += `AND date_departure='${deptDate}' `

    //Departure time range
    if (deptTimeStart && deptTimeEnd) {
        const timeStart = joinTime(deptTimeStart, 2)
        const timeEnd = joinTime(deptTimeEnd, 2)
        filterQuery += `AND time_departure>='${timeStart}' 
        AND time_departure<='${timeEnd}' `
    }

    //Arrival time range
    if (arrivalTimeStart && arrivalTimeEnd) {
        const timeStart = joinTime(arrivalTimeStart, 2)
        const timeEnd = joinTime(arrivalTimeEnd, 2)
        filterQuery += `AND time_arrival>='${timeStart}' 
        AND time_arrival<='${timeEnd}' `
    }

    //Transit count
    if (transit === "0") {
        filterQuery += `AND transit_count=0 `   //Direct transit
    } else if (transit === "1") {
        filterQuery += `AND transit_count=1 `   //1 transit
    } else if (transit) {
        filterQuery += `AND transit_count>=${transit} ` //2+ transit
    }

    //Flight trip
    if (flightTrip === "1") {
        filterQuery += `AND flight_trip=1 ` //One way trip
    } else if (flightTrip === "2") {
        filterQuery += `AND flight_trip=2 ` //Round trip
    }

    //Flight class query
    if (flightClass === "1") {
        filterQuery += `AND flight_class=1 `    //Economy
    } else if (flightClass === "2") {
        filterQuery += `AND flight_class=2 `    //Business
    } else if (flightClass === "3") {
        filterQuery += `AND flight_class=3 `    //First class
    }

    //Person count
    if (person) filterQuery += `AND capacity>=${person} `

    //Flight ticket price range
    if (ticketPriceStart && ticketPriceEnd)
        filterQuery += `AND price>=${ticketPriceStart} AND 
            price<=${ticketPriceEnd} `

    //Amenities
    if (wifi) filterQuery += `AND wifi=${wifi} `
    if (luggage) filterQuery += `AND luggage=${luggage} `
    if (inflight_meal) filterQuery += `AND inflight_meal=${inflight_meal} `

    //Airline search
    if (airline) filterQuery += `AND airlines.name ILIKE '%${airline}%' `

    //Flight must be available to show up in search
    filterQuery += `AND availability='true' `

    //Pagination query
    filterQuery += `ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`

    return Pool.query(filterQuery);
};

const selectDetailFlights = (id) => {
    return Pool.query(`SELECT airlines.name AS "airline", airlines.availability, 
        airlines.image, flights.* FROM flights INNER JOIN airlines ON 
        flights.id_airline = airlines.id WHERE flights.id='${id}'`
    );
};

const insertFlights = (data) => {
    const {
        id, id_airline, city_departure, city_departure_code, city_destination,
        city_destination_code, date_departure, time_departure, date_arrival,
        time_arrival, transit_count, flight_trip, flight_class, capacity,
        price, luggage, inflight_meal, wifi, refundable, reschedule, code,
        terminal, gate, created_at, updated_at
    } = data;

    return Pool.query(`INSERT INTO flights VALUES('${id}', '${id_airline}', 
        '${city_departure}', '${city_departure_code}', '${city_destination}', 
        '${city_destination_code}', '${date_departure}', '${time_departure}', 
        '${date_arrival}', '${time_arrival}', '${transit_count}', 
        '${flight_trip}', '${flight_class}', '${capacity}', '${price}', 
        '${luggage}', '${inflight_meal}', '${wifi}', '${refundable}', 
        '${reschedule}', '${code}', '${terminal}', '${gate}', 
        to_timestamp(${created_at} / 1000.0), 
        to_timestamp(${updated_at} / 1000.0))`
    );
};

const updateFlights = (data) => {
    const {
        id, id_airline, city_departure, city_departure_code, city_destination,
        city_destination_code, date_departure, time_departure, date_arrival,
        time_arrival, transit_count, flight_trip, flight_class, capacity, price,
        luggage, inflight_meal, wifi, refundable, reschedule, code, terminal,
        gate, updated_at
    } = data;

    return Pool.query(`UPDATE flights SET id_airline='${id_airline}', 
        city_departure='${city_departure}', 
        city_departure_code='${city_departure_code}', 
        city_destination='${city_destination}', 
        city_destination_code='${city_destination_code}', 
        date_departure='${date_departure}', time_departure='${time_departure}', 
        date_arrival='${date_arrival}', time_arrival='${time_arrival}',
        transit_count='${transit_count}', flight_trip='${flight_trip}', 
        flight_class='${flight_class}', capacity='${capacity}', 
        price='${price}', luggage='${luggage}', inflight_meal='${inflight_meal}', 
        wifi='${wifi}', refundable='${refundable}', reschedule='${reschedule}', 
        code='${code}', terminal='${terminal}', gate='${gate}', 
        updated_at=to_timestamp(${updated_at} / 1000.0) WHERE id='${id}'`
    );
};

const updateCapacity = (id, newCapacity) => {
    return Pool.query(`UPDATE flights SET capacity='${newCapacity}' 
        WHERE id='${id}'`
    );
}

const deleteFlights = (id) => {
    return Pool.query(`DELETE FROM flights WHERE id='${id}'`);
};

const findId = (id) => {
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM flights WHERE id='${id}'`,
            (error, result) => (!error) ? resolve(result) : reject(error))
        );
};

const countData = () => {
    return Pool.query('SELECT COUNT(*) FROM flights');
};

module.exports = {
    selectAllFlights,
    selectDetailFlights,
    insertFlights,
    updateFlights,
    deleteFlights,
    countData,
    findId,
    updateCapacity
}