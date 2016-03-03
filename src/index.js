import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

let appContainer = document.createElement('DIV');

document.body.appendChild(appContainer);

ReactDOM.render(<App/>, appContainer);
