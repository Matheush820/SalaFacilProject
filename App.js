import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import EnterUsuario from './components/EnterUsuario';
import ForgotPassword from './components/ForgotPassword';
import SearchRoom from './components/SearchRoom';
import AgendarSala from './components/AgendarSala';
import AgendarSala2 from './components/AgendarSala2';
import SalaSucess from './components/SalaSucess';
import VerificarSalas from './components/VerificarSalas';
import EditarReserva from './components/EditarReserva';

const App = () => {
  const sala = {
    id: 1,
    tipo: 'sala1',
    dia: '2024-10-29',
    horario: '10:00 - 12:00',
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/enter-usuario" element={<EnterUsuario />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/searchRoom" element={<SearchRoom />} />
        <Route path="/agendarSala" element={<AgendarSala />} />
        <Route path="/agendarSala2" element={<AgendarSala2 />} />
        <Route path="/SalaSucess" element={<SalaSucess />} />
        <Route path="/VerificarSalas" element={<VerificarSalas sala={sala} />} />
        <Route path="/editar-reserva/:id" element={<EditarReserva />} /> {/* Alterada a rota */}
      </Routes>
    </Router>
  );
};

export default App;
