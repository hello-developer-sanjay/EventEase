import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateColor, updateFontFamily, updateFontSize, updateLineHeight, updateBackgroundImage, updateBorderRadius, updateBoxShadow } from '../../store/slices/eventease/settingsSlice';

const SettingsPanel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background-color: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  padding: 20px;
  z-index: 1000;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  margin: 10px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  margin: 10px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Label = styled.label`
  margin-top: 10px;
  display: block;
  font-weight: bold;
`;

const SettingComponent = ({ onClose }) => {
  const dispatch = useDispatch();
  const settings = useSelector(state => state.settings || {
    color: '#000000',
    fontFamily: 'Arial',
    fontSize: '16px',
    lineHeight: '1.5',
    backgroundImage: null,
    borderRadius: '0px',
    boxShadow: 'none',
  });

  const handleColorChange = (e) => dispatch(updateColor(e.target.value));
  const handleFontFamilyChange = (e) => dispatch(updateFontFamily(e.target.value));
  const handleFontSizeChange = (e) => dispatch(updateFontSize(e.target.value));
  const handleLineHeightChange = (e) => dispatch(updateLineHeight(e.target.value));
  const handleBackgroundImageChange = (e) => dispatch(updateBackgroundImage(e.target.value));
  const handleBorderRadiusChange = (e) => dispatch(updateBorderRadius(e.target.value));
  const handleBoxShadowChange = (e) => dispatch(updateBoxShadow(e.target.value));

  return (
    <SettingsPanel>
      <CloseButton onClick={onClose}>×</CloseButton>
      <h2>Settings</h2>
      <Label>Color</Label>
      <Input type="color" value={settings.color} onChange={handleColorChange} />
      <Label>Font Family</Label>
      <Select value={settings.fontFamily} onChange={handleFontFamilyChange}>
        <option value="Arial">Arial</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
      </Select>
      <Label>Font Size</Label>
      <Input type="text" value={settings.fontSize} onChange={handleFontSizeChange} placeholder="e.g., 16px" />
      <Label>Line Height</Label>
      <Input type="text" value={settings.lineHeight} onChange={handleLineHeightChange} placeholder="e.g., 1.5" />
      <Label>Background Image URL</Label>
      <Input type="text" value={settings.backgroundImage || ''} onChange={handleBackgroundImageChange} placeholder="Enter image URL" />
      <Label>Border Radius</Label>
      <Input type="text" value={settings.borderRadius} onChange={handleBorderRadiusChange} placeholder="e.g., 5px" />
      <Label>Box Shadow</Label>
      <Input type="text" value={settings.boxShadow} onChange={handleBoxShadowChange} placeholder="e.g., 0 2px 4px rgba(0,0,0,0.1)" />
    </SettingsPanel>
  );
};

export default SettingComponent;