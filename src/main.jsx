import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App.jsx'
import './index.css'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51P81H1Iec551NRyTaJZWqGE0jc5zOeSu1FLyDOfIKY6cXkJEo1Zd1LPiMLz4mGj31sXU71NSMz82EfUDOl4sLgCU00RNeFRXkf');
const options = {
  // passing the client secret obtained from the server
};

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <Provider store={store}>  
    <Elements stripe={stripePromise} options={options}>
    <App />
    </Elements>
    </Provider>
  </React.StrictMode>,
)
