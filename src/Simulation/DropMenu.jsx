import React, { forwardRef } from 'react';
import './Styles/Styles.css';

const DropMenu = forwardRef(({ handleLoadGraph, handleSaveGraph, isOpen, onClose }, ref) => {
    return (
      <div className={`dropdown-content ${isOpen ? 'open' : ''}`} ref={ref}>
       
        <div className="file-input-container">
  <label htmlFor="file-input" className="small-gray-button-load" >Ouvrir </label>
  <input
    id="file-input"
    type="file"
    accept=".json"
    onChange={handleLoadGraph}
    style={{ display: 'none' }} // Hide the default file input
  />
</div>
        <button className="small-gray-button" onClick={() => handleSaveGraph('json')}>    Exporter </button>
        <button className="small-gray-button" onClick={() => handleSaveGraph('png')}>  Enr PNG </button>
        <button className="small-gray-button" onClick={() => handleSaveGraph('pdf')}>  Enr PDF </button>
        
      </div>
    );
  });

export default DropMenu;



