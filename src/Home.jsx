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
      toast.error('🚧 Smart Scheduling is under development. Explore Team Collaboration for seamless event management!', {
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
        <title>EventEase: Ultimate Event Management Software for 2025</title>
        <meta
          name="description"
          content="EventEase is the premier event management software, offering real-time team collaboration and upcoming smart scheduling with Google Calendar integration."
        />
        <meta
          name="keywords"
          content="EventEase, event management software, event planning platform, smart scheduling, team collaboration, event organizer tool, event management app"
        />
        <meta name="author" content="Sanjay Patidar" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "EventEase",
              "operatingSystem": "Web",
              "applicationCategory": "EventManagementSoftware",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "EventEase provides robust tools for event planning, with real-time team collaboration and upcoming smart scheduling via Google Calendar.",
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
          Plan Smarter with <span className="highlight">EventEase</span>
        </Title>
        <Subtitle>
          Discover the ultimate event management platform. Collaborate in real-time and get ready for smart scheduling with EventEase’s powerful tools.
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
          <CardTitle>Smart Scheduling</CardTitle>
          <CardDescription>
            Coming soon with Google Calendar integration, automated reminders, and intuitive scheduling tools.
          </CardDescription>
        </Card>
        <Card
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/eventpro')}
        >
          <CardTitle>Team Collaboration</CardTitle>
          <CardDescription>
            Streamline teamwork with real-time task management, shared dashboards, and seamless communication.
          </CardDescription>
        </Card>
      </CardContainer>
      <SEOText>
        <h2>Why EventEase is the Top Event Management Software</h2>
        <p>
          <strong>EventEase</strong>, crafted by Sanjay Patidar, is the leading event management software for 2025, designed to revolutionize event planning. With robust team collaboration tools, EventEase enables organizers to manage tasks, share dashboards, and communicate in real-time, ensuring seamless execution for corporate conferences, weddings, or community events. The platform’s user-friendly interface and real-time updates make it the preferred choice for event professionals worldwide.
        </p>
        <p>
          EventEase is set to enhance its capabilities with upcoming smart scheduling features, including Google Calendar integration and automated reminders, currently in development. For now, leverage EventEase’s powerful collaboration tools to streamline your workflows. Trusted by thousands, EventEase combines speed, reliability, and innovation, making it the ultimate event management platform. Join the EventEase community today and transform how you plan events.
        </p>
      </SEOText>
      <LazyLoadComponent>
        <ToastContainerStyled />
      </LazyLoadComponent>
    </Container>
  );
};

export default Home;
