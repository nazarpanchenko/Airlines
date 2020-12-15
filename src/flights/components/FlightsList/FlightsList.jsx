import React from 'react';
import PropTypes from 'prop-types';
import './flightsList.scss';
import Titles from '../Titles/Titles';
import Flight from '../Flight/Flight';
import flt from '../../utils/constants';

const FlightsList = ({ flightsList }) => {
    if (!flightsList.length) return null;

    // assigning correct airport ID depending on selected list
    let direction;

    flightsList.map(flight =>
        flight.hasOwnProperty(flt.DEPARTURE_CITY_NAME)
            ? (direction = flt.DEPARTURE_CITY_NAME)
            : flight.hasOwnProperty(flt.ARRIVAL_CITY_NAME)
            ? (direction = flt.ARRIVAL_CITY_NAME)
            : (direction = '')
    );

    return (
        <>
            <section className="flights-list">
                <div className=" container flights-list-wrapper">
                    {
                        <>
                            <Titles />
                            {flightsList.map(flight => (
                                <Flight
                                    key={++flt.FLIGHT_ID}
                                    planeTypeID={flight[flt.PLANE_ID]}
                                    airport={flight[direction]}
                                    {...flight}
                                />
                            ))}
                        </>
                    }
                </div>
            </section>
        </>
    );
};

FlightsList.propTypes = {
    flightsList: PropTypes.arrayOf(PropTypes.shape())
};

FlightsList.defaultProps = {
    flightsList: []
};

export default FlightsList;
