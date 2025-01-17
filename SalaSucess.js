import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'; 
import '../styles/SalaSucess.css'; 

const SucessRoom = () => {
  const navigate = useNavigate();

  return (
    <div className="sucess-room-container">
      <h1 className="sucess-room-title">SalaFácil</h1>
      <FontAwesomeIcon icon={faCalendarAlt} className="sucess-room-icon" size="6x" />
      <p className="sucess-room-message">Sua sala foi agendada com sucesso!</p>
      
      <button 
        onClick={() => navigate('/VerificarSalas')}
        className="sucess-room-button"
      >
        Verificar Salas Agendadas
      </button>

      <div className="decorative-shape"></div> {/* Forma decorativa */}
    </div>
  );
};

export default SucessRoom;
