import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import EventForm from '../components/EventForm';

const AddEventPage = () => {
    const location = useLocation();
    const eventToEdit = location.state ? location.state.eventToEdit : null;
    const navigate = useNavigate();

    const clearEdit = () => navigate('/list-events');

    return (
        <PageWrapper>
            <Header>
                <Button onClick={() => navigate('/list-events')}>View Events</Button>
            </Header>
            <Content>
                <EventForm eventToEdit={eventToEdit} clearEdit={clearEdit} />
            </Content>
        </PageWrapper>
    );
};

export default AddEventPage;

const PageWrapper = styled.div`
    background: url('https://sanjaybasket.s3.ap-south-1.amazonaws.com/background.webp') no-repeat center center fixed;
    background-size: cover;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
        overflow: hidden;

    align-items: center;
    justify-content: center;
`;

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 20px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #45a049;
    }
`;

const Content = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    padding: 2px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
    margin: 20px;
`;