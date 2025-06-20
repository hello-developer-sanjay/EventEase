import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #6b7280, #111827);
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #ffffff;
  margin-bottom: 1rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #d1d5db;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 600px;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Card = styled(motion.div)`
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  width: 300px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: #4b5563;
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Welcome to Event Manager</Title>
      <Subtitle>Choose your event management platform to organize and sync your events seamlessly.</Subtitle>
      <CardContainer>
        <Card
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/eventease')}
        >
          <CardTitle>EventEase</CardTitle>
          <CardDescription>
            Manage your events with Google Calendar sync for seamless scheduling.
          </CardDescription>
        </Card>
        <Card
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/eventpro')}
        >
          <CardTitle>EventPro</CardTitle>
          <CardDescription>
            Simple event management without calendar integration for quick planning.
          </CardDescription>
        </Card>
      </CardContainer>
    </Container>
  );
};

export default Home;
