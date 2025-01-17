import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AgendarSala.css';

const ReservarEspaco = () => {
  const navigate = useNavigate();

  const [periodo, setPeriodo] = useState('');  // alterado de turno para periodo
  const [turma, setTurma] = useState('');      // alterado de grupo para turma
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [horariosReservados, setHorariosReservados] = useState([]);
  const [expandido, setExpandido] = useState(false);
  const [curso, setCurso] = useState('');

  const cursosDisponiveis = [
    'Análise e Desenvolvimento de Sistemas',
    'Engenharia de Software',
    'Gestão de Tecnologia da Informação',
    'Ciência da Computação',
    'Redes de Computadores',
    'Banco de Dados',
    'Segurança da Informação',
  ];

  const horariosDisponiveis = [
    "07:30-10:00", "10:00-12:00", "12:00-14:00", "14:00-16:00", "16:00-18:00", "18:30-20:00", "20:00-22:00"
  ];

  const buscarReservas = async () => {
    try {
      const resposta = await axios.get('/api/reservas');
      setHorariosReservados(resposta.data);
    } catch (erro) {
      console.error('Erro ao buscar reservas:', erro);
    }
  };

  useEffect(() => {
    buscarReservas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reserva = { data, hora, curso, periodo, turma };  // alterado de grupo para turma

    if (horariosReservados.some(h => h.data === data && h.hora === hora)) {
      alert('Este horário já está reservado!');
      return;
    }

    try {
      await axios.post('/api/reservas', reserva);
      setHorariosReservados(prevHorarios => [...prevHorarios, reserva]);
      alert(`Espaço reservado para ${curso} no dia ${data} às ${hora}`);
      resetForm();
      navigate('/ReservaSucesso');
    } catch (erro) {
      console.error('Erro ao reservar o espaço:', erro);
      alert('Erro ao reservar o espaço. Tente novamente.');
    }
  };

  const resetForm = () => {
    setData('');
    setHora('');
    setCurso('');
    setPeriodo('');
    setTurma('');
  };

  const toggleExpand = () => {
    setExpandido(!expandido);
  };

  return (
    <div className="reservar-espaco-container">
      <header className="reservar-espaco-header">
        <h1 className="reservar-espaco-title">Reservar Espaço de Informática I</h1>
        <p className="info-aviso">Atenção: Este laboratório está disponível para todos os cursos da faculdade.</p>
      </header>

      <div className="reservar-espaco-content">
        <div className="reservar-espaco-image-container">
          <img 
            src='Fiap-aclimacao-lab-1-e1508848494124.jpg' 
            alt="Espaço de Informática 1" 
            className="reservar-espaco-image" 
          />
        </div>

        <div className="reservar-espaco-details">
          <h2 className='infoEspaco'>Reservas</h2>
          <button onClick={toggleExpand} className="toggle-button-agendar">
            {expandido ? 'Ocultar Horários' : 'Mostrar Horários'}
          </button>
          {expandido && (
            <div className="reservar-espaco-indisponibilidade">
              {horariosReservados.length > 0 ? (
                <ul>
                  {horariosReservados.map((reserva, index) => (
                    <li key={index} className="horario-indisponivel">
                      {reserva.data} às {reserva.hora} - {reserva.curso} - {reserva.periodo} - Turma {reserva.turma}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className='mostrar-horario'>Não há reservas.</p>
              )}
            </div>
          )}
        </div>

        <form className="reservar-espaco-form" onSubmit={handleSubmit}>
          <label>Curso:</label>
          <select 
            value={curso} 
            onChange={(e) => setCurso(e.target.value)} 
            className="reservar-espaco-select"
          >
            <option value="">Selecione o curso</option>
            {cursosDisponiveis.map((curso, index) => (
              <option key={index} value={curso}>{curso}</option>
            ))}
          </select>

          <label>Período:</label>  {/* Alterado de Turno para Período */}
          <input
            type="text"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}  // Alterado de setTurno para setPeriodo
            className="reservar-espaco-input"
            placeholder="Digite o Período"
          />

          <label>Turma:</label>   {/* Alterado de Grupo para Turma */}
          <input
            type="text"
            value={turma}
            onChange={(e) => setTurma(e.target.value)}   // Alterado de setGrupo para setTurma
            className="reservar-espaco-input"
            placeholder="Digite a Turma"
          />

          <label>Data:</label>
          <input 
            type="date" 
            value={data} 
            onChange={(e) => setData(e.target.value)} 
            className="reservar-espaco-input"
          />

          <label>Hora:</label>
          <select 
            value={hora} 
            onChange={(e) => setHora(e.target.value)} 
            className="reservar-espaco-select"
          >
            <option value="">Selecione a hora</option>
            {horariosDisponiveis.map((hora, index) => (
              <option key={index} value={hora}>{hora}</option>
            ))}
          </select>

          <button type="submit" className="reservar-espaco-button">Reservar</button>
          <button onClick={() => navigate('/buscarEspaco')} className="voltar-button">Voltar</button>
        </form>
      </div>
    </div>
  );
};

export default ReservarEspaco;
