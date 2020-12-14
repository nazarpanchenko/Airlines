import React from 'react';
import Airlines from './flights/components/Airlines/Airlines';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
    return (
        <div className="airlines-container">
            <Provider store={store}>
                <Airlines />
            </Provider>
        </div>
    );
};

export default App;
