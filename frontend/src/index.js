import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Context/AuthContext.jsx';
import { ProjectProvider } from './Context/ProjectContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ProjectProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ProjectProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
