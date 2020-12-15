import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './airlines.scss';
import SearchFlight from '../SearchFlight/SearchFlight';
import Buttons from '../Buttons/Buttons';
import FlightsList from '../FlightsList/FlightsList';
import * as flightsActions from '../../flights.action';

import { filteredFlightsListSelector } from '../../flights.selectors';
import flt from '../../utils/constants';
import NoFlights from '../NoFlights/NoFlights';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

class Airlines extends Component {
    state = {
        listSelected: null
    };

    componentDidMount() {
        this.props.getFlightsList(flt.DEPARTURES);
    }

    replaceSearchType = searchType =>
        searchType === flt.DEPARTURE_CITY_NAME
            ? flt.ARRIVAL_CITY_NAME
            : searchType;

    checkFlightStatus = () => {
        const { listSelected } = this.state;
        const flightStatus =
            listSelected === flt.DEPARTURES
                ? flt.DEPARTURES
                : listSelected === flt.ARRIVALS
                ? flt.ARRIVALS
                : flt.DEPARTURES;

        return flightStatus;
    };

    searchFlights = (searchType, searchText) => {
        const { getTodayDepartures, getTodayArrivals } = this.props;

        // let user type both uppercase and lowercase letters for city search
        const upperCaseSearch =
            searchText.charAt(0).toUpperCase() + searchText.slice(1);

        const flightStatus = this.checkFlightStatus();

        if (flightStatus === flt.DEPARTURES) {
            getTodayDepartures(searchType, upperCaseSearch);
        } else {
            const replacedSearchType = this.replaceSearchType(searchType);
            getTodayArrivals(replacedSearchType, upperCaseSearch);
        }

        this.setState({ listSelected: flightStatus });
    };

    handleListToggle = event => {
        const { classList } = event.currentTarget;
        const selectedList = classList.contains('departures-btn')
            ? flt.DEPARTURES
            : classList.contains('arrivals-btn')
            ? flt.ARRIVALS
            : flt.DEPARTURES;

        this.props.getFlightsList(selectedList);
        this.setState({ listSelected: selectedList });
    };

    render() {
        const { listSelected } = this.state;
        const { flights } = this.props;

        return (
            <Router>
                <Route path="/">
                    <SearchFlight searchFlights={this.searchFlights} />
                </Route>
                <Route path="/">
                    <Buttons
                        handleListToggle={this.handleListToggle}
                        listSelected={listSelected}
                    />
                </Route>
                <Route path="/flights">
                    {flights.length ? (
                        <FlightsList flightsList={flights} />
                    ) : (
                        <Redirect to="/no-flights" />
                    )}
                </Route>
                <Route path="/no-flights">
                    <NoFlights />
                </Route>
            </Router>
        );
    }
}

Airlines.propTypes = {
    flights: PropTypes.arrayOf(PropTypes.shape()),
    getFlightsList: PropTypes.func.isRequired,
    getTodayDepartures: PropTypes.func.isRequired,
    getTodayArrivals: PropTypes.func.isRequired
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
    getTodayDepartures: flightsActions.getTodayDepartures,
    getTodayArrivals: flightsActions.getTodayArrivals
};

export default connect(mapState, mapDispatch)(Airlines);
