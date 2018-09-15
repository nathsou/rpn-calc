import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Calculator from './Components/Calculator';
import { Provider } from 'react-redux';
import configureStore from './Redux/configureStore';

const CalcApp = store => (
    <Provider store={store}>
        <Calculator />
    </Provider >
);

ReactDOM.render(CalcApp(configureStore()), document.getElementById('root'));

registerServiceWorker();