import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import UserState from './context/user/UserState';
import GroupState from './context/groups/GroupState';
import ModalState from './context/modals/ModalState';
import SettleModalState from './context/modals/SettleModalState';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ModalState>
      <SettleModalState>
        <UserState>
          <GroupState>
            <Router>
              <App />
            </Router>
          </GroupState>
        </UserState>
      </SettleModalState>
    </ModalState>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
