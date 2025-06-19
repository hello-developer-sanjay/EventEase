import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.jpeg'; // Adjust the path to your logo

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Background = styled(motion.div)`
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

const Logo = styled(motion.img)`
  width: 150px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 100px;
  }
`;

const Message = styled(motion.div)`
  color: #ffcc00;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const SubMessage = styled(motion.div)`
  color: #e6e6e6;
  font-size: 18px;
  text-align: center;
  margin-bottom: 40px;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const LoginButton = styled(motion.button)`
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  color: #1a1a1a;
  background-color: #ffcc00;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #e6b800;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 16px;
  }
`;

const transition = { duration: 0.5, ease: 'easeInOut' };

const LoginPrompt = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <Background
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Logo 
        src={logo} 
        alt="EventEase Logo" 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, ...transition }}
      />
      <Message
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, ...transition }}
      >
        Welcome to EventEase!
      </Message>
      <SubMessage
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.5, ...transition }}
      >
        Your ultimate tool for managing events with seamless Google Calendar synchronization.
      </SubMessage>
      <LoginButton
        onClick={handleLoginClick}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, ...transition }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Get Started
      </LoginButton>
    </Background>
  );
};

export default LoginPrompt;