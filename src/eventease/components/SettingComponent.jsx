import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  updateColor,
  updateFontFamily,
  updateFontSize,
  updateLineHeight,
  updateBackgroundImage,
  updateBorderRadius,
  updateBoxShadow,
} from '../../store/slices/eventease/settingsSlice';
import {
  updateColor as updateEventProColor,
  updateFontFamily as updateEventProFontFamily,
  updateFontSize as updateEventProFontSize,
  updateLineHeight as updateEventProLineHeight,
  updateBackgroundImage as updateEventProBackgroundImage,
  updateBorderRadius as updateEventProBorderRadius,
  updateBoxShadow as updateEventProBoxShadow,
} from '../../store/slices/eventpro/settingsSlice';

const SettingContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 300px;
  background-color: #fff;
  z-index: 1000;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const SettingGroup = styled.div`
  margin-bottom: 20px;
`;

const SettingLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const SettingInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SettingSelect = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SaveButton = styled.button`
  margin-top: 10px;
  margin-right: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CloseButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SettingComponent = ({ onClose }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isEventEase = location.pathname.startsWith('/eventease');

  // Debug Redux state
  const entireState = useSelector(state => state);
  console.log('Redux state in SettingComponent:', entireState);

  // Select settings based on app context
  const settings = useSelector(state => {
    if (!state.eventease || !state.eventpro) {
      console.error('Redux state missing eventease or eventpro:', state);
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

  const { color, fontFamily, fontSize, lineHeight, backgroundImage, borderRadius, boxShadow } = settings;

  const [localColor, setLocalColor] = useState(color);
  const [localFontFamily, setLocalFontFamily] = useState(fontFamily);
  const [localFontSize, setLocalFontSize] = useState(fontSize);
  const [localLineHeight, setLocalLineHeight] = useState(lineHeight);
  const [localBackgroundImage, setLocalBackgroundImage] = useState(backgroundImage);
  const [localBorderRadius, setLocalBorderRadius] = useState(borderRadius);
  const [localBoxShadow, setLocalBoxShadow] = useState(boxShadow);

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem(isEventEase ? 'eventeaseSettings' : 'eventproSettings'));
    if (savedSettings) {
      setLocalColor(savedSettings.color || color);
      setLocalFontFamily(savedSettings.fontFamily || fontFamily);
      setLocalFontSize(savedSettings.fontSize || fontSize);
      setLocalLineHeight(savedSettings.lineHeight || lineHeight);
      setLocalBackgroundImage(savedSettings.backgroundImage || backgroundImage);
      setLocalBorderRadius(savedSettings.borderRadius || borderRadius);
      setLocalBoxShadow(savedSettings.boxShadow || boxShadow);
    }
  }, [color, fontFamily, fontSize, lineHeight, backgroundImage, borderRadius, boxShadow, isEventEase]);

  const handleColorChange = (e) => setLocalColor(e.target.value);
  const handleFontChange = (e) => setLocalFontFamily(e.target.value);
  const handleFontSizeChange = (e) => setLocalFontSize(e.target.value);
  const handleLineHeightChange = (e) => setLocalLineHeight(e.target.value);
  const handleBackgroundImageChange = (e) => setLocalBackgroundImage(e.target.value);
  const handleBorderRadiusChange = (e) => setLocalBorderRadius(e.target.value);
  const handleBoxShadowChange = (e) => setLocalBoxShadow(e.target.value);

  const handleSaveChanges = () => {
    const newSettings = {
      color: localColor,
      fontFamily: localFontFamily,
      fontSize: localFontSize,
      lineHeight: localLineHeight,
      backgroundImage: localBackgroundImage,
      borderRadius: localBorderRadius,
      boxShadow: localBoxShadow,
    };
    localStorage.setItem(isEventEase ? 'eventeaseSettings' : 'eventproSettings', JSON.stringify(newSettings));
    if (isEventEase) {
      dispatch(updateColor(localColor));
      dispatch(updateFontFamily(localFontFamily));
      dispatch(updateFontSize(localFontSize));
      dispatch(updateLineHeight(localLineHeight));
      dispatch(updateBackgroundImage(localBackgroundImage));
      dispatch(updateBorderRadius(localBorderRadius));
      dispatch(updateBoxShadow(localBoxShadow));
    } else {
      dispatch(updateEventProColor(localColor));
      dispatch(updateEventProFontFamily(localFontFamily));
      dispatch(updateEventProFontSize(localFontSize));
      dispatch(updateEventProLineHeight(localLineHeight));
      dispatch(updateEventProBackgroundImage(localBackgroundImage));
      dispatch(updateEventProBorderRadius(localBorderRadius));
      dispatch(updateEventProBoxShadow(localBoxShadow));
    }
    onClose();
  };

  return (
    <SettingContainer>
      <SettingGroup>
        <SettingLabel htmlFor="color">Color:</SettingLabel>
        <SettingInput type="color" id="color" value={localColor} onChange={handleColorChange} />
      </SettingGroup>
      <SettingGroup>
        <SettingLabel htmlFor="fontFamily">Font Family:</SettingLabel>
        <SettingSelect id="fontFamily" value={localFontFamily} onChange={handleFontChange}>
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
        </SettingSelect>
      </SettingGroup>
      <SettingGroup>
        <SettingLabel htmlFor="fontSize">Font Size:</SettingLabel>
        <SettingInput type="number" id="fontSize" value={localFontSize} onChange={handleFontSizeChange} />
      </SettingGroup>
      <SettingGroup>
        <SettingLabel htmlFor="lineHeight">Line Height:</SettingLabel>
        <SettingInput type="number" id="lineHeight" value={localLineHeight} onChange={handleLineHeightChange} />
      </SettingGroup>
      <SettingGroup>
        <SettingLabel htmlFor="backgroundImage">Background Image URL:</SettingLabel>
        <SettingInput type="text" id="backgroundImage" value={localBackgroundImage} onChange={handleBackgroundImageChange} />
      </SettingGroup>
      <SettingGroup>
        <SettingLabel htmlFor="borderRadius">Border Radius:</SettingLabel>
        <SettingInput type="number" id="borderRadius" value={localBorderRadius} onChange={handleBorderRadiusChange} />
      </SettingGroup>
      <SettingGroup>
        <SettingLabel htmlFor="boxShadow">Box Shadow:</SettingLabel>
        <SettingInput type="text" id="boxShadow" value={localBoxShadow} onChange={handleBoxShadowChange} />
      </SettingGroup>
      <SaveButton onClick={handleSaveChanges}>Save Changes</SaveButton>
      <CloseButton onClick={onClose}>Close</CloseButton>
    </SettingContainer>
  );
};

export default SettingComponent;