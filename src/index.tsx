import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import './styles/detailStudent.css'
import './styles/detailTeacher.css'
import './styles/inputContainer.css'
import { BrowserRouter } from 'react-router-dom';
import { KeycloakProvider } from './providers/KeycloakProviders';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <KeycloakProvider>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </KeycloakProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
