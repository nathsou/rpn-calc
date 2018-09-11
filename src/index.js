import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Calculator from './Components/Calculator';

ReactDOM.render( < Calculator / > , document.getElementById('root'));
registerServiceWorker();