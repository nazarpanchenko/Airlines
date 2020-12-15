import { FLIGHTS_LIST_RECEIVED, 
    TODAY_DEPARTURES_RECEIVED, 
    TODAY_ARRIVALS_RECEIVED } 
from './flights.action';

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
        case TODAY_DEPARTURES_RECEIVED: {
            const { foundDepartures } = action.payload;
            return {
                ...state,
                flightsList: {
                    ...state.flightsList,
                    departures: foundDepartures,
                    arrivals: [],
                    selectedList: flt.DEPARTURES
                }
            }
        };
        case TODAY_ARRIVALS_RECEIVED: {
            const { foundArrivals } = action.payload;
            return {
                ...state,
                flightsList: {
                    ...state.flightsList,
                    departures: [],
                    arrivals: foundArrivals,
                    selectedList: flt.ARRIVALS
                }
            }
        };
        default: {
            return state;
        };
    }
};

export default flightsReducer;