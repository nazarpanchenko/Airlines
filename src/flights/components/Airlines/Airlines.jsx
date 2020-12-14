import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './airlines.scss';
import SearchFlight from '../SearchFlight/SearchFlight';
import Buttons from '../Buttons/Buttons';
import FlightsList from '../FlightsList/FlightsList';
import * as flightsActions from '../../flights.action';

import { filteredFlightsListSelector } from '../../flights.selectors';
import flt, { TODAY_DATE } from '../../utils/constants';

class Airlines extends Component {
    state = {
        listSelected: null,
        searchMode: null,
        searchText: '',
        searchPropName: ''
    };

    getFlightsBySearch = (propName, text) => {
        // let user use both uppercase and lowercase letters for city search
        const { listSelected } = this.state;
        const upperCaseSearch = text.charAt(0).toUpperCase() + text.slice(1);

        const selectedList =
            listSelected === flt.DEPARTURES
                ? flt.DEPARTURES
                : listSelected === flt.ARRIVALS
                ? flt.ARRIVALS
                : flt.DEPARTURES;

        const updatedPropName =
            propName === flt.DEPARTURE_CITY_NAME
                ? flt.ARRIVAL_CITY_NAME
                : propName;

        this.props.getFlightsBySearch(
            selectedList,
            TODAY_DATE,
            propName,
            upperCaseSearch
        );
        this.setState({
            searchMode: true,
            listSelected: listSelected,
            searchPropName: updatedPropName,
            searchText: upperCaseSearch
        });
    };

    handleListToggle = event => {
        const { searchMode, searchText, searchPropName } = this.state;
        const { classList } = event.currentTarget;

        const selectedList = classList.contains('departures-btn')
            ? flt.DEPARTURES
            : classList.contains('arrivals-btn')
            ? flt.ARRIVALS
            : flt.DEPARTURES;

        if (searchMode && selectedList === flt.ARRIVALS) {
            this.props.getFlightsBySearch(
                flt.ARRIVALS,
                TODAY_DATE,
                searchPropName,
                searchText
            );
        } else {
            this.props.getFlightsList(selectedList, TODAY_DATE);
        }

        this.setState({
            listSelected: selectedList,
            searchMode: false
        });
    };

    render() {
        const { listSelected, searchMode } = this.state;
        const { flights } = this.props;

        return (
            <>
                <SearchFlight getFlightsBySearch={this.getFlightsBySearch} />
                <Buttons
                    handleListToggle={this.handleListToggle}
                    listSelected={listSelected}
                />
                {listSelected || searchMode ? (
                    <FlightsList flightsList={flights} />
                ) : null}
            </>
        );
    }
}

Airlines.propTypes = {
    flights: PropTypes.arrayOf(PropTypes.shape()),
    getFlightsList: PropTypes.func.isRequired,
    getFlightsBySearch: PropTypes.func.isRequired
};

Airlines.defaultProps = {
    flights: []
};

const mapState = state => {
    return {
        flights: filteredFlightsListSelector(state)
    };
};

const mapDispatch = {
    getFlightsList: flightsActions.getFlightsList,
    getFlightsBySearch: flightsActions.getFlightsBySearch
};

export default connect(mapState, mapDispatch)(Airlines);
