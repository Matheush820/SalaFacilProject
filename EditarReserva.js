import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/EditarReserva.css';

const EditarReserva = () => {
  const { id } = useParams(); // Obtém o id da URL
  const navigate = useNavigate(); // Para redirecionar para a página anterior
  const [reserva, setReserva] = useState(null);

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        // Chamada à API para buscar os dados da reserva
        const response = await fetch(`/api/reservas/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao carregar a reserva');
        }
        const reservaEncontrada = await response.json(); // Supondo que a API retorne a reserva no formato correto
        setReserva(reservaEncontrada);
      } catch (error) {
        console.error(error);
        alert('Erro ao carregar a reserva');
      }
    };

    fetchReserva();
  }, [id]);

  const salvarAlteracoes = async () => {
    try {
      // Lógica para salvar as alterações
      const resposta = await fetch(`/api/reservas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reserva), // Envia os dados atualizados da reserva
      });

      if (resposta.ok) {
        alert('Reserva atualizada!');
        navigate('/verificar-salas'); // Redireciona para a página de visualização das reservas
      } else {
        throw new Error('Erro ao atualizar reserva');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar reserva');
    }
  };

  const voltarPagina = () => {
    navigate(-1); // Volta para a página anterior
  };

  const handleChange = (e, campo) => {
    setReserva((prevReserva) => ({
      ...prevReserva,
      [campo]: e.target.value,
    }));
  };

  const handleTurmaChange = (e, campo) => {
    setReserva((prevReserva) => ({
      ...prevReserva,
      turma: {
        ...prevReserva.turma,
        [campo]: e.target.value,
      },
    }));
  };

  if (!reserva) {
    return <p>Carregando reserva...</p>;
  }

  return (
    <div className="editar-reserva">
      <h1>Editar Reserva</h1>
      <div className="reserva-info">
        <p><strong>Reserva ID:</strong> {reserva.id}</p>
        <p><strong>Sala:</strong> {reserva.sala}</p>
        <p><strong>Nome Completo:</strong> {reserva.nomeCompleto}</p>
        <p><strong>Curso:</strong> {reserva.turma.curso}</p>
        <p><strong>Período:</strong> {reserva.turma.periodo}</p>
        <p><strong>Turma:</strong> {reserva.turma.identificacao}</p>
        <p><strong>Data:</strong> {reserva.data}</p>
        <p><strong>Horário:</strong> {reserva.horario}</p>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Nome Completo" 
            value={reserva.nomeCompleto} 
            onChange={(e) => handleChange(e, 'nomeCompleto')} 
          />
          <input 
            type="text" 
            placeholder="Curso" 
            value={reserva.turma.curso} 
            onChange={(e) => handleTurmaChange(e, 'curso')} 
          />
          <input 
            type="text" 
            placeholder="Período" 
            value={reserva.turma.periodo} 
            onChange={(e) => handleTurmaChange(e, 'periodo')} 
          />
          <input 
            type="text" 
            placeholder="Turma" 
            value={reserva.turma.identificacao} 
            onChange={(e) => handleTurmaChange(e, 'identificacao')} 
          />
          <input 
            type="date" 
            value={reserva.data} 
            onChange={(e) => handleChange(e, 'data')} 
          />
          <input 
            type="text" 
            placeholder="Horário" 
            value={reserva.horario} 
            onChange={(e) => handleChange(e, 'horario')} 
          />
        </div>

        <button onClick={salvarAlteracoes} className="btn-salvar">
          Salvar Alterações
        </button>

        <button onClick={voltarPagina} className="btn-voltar">
          Voltar
        </button>
      </div>
    </div>
  );
};

export default EditarReserva;
