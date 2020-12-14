import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './searchFlight.scss';
import isValidFormat from '../../utils/validators';

class SearchFlight extends Component {
    state = {
        searchText: '',
        errMessage: ''
    };

    showErrMessage = () => {
        this.setState({
            searchText: '',
            errMessage: 'Invalid search format'
        });
    };

    clearForm = () => {
        this.setState({
            searchText: '',
            errMessage: ''
        });
    };

    handleInputChange = event => {
        this.setState({ searchText: event.target.value });
    };

    handleFlightSearch = event => {
        event.preventDefault();

        const { searchText } = this.state;
        const validPropName = isValidFormat(searchText);

        if (validPropName) {
            this.props.getFlightsBySearch(validPropName, searchText);
            this.clearForm();
        } else {
            this.showErrMessage();
        }
    };

    render() {
        const { searchText, errMessage } = this.state;

        const errClassName = errMessage ? 'error-message' : '';
        const placeholder = errMessage
            ? errMessage
            : 'Airline, destination or flight #';

        return (
            <main>
                <div className="container flights">
                    <h1>Search flight</h1>
                    <form className="flex flex-center flights__search-form">
                        <div
                            className={classNames(
                                `flex flights__search-form_input-wrapper ${errClassName}`
                            )}
                        >
                            <i className="fa fa-search"></i>
                            <input
                                type="text"
                                className="flights__search-form_search-input"
                                placeholder={placeholder}
                                value={searchText}
                                onChange={event =>
                                    this.handleInputChange(event)
                                }
                            />
                        </div>

                        <button
                            className="flights__search-form_search-btn no-border"
                            onClick={event => this.handleFlightSearch(event)}
                        >
                            search
                        </button>
                    </form>
                </div>
            </main>
        );
    }
}

SearchFlight.propTypes = {
    getFlightsBySearch: PropTypes.func.isRequired
};

export default SearchFlight;
