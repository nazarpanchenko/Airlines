import React from 'react';
import './noFlights.scss';

const NoFlights = () => {
    return (
        <div className="container flex flex-center no-flights">
            <span className="no-flights__status-message">No flights</span>
        </div>
    );
};

export default NoFlights;
