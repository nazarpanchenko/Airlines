import React from 'react';

const Titles = () => {
    return (
        <div className="flex flights-list__titles-list">
            <h5 className="flights-list__titles-list_title">Terminal</h5>
            <h5 className="flights-list__titles-list_title">Local Time</h5>
            <h5 className="flights-list__titles-list_title">Destination</h5>
            <h5 className="flights-list__titles-list_title">Status</h5>
            <h5 className="flights-list__titles-list_title">Airline</h5>
            <h5 className="flights-list__titles-list_title">Flight</h5>
        </div>
    );
};

export default Titles;
