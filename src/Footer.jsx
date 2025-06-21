import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
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

  position: relative;
  padding: 3rem 1.5rem 2rem;
  background: linear-gradient(180deg, var(--bg-start), var(--bg-end));
  color: var(--text-color);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  border-top: 3px solid var(--primary-color);
  box-shadow: inset 0 4px 20px rgba(230, 57, 70, 0.2);
  overflow: hidden;

  .footer-wave {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,0V46c150,36,350,18,600,46s450,28,600,0V0H0Z" fill="rgba(230,57,70,0.3)"/></svg>') no-repeat;
    background-size: cover;
    opacity: 0.5;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding: 1rem;
  backdrop-filter: blur(8px);
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  transition: var(--transition);

  &:hover {
    transform: translateY(-3px);
  }
`;

const FooterHeading = styled.h3`
  font-size: clamp(1.1rem, 2.2vw, 1.3rem);
  color: var(--secondary-color);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 30px;
    height: 2px;
    background: var(--accent-color);
    transition: width 0.3s ease;
  }

  ${FooterSection}:hover & {
    &::after {
      width: 60px;
    }
  }

  @media (max-width: 768px) {
    &::after {
      margin: 0 auto;
    }
  }
`;

const FooterLink = styled(motion.a)`
  color: var(--text-color);
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  transition: var(--transition);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--accent-color);
    transition: width 0.3s ease;
  }

  &:hover::before,
  &:focus::before {
    width: 100%;
  }

  &:hover,
  &:focus {
    color: var(--accent-color);
    transform: translateX(5px);
    background: rgba(244, 162, 97, 0.1);
  }

  @media (max-width: 768px) {
    &:hover,
    &:focus {
      transform: none;
    }
  }
`;

const SocialShare = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: flex-start;

  @media (max-width: 768px) {
    justify-content: center;
  }

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    background: #e5e7eb;
    text-decoration: none;
    box-shadow: var(--shadow);
    transition: var(--transition);

    &:hover,
    &:focus {
      background: var(--primary-color);
      transform: scale(1.1);
      outline: 2px solid var(--secondary-color);
      outline-offset: 2px;
    }

    svg {
      width: 1.5rem;
      height: 1.5rem;
      fill: var(--secondary-color);
      transition: fill 0.3s ease;
    }

    &:hover svg,
    &:focus svg {
      fill: #fff;
    }
  }
`;

const DeveloperMessage = styled.p`
  font-style: italic;
  font-size: 0.85rem;
  opacity: 0.9;
  line-height: 1.5;
  border-left: 2px solid var(--primary-color);
  padding-left: 0.75rem;

  a {
    color: var(--accent-color);
    font-weight: 600;
    transition: var(--transition);

    &:hover {
      color: var(--secondary-color);
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    text-align: left;
  }
`;

const FooterBottom = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.85rem;
  opacity: 0.85;
  text-align: center;
`;

const Footer = () => {
  const metaTitle = 'Event Manager: Premier Event Planning Software for 2025';
  const pageUrl = 'https://eventpro.com'; // Replace with your actual EventPro URL

  return (
    <FooterContainer>
      <div className="footer-wave" />
      <FooterContent>
        <FooterSection>
          <FooterHeading>Event Manager</FooterHeading>
          <p>
            Transform your event planning with EventPro, the leading event management software for seamless organization and collaboration in 2025.
          </p>
          <SocialShare aria-label="Share EventPro Page">
            <motion.a
              href={`https://x.com/intent/post?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(metaTitle)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Post on X"
              whileHover={{ scale: 1.2 }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9.1 9.1 0 0 1-2.89 1.1A4.52 4.52 0 0 0 16.5 0c-2.53 0-4.5 2.17-4.5 4.84 0 .38.04.75.12 1.1A12.9 12.9 0 0 1 3 1.67a5.06 5.06 0 0 0-.61 2.44c0 1.69.84 3.18 2.13 4.06a4.47 4.47 0 0 1-2.05-.6v.06c0 2.36 1.64 4.33 3.82 4.78a4.4 4.4 0 0 1-2.04.08 4.49 4.49 0 0 0 4.2 3.13A9.05 9.05 0 0 1 1 20.08 12.73 12.73 0 0 0 8 22c7.55 0 11.68-6.49 11.68-12.11 0-.19 0-.39-.01-.58A8.3 8.3 0 0 0 23 3z"/>
              </svg>
            </motion.a>
            <motion.a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
              whileHover={{ scale: 1.2 }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99h-2.54v-2.89h2.54V9.41c0-2.5 1.5-3.89 3.8-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.77l-.44 2.89h-2.33V22C18.34 21.13 22 16.99 22 12z"/>
              </svg>
            </motion.a>
            <motion.a
              href={`https://wa.me/?text=${encodeURIComponent(metaTitle)}%20${encodeURIComponent(pageUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on WhatsApp"
              whileHover={{ scale: 1.2 }}
            >
              <svg viewBox="0 0 32 32" aria-hidden="true">
                <path d="M16.003 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.82.807 5.46 2.192 7.704L2 30l6.5-2.155A13.29 13.29 0 0 0 16.003 29.333C23.36 29.333 29.333 23.36 29.333 16 29.333 8.64 23.36 2.667 16.003 2.667zM16 26.667c-2.219 0-4.287-.654-6.004-1.77l-.43-.27-3.857 1.278 1.275-3.746-.28-.434A10.653 10.653 0 0 1 5.333 16c0-5.899 4.77-10.667 10.667-10.667S26.667 10.101 26.667 16c0 5.899-4.77 10.667-10.667 10.667zm5.61-8.518c-.307-.154-1.815-.895-2.097-.997-.281-.103-.487-.154-.692.154-.206.308-.793.996-.972 1.202-.18.206-.36.231-.667.077a8.73 8.73 0 0 1-2.564-1.64 9.66 9.66 0 0 1-1.79-2.255c-.187-.308-.02-.475.14-.63.14-.138.308-.359.46-.539.153-.179.205-.308.308-.513.103-.205.051-.385-.026-.539-.077-.154-.692-1.666-.948-2.29-.246-.591-.497-.511-.692-.52-.179-.009-.385-.011-.59-.011-.204 0-.538.077-.82.385s-1.077 1.053-1.077 2.562c0 1.508 1.103 2.964 1.257 3.169.154.205 2.16 3.287 5.24 4.62.733.317 1.305.505 1.75.648.735.233 1.405.200 1.934.122.59-.088 1.815-.741 2.072-1.457.256-.717.256-1.33.179-1.456-.077-.127-.28-.205-.589-.359z"/>
              </svg>
            </motion.a>
            <motion.a
              href={`https://t.me/share/?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(metaTitle)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Telegram"
              whileHover={{ scale: 1.2 }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9.041 16.23L8.7 20.176c.508 0 .728-.215.996-.473l2.4-2.29 4.973 3.627c.911.5 1.562.24 1.795-.84l3.252-15.26c.29-1.37-.516-1.91-1.392-1.58L2.24 9.31c-1.34.53-1.32 1.3-.23 1.63l5.47 1.71 12.68-7.91c.6-.39 1.14-.18.7.21L9.04 16.23z"/>
              </svg>
            </motion.a>
          </SocialShare>
        </FooterSection>
        <FooterSection>
          <FooterHeading>Quick Links</FooterHeading>
          <FooterLink
            href="/eventpro"
            whileHover={{ x: 5 }}
          >
            EventPro
          </FooterLink>
          <FooterLink
            href="https://licneemuch.space/about"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 5 }}
          >
            About Us
          </FooterLink>
          <FooterLink
            href="https://licneemuch.space/faqs#contact"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 5 }}
          >
            Contact
          </FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterHeading>Connect with Us</FooterHeading>
          <SocialShare aria-label="Connect with EventPro">
            <motion.a
              href="https://wa.me/6268643002"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect on WhatsApp"
              whileHover={{ scale: 1.2 }}
            >
              <svg viewBox="0 0 32 32" aria-hidden="true">
                <path d="M16.003 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.82.807 5.46 2.192 7.704L2 30l6.5-2.155A13.29 13.29 0 0 0 16.003 29.333C23.36 29.333 29.333 23.36 29.333 16 29.333 8.64 23.36 2.667 16.003 2.667zM16 26.667c-2.219 0-4.287-.654-6.004-1.77l-.43-.27-3.857 1.278 1.275-3.746-.28-.434A10.653 10.653 0 0 1 5.333 16c0-5.899 4.77-10.667 10.667-10.667S26.667 10.101 26.667 16c0 5.899-4.77 10.667-10.667 10.667zm5.61-8.518c-.307-.154-1.815-.895-2.097-.997-.281-.103-.487-.154-.692.154-.206.308-.793.996-.972 1.202-.18.206-.36.231-.667.077a8.73 8.73 0 0 1-2.564-1.64 9.66 9.66 0 0 1-1.79-2.255c-.187-.308-.02-.475.14-.63.14-.138.308-.359.46-.539.153-.179.205-.308.308-.513.103-.205.051-.385-.026-.539-.077-.154-.692-1.666-.948-2.29-.246-.591-.497-.511-.692-.52-.179-.009-.385-.011-.59-.011-.204 0-.538.077-.82.385s-1.077 1.053-1.077 2.562c0 1.508 1.103 2.964 1.257 3.169.154.205 2.16 3.287 5.24 4.62.733.317 1.305.505 1.75.648.735.233 1.405.200 1.934.122.59-.088 1.815-.741 2.072-1.457.256-.717.256-1.33.179-1.456-.077-.127-.28-.205-.589-.359z"/>
              </svg>
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/sanjay-patidar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect on LinkedIn"
              whileHover={{ scale: 1.2 }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </motion.a>
          </SocialShare>
        </FooterSection>
        <FooterSection>
          <FooterHeading>Developer</FooterHeading>
          <DeveloperMessage>
            Crafted with passion by{' '}
            <a href="https://sanjay-patidar.vercel.app" target="_blank" rel="noopener noreferrer">
              Sanjay Patidar
            </a>
            . Event Manager empowers organizers with innovative tools for flawless event execution.
          </DeveloperMessage>
        </FooterSection>
      </FooterContent>
      <FooterBottom>
        <p>© {new Date().getFullYear()} Event Manager. All rights reserved.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
