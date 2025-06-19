import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/slices/eventease/authSlice';
import styled, { keyframes } from 'styled-components';
import { RingLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  position: relative;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  padding: 20px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://sanjaybasket.s3.ap-south-1.amazonaws.com/background.webp') no-repeat center center fixed;
    background-size: cover;
    filter: blur(5px);
    z-index: -1;
    transition: filter 0.3s ease-in-out;
  }

  &:hover::before {
    filter: blur(3px);
  }
`;

const LoginForm = styled.form`
  padding: 2rem;
  border-radius: 20px;
  max-width: 400px;
  width: 100%;
  transform: perspective(1000px) rotateY(10deg);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  &:hover {
    transform: perspective(1000px) rotateY(0);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  animation: ${fadeIn} 1s ease-in-out;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
`;

const Title = styled.h2`
  font-family: 'Cinzel Decorative', cursive;
  color: #d4af37;
  text-align: center;
  margin-left: 0.5rem;
`;

const LogoImage = styled.img`
  height: 3rem;
  width: auto;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 2px solid #d4af37;
  border-radius: 10px;
  font-size: 1rem;
  width: 100%;
  background-color: #2a2a2a;
  color: #fff;
  transition: border-color 0.3s, box-shadow 0.3s;
  &:focus {
    border-color: #d4af37;
    outline: none;
    box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #d4af37;
  color: black;
  border: none;
  border-radius: 10px;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
  &:hover {
    background-color: #e5c370;
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
`;

const GoogleButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #db4437;
  color: white;
  margin-top: 1rem;
  &:hover {
    background-color: #c23321;
  }
`;

const GoogleIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
`;

const PasswordContainer = styled.div`
  position: relative;
`;

const ToggleIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 10px;
  top: 35%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #d4af37;
`;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const action = await dispatch(login({ email, password }));
      setLoading(false);
      if (login.fulfilled.match(action)) {
        toast.success('Login successful');
        const role = action.payload.user?.role;
        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/eventease');
        }
      } else {
        toast.error(action.payload || 'Invalid email or password');
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message || 'Login failed');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'https://q0lvs5rnt9.execute-api.ap-south-1.amazonaws.com/prod/api/auth/google';
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <TitleContainer>
          <LogoImage src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/certifications/logo.png" alt="EventEase Logo" />
          <Title aria-label="EventEase Title">EventEase</Title>
        </TitleContainer>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
          required
          aria-label="Email"
        />
        <PasswordContainer>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            aria-label="Password"
          />
          <ToggleIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          />
        </PasswordContainer>
        <Button type="submit" aria-label="Login Button">
          {loading ? (
            <RingLoader color={'#000000'} loading={loading} size={20} />
          ) : (
            'Login'
          )}
        </Button>
        <GoogleButton onClick={handleGoogleLogin} aria-label="Login with Google">
          <GoogleIcon icon={faGoogle} />
          Login with Google
        </GoogleButton>
      </LoginForm>
      <ToastContainer />
    </Container>
  );
};

export default Login;
