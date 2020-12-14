import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const Flight = ({ term, actual, planeTypeID, airport, status, airline }) => {
    const { name, logoName, createdAt } = airline.ua;

    const localTime = moment(actual, 'YYYY-MM-DDThh:mm:ss').format('h:mm');
    const landingTime = moment(createdAt).format('h:mm');

    return (
        <>
            <div className="flex flights-list__item">
                <div className="flights-list__item_terminal">
                    <span
                        className="flights-list__item_terminal"
                        data-terminal={term}
                    >
                        {term}
                    </span>
                </div>
                <div className="flights-list__item_local-time">{localTime}</div>
                <div className="flights-list__item_location">{airport}</div>
                <div className="flights-list__item_status">{`${status} ${landingTime}`}</div>
                <div className="flex flights-list__item_airline">
                    <img
                        src={logoName}
                        alt="Company"
                        className="flights-list__item_airline-logo"
                    />
                    <span className="flights-list__item_company-name">
                        {name}
                    </span>
                </div>
                <div className="flights-list__item_airline-number">
                    {planeTypeID}
                </div>
            </div>
        </>
    );
};

Flight.propTypes = {
    term: PropTypes.string.isRequired,
    actual: PropTypes.string,
    airline: PropTypes.shape(),
    planeTypeID: PropTypes.string.isRequired,

    status: PropTypes.string.isRequired,
    airport: PropTypes.string.isRequired
};

Flight.defaultProps = {
    actual: moment().format()
};

export default Flight;
