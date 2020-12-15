import { TODAY_DATE } from './utils/constants';

const baseUrl = `https://api.iev.aero/api/flights/${TODAY_DATE}`;

export const fetchFlightsList = () => {
    return fetch(baseUrl).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Failed to fetch flights list');
    });
};
