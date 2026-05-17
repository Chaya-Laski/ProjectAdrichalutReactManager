
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import  store  from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// // src/index.js
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import store from './store';
// import App from './App';

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
      <Provider store={store} >
        <App />
      </Provider>
    </BrowserRouter>

);

reportWebVitals();
