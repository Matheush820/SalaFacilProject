import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const navigate = useNavigate();
  const [registrationSent, setRegistrationSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [senhaErro, setSenhaErro] = useState(false); // Estado para marcar o erro visual

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/SalaSucess');  //SalaSucess  enter-usuario
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      nome: formData.get('nome'),
      email: formData.get('email'),
      senha: formData.get('senha'),
    };

    // Verifica se as senhas coincidem antes de fazer a requisição
    if (senha !== confirmarSenha) {
      setErrorMessage('As senhas não coincidem.');
      setSenhaErro(true); // Aplica a borda vermelha ao campo de confirmação de senha
      return;
    }

    setSenhaErro(false); // Remove a borda vermelha se as senhas coincidirem
    setErrorMessage(''); // Limpa a mensagem de erro

    try {
      const response = await fetch('http://localhost:8081/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setRegistrationSent(true);
        alert('Cadastro realizado com sucesso! Um código de matrícula foi enviado para seu email.');
        navigate('/enter-usuario');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Erro ao criar conta');
      }
    } catch (error) {
      console.error('Erro:', error);
      setErrorMessage('Houve um erro ao criar sua conta. Tente novamente.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <h1>SalaFacil</h1>
        <FontAwesomeIcon icon={faCalendarAlt} size="3x" className="calendar-icon" />
        <h2 className="bemvindoLogin">BEM-VINDO DE VOLTA</h2>
        <p className="bemvindoLogin">ACESSA SUA CONTA AGORA MESMO</p>
        <form onSubmit={handleLogin}>
          <button className="login-button" type="submit">Entrar</button>
        </form>
        <Link to="/forgot-password" className="forgot-password-link">
          Esqueceu a senha?
        </Link>
      </div>

      <div className="login-right">
        <h2>Crie sua conta</h2>
        <form onSubmit={handleCreateAccount}>
          <div className="input-group">
            <FontAwesomeIcon icon={faUser} className="input-icon" />
            <label>Nome Completo:</label>
            <input type="text" name="nome" placeholder="Nome Completo" required />
          </div>
          <div className="input-group">
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <label>Email:</label>
            <input type="email" name="email" placeholder="Email" required />
          </div>
          <div className="input-group">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <label>Senha:</label>
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div className="input-group">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <label>Confirmar Senha:</label>
            <input
              type="password"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              required
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className={senhaErro ? 'input-error' : ''}
            />
          </div>
          <button type="submit" className="create-button">Criar Conta</button>
        </form>
        {errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}
        {registrationSent && (
          <p className="notification">
            Um código de matrícula foi enviado para seu email. Use-o para fazer login.
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
