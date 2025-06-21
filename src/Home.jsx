import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import  LazyLoadComponent  from 'react-lazy-load';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  --primary-color: #E63946;
  --secondary-color: #1DE9B6;
  --accent-color: #F4A261;
  --bg-start: #0A0C14;
  --bg-end: #040506;
  --text-color: #E4ECEF;
  --card-border: rgba(230, 57, 70, 0.5);
  --card-bg: rgba(4, 5, 6, 0.9);
  --shadow: 0 8px 25px rgba(0, 0, 0, 0.9);
  --glow: 0 0 12px rgba(230, 57, 70, 0.4);
  --border-radius: 8px;
  --transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, var(--bg-start), var(--bg-end));
  padding: 40px 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: var(--text-color);
`;

const HeroSection = styled.section`
  text-align: center;
  max-width: 1000px;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  color: var(--accent-color);
  margin-bottom: 1rem;
  text-shadow: 4px 4px 12px rgba(0, 0, 0, 0.7);
  animation: slide-in-left 0.8s ease-out;
  font-weight: 900;
  letter-spacing: 0.04em;

  @keyframes slide-in-left {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 3vw, 1.25rem);
  color: var(--text-color);
  line-height: 1.9;
  opacity: 0.85;
  margin-bottom: 2rem;
  animation: fade-in-up 0.8s ease-out 0.2s both;

  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
`;

const Card = styled(motion.div)`
  background: var(--card-bg);
  border: 2px solid var(--card-border);
  border-radius: var(--border-radius);
  padding: 2rem;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    opacity: 0;
    z-index: -1;
    transition: opacity 0.4s ease;
  }

  &:hover::before {
    opacity: 0.15;
  }

  &:hover {
    transform: translateY(-3px);
    border-color: var(--secondary-color);
    box-shadow: var(--glow);
  }

  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`;

const CardTitle = styled.h2`
  font-size: 1.75rem;
  color: var(--secondary-color);
  margin-bottom: 1rem;
  font-weight: 600;
  letter-spacing: 0.04em;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: var(--text-color);
  line-height: 1.5;
  opacity: 0.85;
`;

const SEOText = styled.div`
  max-width: 1000px;
  text-align: center;
  margin: 3rem 0;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  line-height: 1.9;
  color: var(--text-color);

  h2 {
    font-size: clamp(1.7rem, 4vw, 2.3rem);
    color: var(--primary-color);
    margin-bottom: 0.9rem;
    border-left: 4px solid var(--secondary-color);
    padding-left: 0.7rem;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 40px;
      height: 2px;
      background: var(--accent-color);
      animation: slide-in-right 0.8s ease-out;
    }

    @keyframes slide-in-right {
      from { width: 0; }
      to { width: 40px; }
    }
  }

  p {
    opacity: 0.85;
    margin-bottom: 1rem;
  }
`;

const ToastContainerStyled = styled(ToastContainer)`
  .Toastify__toast {
    background: var(--card-bg);
    color: var(--text-color);
    border: 2px solid var(--primary-color);
    box-shadow: var(--glow);
    border-radius: var(--border-radius);
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
  }

  .Toastify__toast--error {
    background: rgba(230, 57, 70, 0.9);
    border-color: var(--secondary-color);
  }

  .Toastify__close-button {
    color: var(--accent-color);
  }

  .Toastify__progress-bar {
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  }
`;

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      toast.error('🚧 EventEase is under development. Switch to EventPro for seamless event management!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }, 500); // Delay to ensure lazy-load completes
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <Helmet>
        <title>Event Manager: Premier Event Planning Software for 2025</title>
        <meta
          name="description"
          content="Event Manager delivers cutting-edge event planning with EventPro, the ultimate event management software for seamless scheduling and collaboration."
        />
        <meta
          name="keywords"
          content="event management software, event planning platform, EventPro, event organizer tool, event scheduling, event management app"
        />
        <meta name="author" content="Sanjay Patidar" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Event Manager",
              "operatingSystem": "Web",
              "applicationCategory": "EventManagementSoftware",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "Event Manager with EventPro offers robust tools for event planning, scheduling, and collaboration.",
              "author": {
                "@type": "Person",
                "name": "Sanjay Patidar"
              }
            }
          `}
        </script>
      </Helmet>
      <HeroSection>
        <Title>
          Master Your Events with <span className="highlight">EventPro</span>
        </Title>
        <Subtitle>
          Experience the future of event management with our intuitive platform. Plan, track, and execute events effortlessly with EventPro’s powerful tools.
        </Subtitle>
      </HeroSection>
      <CardContainer>
        <Card
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/eventease')}
        >
          <CardTitle>EventEase</CardTitle>
          <CardDescription>
            Coming soon with Google Calendar integration for effortless event scheduling and management.
          </CardDescription>
        </Card>
        <Card
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/eventpro')}
        >
          <CardTitle>EventPro</CardTitle>
          <CardDescription>
            The ultimate event management platform for rapid planning, real-time collaboration, and seamless execution.
          </CardDescription>
        </Card>
      </CardContainer>
      <SEOText>
        <h2>Why EventPro is the Best Event Management Software</h2>
        <p>
          Event Manager, powered by <strong>EventPro</strong>, is the leading event planning platform for 2025. Designed by Sanjay Patidar, our software simplifies every aspect of event organization, from scheduling to collaboration. Whether you’re managing corporate conferences, weddings, or community events, EventPro offers a user-friendly interface, real-time updates, and robust features to ensure success. Unlike other event management apps, EventPro prioritizes speed and reliability, making it the go-to choice for event organizers worldwide.
        </p>
        <p>
          Our platform stands out for its intuitive design and powerful functionality. Start planning your next event with EventPro and discover why it’s the preferred event scheduling tool for professionals. EventEase is under development, but EventPro is ready to handle all your event management needs today.
        </p>
      </SEOText>
      <LazyLoadComponent>
        <ToastContainerStyled />
      </LazyLoadComponent>
    </Container>
  );
};

export default Home;
