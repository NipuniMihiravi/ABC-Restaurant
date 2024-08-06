import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './App';
import Modal from 'react-modal';
import './index.css';

Modal.setAppElement('#root');

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);
