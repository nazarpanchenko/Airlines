import moment from 'moment';

const flt = {
    FLIGHT_ID: 0,
    DEPARTURES: 'DEPARTURES',
    ARRIVALS: 'ARRIVALS',
    DEPARTURE_CITY_NAME: 'airportToID.name',
    ARRIVAL_CITY_NAME: 'airportFromID.name',
    PLANE_NUMBER: 'fltNo',
    PLANE_ID: 'planeTypeID.code',
    FLIGHT_DATE: 'timeLandFact'
};

export const TODAY_DATE = moment().format();

export default flt;