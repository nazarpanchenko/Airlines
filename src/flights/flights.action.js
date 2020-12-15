import * as flightsGateway from './flights.gateway';

export const FLIGHTS_LIST_RECEIVED = 'FLIGHTS_LIST_RECEIVED';
export const TODAY_DEPARTURES_RECEIVED = 'TODAY_DEPARTURES_RECEIVED';
export const TODAY_ARRIVALS_RECEIVED = 'TODAY_ARRIVALS_RECEIVED';

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

const todayDeparturesReceived = foundDepartures => {
    const action = {
        type: TODAY_DEPARTURES_RECEIVED,
        payload: {
            foundDepartures
        }
    };

    return action;
};

const todayArrivalsReceived = foundArrivals => {
    const action = {
        type: TODAY_ARRIVALS_RECEIVED,
        payload: {
            foundArrivals
        }
    };

    return action;
};

export const getFlightsList = (selectedList) => {
    const thunkAction = function(dispatch) {
        flightsGateway.fetchFlightsList()
        .then(flightsList => dispatch(flightsListReceived(flightsList, selectedList)));
    };

    return thunkAction;
};

export const getTodayDepartures = (searchType, searchText) => {
    const thunkAction = function(dispatch) {
        flightsGateway.fetchFlightsList()
        .then(flightsList => {
                const { departure } = flightsList.body;
                const foundDepartures = departure.filter(
                    flight => flight[searchType] === searchText
                );

                dispatch(todayDeparturesReceived(foundDepartures))
            }
        );
    };

    return thunkAction;
};

export const getTodayArrivals = (searchType, searchText) => {
    const thunkAction = function(dispatch) {
        flightsGateway.fetchFlightsList()
        .then(flightsList => {
                const { arrival } = flightsList.body;
                const foundArrivals = arrival.filter(
                    flight => flight[searchType] === searchText
                );
                
                dispatch(todayArrivalsReceived(foundArrivals))
            }
        );
    };

    return thunkAction;
};

