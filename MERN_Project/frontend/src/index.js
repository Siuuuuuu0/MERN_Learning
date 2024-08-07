import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import{BrowserRouter, Routes, Route} from 'react-router-dom'; 
import disableReactDevtools from '@fvilers/disable-react-devtools'
import { store } from './app/store';
import { Provider } from 'react-redux';

if(process.env.NODE_ENV==='production') disableReactDevtools()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App />}/> {/*asterix after the slahs imperatively!!!!*/}
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


