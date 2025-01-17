import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchRoom.css';

const SearchRoom = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="search-room-container">
      <h1 className="search-room-title">AGENDE UMA SALA</h1>
      <p className="search-room-description">Selecione uma sala para agendar.</p>

      {/* Link de Sair no Canto Superior Direito */}
      <p className="logout-link" onClick={() => navigate('/')}>
        Sair
      </p>

      <div className="room-container">
        <div className="room-card">
          <img
            src="Fiap-aclimacao-lab-1-e1508848494124.jpg"
            alt="Sala de Informática 1"
            className="room-image"
          />
          <h2>Laboratório de Informática 1</h2>
          <p>Esta sala atende todos os cursos da universidade.</p>
          <button
            onClick={() => navigate('/agendarSala')}
            className="room-button"
          >
            Agendar Sala
          </button>
        </div>

        <div className="room-card">
          <img
            src="teladeagendamento.png"
            alt="Sala de Informática 2"
            className="room-image"
          />
          <h2>Laboratório de Informática 2</h2>
          <p>Esta sala atende apenas alunos do curso de ADS da universidade.</p>
          <button
            onClick={() => navigate('/agendarSala2')}
            className="room-button"
          >
            Agendar Sala
          </button>
        </div>

        {/* Adicione mais cartões de sala conforme necessário */}
      </div>

      <button
        className="help-button"
        onClick={() => setIsPopupOpen(true)}
      >
        Preciso de ajuda
      </button>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Ajuda</h2>
            <p>Como podemos ajudá-lo?</p>
            <button
              onClick={() => {
                setIsPopupOpen(false);
                navigate('/verificarSalas'); // Navegar para VerificarSalas
              }}
              className="popup-button"
            >
              Verificar Salas
            </button>
            <button
              onClick={() => setIsPopupOpen(false)}
              className="popup-button close-popup"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchRoom;
