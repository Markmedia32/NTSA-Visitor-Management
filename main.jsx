import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CardProvider } from './Cardcontext';
import { VisitorLogProvider } from './VisitorContext'; 
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>         
    <CardProvider>
      <VisitorLogProvider>   
      <App />     
      </VisitorLogProvider>         
    </CardProvider>
  </BrowserRouter>
);
