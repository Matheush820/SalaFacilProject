import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';         // Estilos globais
import './styles/Login.css';   // Estilos da página de Login
import './styles/EnterUsuario.css';
import './styles/ForgotPassword.css'; // Estilos da página ForgotPassword
import './styles/AgendarSala.css';
import './styles/AgendarSala2.css';
import './styles/SearchRoom.css';
import './styles/SalaSucess.css';
import './styles/VerificarSalas.css'
import './styles/EditarReserva.css'
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Medição de performance (opcional)
reportWebVitals();
