import React from 'react';
import EventTable from '../components/EventTable';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ListEventsPage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Header>
        <Button onClick={() => navigate('/eventpro/add-event')}>Add Event</Button>
      </Header>
      <EventTable />
    </PageWrapper>
  );
};

export default ListEventsPage;

const PageWrapper = styled.div`
  background: url('https://sanjaybasket.s3.ap-south-1.amazonaws.com/background.webp') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size:4px;
  &:hover {
    background-color: #45a049;
  }
`;
