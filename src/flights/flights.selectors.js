import { createSelector } from 'reselect';
import flt from './utils/constants';

const flightsListSelector = state => state.flights.flightsList;

export const filteredFlightsListSelector = createSelector(
    [flightsListSelector],
    flightsList => {
        const departuresList = flightsList.departures.slice();
        const arrivalsList = flightsList.arrivals.slice();

        const newSelectedList = flightsList.selectedList === flt.DEPARTURES 
            ? [].concat(departuresList)
            : flightsList.selectedList === flt.ARRIVALS
            ? [].concat(arrivalsList)
            : [];

        return newSelectedList;
    }
);