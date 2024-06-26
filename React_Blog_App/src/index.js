import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {StoreProvider} from 'easy-peasy'; 
import store from './store';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root')); //everything is attached to a root div, so we need to manipulate the root id
root.render(
  <React.StrictMode>\
    <StoreProvider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={ <App />} /> {/*anything beyond teh slash, as routes is nested*/}
        </Routes>
      </Router>
    </StoreProvider>
  </React.StrictMode>
);


