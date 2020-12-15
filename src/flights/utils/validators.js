import flt from './constants';

const getPropName = checkType =>
    checkType === 'searchByCity' ? flt.DEPARTURE_CITY_NAME 
    : checkType === 'searchByPlaneNum' ? flt.PLANE_NUMBER
    : checkType === 'searchByAirline' ? flt.PLANE_ID 
    : '';

const isValidFormat = searchText => {
    const validator = {
        searchByCity: isNaN(parseInt(searchText)) && /^[^A-Za-z]+$/.test(searchText)
            || /^[A-Za-z]+$/.test(searchText),

        searchByPlaneNum: searchText.length >= 3 && /^\d+$/.test(searchText),

        searchByAirline: /^[A-Z]\d/.test(searchText)
    };

    let searchType = '';
    
    for (let checkType in validator) {
        if (validator[checkType]) {
            searchType = getPropName(checkType);
            return searchType;
        }
    }
    return searchType;
}

export default isValidFormat;