import { FLIGHTS_LIST_RECEIVED, FOUND_FLIGHTS_RECEIVED } from './flights.action';
import flt from './utils/constants';

const initialData = {
    flightsList: {
        departures: [],
        arrivals: [],
        selectedList: ''
    }
};

const flightsReducer = (state = initialData, action) => {
    switch (action.type) {
        case FLIGHTS_LIST_RECEIVED: {
            const { flightsList, selectedList } = action.payload;
            return {
                ...state,
                flightsList: {
                    ...state.flightsList,
                    departures: flightsList.body.departure,
                    arrivals: flightsList.body.arrival,
                    selectedList: selectedList
                }
            }
        };
        case FOUND_FLIGHTS_RECEIVED: {
            const { flightsList } = action.payload;
            return {
                ...state,
                flightsList: {
                    ...state.flightsList,
                    departures: flightsList,
                    arrivals: [],
                    selectedList: flt.DEPARTURES
                }
            }
        };
        default: {
            return state;
        };
    }
};

export default flightsReducer;