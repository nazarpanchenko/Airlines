const baseUrl = 'https://api.iev.aero/api/flights';

export const fetchFlightsList = todayDate => {
    return fetch(`${baseUrl}/${todayDate}`).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Failed to fetch flights list');
    });
};
