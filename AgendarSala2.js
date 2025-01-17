import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AgendarSala2.css';

const AgendarSala2 = () => {
  const navigate = useNavigate();
  const [turma, setTurma] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [dia, setDia] = useState('');
  const [horario, setHorario] = useState('');
  const [horariosAgendados, setHorariosAgendados] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const horariosDisponiveis = [
    "18:30-22:00", "19:20-22:00"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação básica dos campos
    if (!turma || !periodo || !dia || !horario) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    // Sanitização dos dados (remover espaços em branco e caracteres indesejados)
    const sanitizedTurma = turma.trim();
    const sanitizedPeriodo = periodo.trim();

    const agendamento = { 
      dia, 
      horario, 
      turma: sanitizedTurma, 
      periodo: sanitizedPeriodo 
    };

    if (horariosAgendados.some(h => h.dia === dia && h.horario === horario)) {
      alert('Este horário já está agendado!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/agendarSala', agendamento);

      if (response.status === 200) {
        setHorariosAgendados([...horariosAgendados, agendamento]);
        alert(`Sala agendada para ${sanitizedTurma} no dia ${dia} às ${horario}`);
        
        // Limpa os campos do formulário
        setTurma('');
        setPeriodo('');
        setDia('');
        setHorario('');
        navigate('/SalaSucess'); // Redireciona para a página de sucesso
      } else {
        alert('Falha ao agendar a sala. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao conectar ao servidor.');
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="agendar-sala-container">
      <header className="agendar-sala-header">
        <h1 className="agendar-sala-title">Agendar Sala de Informática 2</h1>
        <p className="curso-warning">Atenção: Este Laboratório está disponível apenas para o curso de Análise e Desenvolvimento de Sistemas.</p>
      </header>

      <div className="agendar-sala-content">
        <div className="agendar-sala-image-container">
          <img 
            src='Fiap-aclimacao-lab-1-e1508848494124.jpg' 
            alt="Sala de Informática 2" 
            className="agendar-sala-image" 
          />
        </div>
       
        <div className="agendar-sala-details">
          <h2 className="infoSala2">Agendamentos</h2>
          <button onClick={toggleExpand} className="toggle-button">
            {isExpanded ? 'Ocultar Horários' : 'Mostrar Horários'}
          </button>
          {isExpanded && (
            <div className="agendar-sala-indisponibilidade">
              {horariosAgendados.length > 0 ? (
                <ul>
                  {horariosAgendados.map((agendamento, index) => (
                    <li key={index}>
                      {agendamento.dia} às {agendamento.horario} - {agendamento.turma}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="infoSala2">A sala está disponível para agendamento.</p>
              )}
              {horariosAgendados.length > 0 && (
                <p className="indisponibilidade-warning">A sala está agendada.</p>
              )}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="agendar-sala-form">
          <input 
            type="text" 
            placeholder="Turma" 
            value={turma} 
            onChange={(e) => setTurma(e.target.value)} 
            className="agendar-sala-input" 
            required 
          />
          <input 
            type="text" 
            placeholder="Período" 
            value={periodo} 
            onChange={(e) => setPeriodo(e.target.value)} 
            className="agendar-sala-input" 
            required 
          />
          <input 
            type="date" 
            value={dia} 
            onChange={(e) => setDia(e.target.value)} 
            className="agendar-sala-input" 
            required 
          />
          <select 
            value={horario} 
            onChange={(e) => setHorario(e.target.value)} 
            className="agendar-sala-select" 
            required
          >
            <option value="" disabled>Selecione o Horário (noite)</option>
            {horariosDisponiveis.map((hora, index) => (
              <option key={index} value={hora}>{hora}</option>
            ))}
          </select>
          <button type="submit" className="agendar-sala-button">Reservar</button>
          <button type="button" onClick={() => navigate('/searchRoom')} className="back-button">Voltar</button>
        </form>
      </div>
    </div>
  );
};

export default AgendarSala2;
