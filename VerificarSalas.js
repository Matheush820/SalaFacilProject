import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/VerificarSalas.css';

const VerificarSalas = () => {
  const [reservas, setReservas] = useState([]);
  const [userId] = useState(1); // Exemplo: userId do usuário logado
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservas = async () => {
      // Simulando uma chamada API para buscar reservas
      const dadosReservas = [
        {
          id: 1,
          userId: 1,
          sala: 'Sala de Informática 1',
          data: '2024-10-29',
          horario: '09:00 - 11:00',
          image: '/Fiap-aclimacao-lab-1-e1508848494124.jpg',
          nomeCompleto: 'Ana Silva',
          turma: {
            curso: 'Análise e Desenvolvimento de Sistemas',
            periodo: '2º período',
            identificacao: 'Turma C',
          },
        },
        {
          id: 2,
          userId: 2,
          sala: 'Sala de Informática 2',
          data: '2024-10-30',
          horario: '14:00 - 16:00',
          image: '/teladeagendamento.png',
          nomeCompleto: 'Carlos Souza',
          turma: {
            curso: 'Ciência da Computação',
            periodo: '1º período',
            identificacao: 'Turma A',
          },
        },
      ];

      // Filtrar apenas reservas do usuário logado
      setReservas(dadosReservas.filter(reserva => reserva.userId === userId));
    };

    fetchReservas();
  }, [userId]);

  const excluirReserva = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta reserva?')) {
      setReservas(reservas.filter((reserva) => reserva.id !== id));
    }
  };

  const editarReserva = (id) => {
    navigate(`/editar-reserva/${id}`);
  };

  return (
    <div className="verificar-salas">
      <h1>Minhas Reservas de Salas</h1>
      <div className="reservas-container">
        {reservas.length > 0 ? (
          reservas.map((reserva) => (
            <div className="reserva-card" key={reserva.id}>
              <img src={reserva.image} alt={reserva.sala} className="sala-image" />
              <div className="reserva-info">
                <h2>{reserva.sala}</h2>
                <p><strong>Nome Completo:</strong> {reserva.nomeCompleto}</p>
                <p><strong>Curso:</strong> {reserva.turma.curso}</p>
                <p><strong>Período:</strong> {reserva.turma.periodo}</p>
                <p><strong>Turma:</strong> {reserva.turma.identificacao}</p>
                <p><strong>Data:</strong> {reserva.data}</p>
                <p><strong>Horário:</strong> {reserva.horario}</p>
              </div>

              {/* Verifica se o userId da reserva é igual ao userId logado */}
              {reserva.userId === userId && (
                <div className="button-group">
                  <button className="btn-editar" onClick={() => editarReserva(reserva.id)}>Editar</button>
                  <button className="btn-excluir" onClick={() => excluirReserva(reserva.id)}>Excluir</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Nenhuma reserva encontrada.</p>
        )}
      </div>
      <button onClick={() => navigate('/searchRoom')} className="btn-agendar">Agendar Nova Sala</button>
    </div>
  );
};

export default VerificarSalas;
