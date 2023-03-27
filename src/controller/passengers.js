const passengerModel = require("../model/passengers");
const commonHelper = require("../helper/common");

const getAllPassengers = async (req, res) => {
    try {
        //Get all passengers from database
        const results = await passengerModel.selectAllPassengers();

        //Return not found if there's no passengers in database
        if (!results.rowCount) return commonHelper
            .response(res, null, 404, "Passengers not found");

        //Response
        commonHelper.response(res, results.rows, 200,
            "Get all passengers successful");
    } catch (error) {
        console.log(error);
        commonHelper.response(res, null, 500, "Failed getting all passengers");
    }
}

const getBookingPassenger = async (req, res) => {
    try {
        //Get request booking id
        const id_booking = req.params.id_booking;

        //Get booking passengers from database
        const results = await passengerModel.selectBookingPassengers(id_booking);

        //Return not found if there's no passenger in database
        if (!results.rowCount) return commonHelper
            .response(res, null, 404, "Booking passengers not found");

        //Response
        commonHelper.response(res, results.rows, 200,
            "Get booking passengers successful");
    } catch (error) {
        console.log(error);
        commonHelper.response(res, null, 500, "Failed getting booking passengers");
    }
}

const getDetailPassenger = async (req, res) => {
    try {
        //Get request passenger id
        const id = req.params.id;

        //Get passenger by id from database
        const results = await passengerModel.selectDetailPassengers(id)

        //Return not found if there's no passengers in database
        if (!results.rowCount) return commonHelper
            .response(res, null, 404, "Passenger detail not found");

        //Response
        commonHelper.response(res, results.rows, 200,
            "Get detail passenger successful");
    } catch (error) {
        console.log(error);
        commonHelper.response(res, null, 500, "Failed getting detail passenger");
    }
}

module.exports = {
    getAllPassengers,
    getBookingPassenger,
    getDetailPassenger
}