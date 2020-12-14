import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './buttons.scss';
import flt from '../../utils/constants';

let departuresSelected, arrivalsSelected;

const Buttons = ({ handleListToggle, listSelected }) => {
    if (listSelected === flt.DEPARTURES) {
        departuresSelected = 'departures-btn-selected';
        arrivalsSelected = '';
    } else if (listSelected === flt.ARRIVALS) {
        arrivalsSelected = 'arrivals-btn-selected';
        departuresSelected = '';
    }

    return (
        <div className="container flights-list__btn-wrapper">
            <button
                className={classNames(
                    `flights-list__btn departures-btn no-border ${departuresSelected}`
                )}
                onClick={event => handleListToggle(event)}
            >
                <i className="fas fa-plane-departure"></i>departures
            </button>

            <button
                className={classNames(
                    `flights-list__btn arrivals-btn no-border ${arrivalsSelected}`
                )}
                onClick={event => handleListToggle(event)}
            >
                <i className="fas fa-plane-arrival"></i>arrivals
            </button>
        </div>
    );
};

Buttons.propTypes = {
    handleListToggle: PropTypes.func.isRequired,
    listSelected: PropTypes.string
};

Buttons.defaultProps = {
    listSelected: ''
};

export default Buttons;
