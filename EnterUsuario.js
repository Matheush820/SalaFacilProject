import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/EnterUsuario.css';

const EnterUsuario = () => {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(''); // Limpa a mensagem de erro ao tentar novamente

    try {
      const response = await fetch('http://localhost:8081/autenticacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matricula, senha }),
      });

      if (response.ok) {
        setErro('');
        navigate('/searchRoom'); // Redireciona para a página de Salas Agendadas
      } else {
        const errorData = await response.json();
        setErro(errorData.message || 'Matrícula ou senha inválidos');
      }
    } catch (error) {
      console.error('Erro:', error);
      setErro('Erro de conexão com o servidor. Tente novamente.');
    }
  };

  return (
    <div className="enter-usuario-container">
      <div className="login-container">
        <h2 className="login-title">Entre na sua Conta</h2>
        
        {erro && <p className="error-message">{erro}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="matricula">Matrícula:</label>
            <input 
              type="text" 
              id="matricula"
              placeholder="Digite sua matrícula" 
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              className={erro ? 'input-error' : ''}
              required 
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="senha">Senha:</label>
            <input 
              type="password" 
              id="senha"
              placeholder="Digite sua senha" 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className={erro ? 'input-error' : ''}
              required 
            />
          </div>
          <button type="submit" className="submit-button">Entrar</button>
        </form>
        
        <div className="links-container">
          <Link to="/forgot-password" className="forgot-password-link">Esqueceu a senha?</Link>
          <Link to="/" className="signup-link">Criar conta</Link>
        </div>
      </div>
    </div>
  );
};

export default EnterUsuario;
