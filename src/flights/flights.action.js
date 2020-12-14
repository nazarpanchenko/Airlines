import * as flightsGateway from './flights.gateway';
import  flt from './utils/constants';

export const FLIGHTS_LIST_RECEIVED = 'FLIGHTS_LIST_RECEIVED';
export const FOUND_FLIGHTS_RECEIVED = 'FOUND_FLIGHTS_RECEIVED';

const flightsListReceived = (flightsList, selectedList) => {
    const action = {
        type: FLIGHTS_LIST_RECEIVED,
        payload: {
            flightsList,
            selectedList
        }
    };

    return action;
};

const foundFlightsReceived = flightsList => {
    const action = {
        type: FOUND_FLIGHTS_RECEIVED,
        payload: {
            flightsList
        }
    };

    return action;
};

export const getFlightsList = (selectedList, todayDate) => {
    const thunkAction = function(dispatch) {
        flightsGateway.fetchFlightsList(todayDate)
        .then(flightsList => dispatch(flightsListReceived(flightsList, selectedList)));
    };

    return thunkAction;
};

export const getFlightsBySearch = (selectedList, todayDate, propName, searchText) => {
    const thunkAction = function(dispatch) {
        flightsGateway.fetchFlightsList(todayDate)
        .then(flightsList => {
                const { departure, arrival } = flightsList.body;
                let foundFlights = (selectedList === flt.DEPARTURES 
                    ? departure 
                    : selectedList === flt.ARRIVALS ? 
                    arrival : 
                    null);

                foundFlights = foundFlights.filter(
                    flight => flight[propName] === searchText
                );
                dispatch(foundFlightsReceived(foundFlights))
            }
        );
    };

    return thunkAction;
};
