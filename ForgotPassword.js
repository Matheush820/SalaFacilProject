import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRedefinirSenha = async (e) => {
    e.preventDefault();

    if (novaSenha !== confirmarSenha) {
      setMessage('As senhas não coincidem. Tente novamente.');
      return;
    }

    if (novaSenha.length < 6) {
      setMessage('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('SUA_API_REDEFINIR_SENHA', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ novaSenha }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message || 'Erro ao redefinir a senha. Tente novamente.');
        return;
      }

      setMessage('Senha redefinida com sucesso!');
      setTimeout(() => {
        setNovaSenha(''); // Limpar o campo de nova senha
        setConfirmarSenha(''); // Limpar o campo de confirmação
        navigate('/enter-usuario');
      }, 3000);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="forgot-password-page">
    <div className="forgot-password-container">
      <h1 className="forgot-password-title">Redefinir Senha</h1>
      <form onSubmit={handleRedefinirSenha}>
        <div className="forgot-password-input-container">
          <label htmlFor="novaSenha">Nova Senha:</label>
          <input
            type="password"
            id="novaSenha"
            className="forgot-password-input"
            placeholder="Nova Senha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
          />
        </div>
        <div className="forgot-password-input-container">
          <label htmlFor="confirmarSenha">Confirmar Senha:</label>
          <input
            type="password"
            id="confirmarSenha"
            className="forgot-password-input"
            placeholder="Confirmar Senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="forgot-password-submit-button" disabled={loading}>
          {loading ? 'Redefinindo...' : 'Redefinir Senha'}
        </button>
      </form>
      {message && <p className="forgot-password-message">{message}</p>}
    </div>
  </div>
  
  );
};

export default ForgotPassword;
