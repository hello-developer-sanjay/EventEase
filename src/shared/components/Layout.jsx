import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaUserPlus, FaCog } from 'react-icons/fa';
import SettingComponent from '../../eventease/components/SettingComponent';
import { useSelector } from 'react-redux';

// Styled Sidebar
const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 40px;
  background-color: ${({ color }) => color};
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.3s ease;
`;

const NavContainer = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SidebarItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-decoration: none;
  width: 100%;
  padding: 12px 0;
  transition: background-color 0.3s ease;
  position: relative;

  &:hover {
    background-color: #555;
  }

  &:hover::after {
    content: attr(data-toast);
    position: absolute;
    top: 50%;
    left: 50px;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    white-space: nowrap;
  }
`;

const Icon = styled.div`
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Styled Main Area
const MainContent = styled.div`
  margin-left: 40px;
  padding: 1px 1px;
  transition: margin-left 0.3s ease;
  display: flex;
  flex-direction: column;
  color: ${({ color }) => color};
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: ${({ fontSize }) => fontSize};
  line-height: ${({ lineHeight }) => lineHeight};
  background-image: ${({ backgroundImage }) => backgroundImage ? `url(${backgroundImage})` : 'none'};
  border-radius: ${({ borderRadius }) => borderRadius};
  box-shadow: ${({ boxShadow }) => boxShadow};
  min-height: 100vh;
`;

// Top Navigation inside Main
const Header = styled.header`
  background: rgba(0,0,0,0.05);
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
`;

const NavLinks = styled.nav`
  margin-top: 10px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const Layout = ({ children }) => {
  const location = useLocation();
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const isEventEase = location.pathname.startsWith('/eventease');
  const appName = isEventEase ? 'EventEase' : 'EventPro';

  // Debug Redux state
  const entireState = useSelector(state => state);
  console.log('Redux state in Layout:', entireState);

  // Select settings based on app context
  const settings = useSelector(state => {
    if (!state.eventease || !state.eventpro) {
      console.error('Redux state missing eventease or eventpro in Layout:', state);
      return null;
    }
    return isEventEase ? state.eventease.settings : state.eventpro.settings;
  }) || {
    color: '#000000',
    fontFamily: 'Arial',
    fontSize: '16px',
    lineHeight: '1.5',
    backgroundImage: null,
    borderRadius: '0px',
    boxShadow: 'none',
  };

  const {
    color,
    fontFamily,
    fontSize,
    lineHeight,
    backgroundImage,
    borderRadius,
    boxShadow,
  } = settings;

  const toggleSettingPanel = () => setIsSettingOpen(!isSettingOpen);
  const handleCloseSetting = () => setIsSettingOpen(false);

  return (
    <>
      <Sidebar isSettingOpen={isSettingOpen} color={color}>
        <NavContainer>
          <SidebarItem to="/" data-toast="Home">
            <Icon><FaHome /></Icon>
          </SidebarItem>

          <SidebarItem to={isEventEase ? "/eventease/login" : "/eventpro/login"} data-toast="Login">
            <Icon><FaUserPlus /></Icon>
          </SidebarItem>

          <SidebarItem as="div" onClick={toggleSettingPanel} data-toast="Settings">
            <Icon><FaCog /></Icon>
          </SidebarItem>
        </NavContainer>
      </Sidebar>

      <MainContent
        isSettingOpen={isSettingOpen}
        color={color}
        fontFamily={fontFamily}
        fontSize={fontSize}
        lineHeight={lineHeight}
        backgroundImage={backgroundImage}
        borderRadius={borderRadius}
        boxShadow={boxShadow}
      >
       

        {children}
      </MainContent>

      {isSettingOpen && <SettingComponent onClose={handleCloseSetting} />}
    </>
  );
};

export default Layout;
