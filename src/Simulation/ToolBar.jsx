import React from 'react';
import * as Icon from 'react-feather';
import { FaRegCircle } from 'react-icons/fa';
import { TbArrowWaveRightDown } from 'react-icons/tb';
import { PiFlowArrowThin } from 'react-icons/pi';
import { LuSmartphone } from 'react-icons/lu';
import { BsFillPhoneFill } from 'react-icons/bs';
import { WiMoonFull } from 'react-icons/wi';
import { WiMoonAltFull } from 'react-icons/wi';
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux"
import { Tooltip } from 'react-tooltip'




//import {  getSelectedTool,  setSelectedTool, setIsSelectable, setModalOpt } from '../ReduxSlice/EditSlice';

import './Styles/Styles.css';

const ToolBar = ({ isOpen, onClose, SelectedTool, onControlsClick }) => {
   
  return (
    <div className={`soustoolbar ${isOpen ? 'open' : ''}`}>
      <div className="grid">
        <div className="col-span"   >
          <ul className="toolbar">
          <li className="toolbar-item">
                        <div className="toolbar-button">
                            <button data-tooltip-id="my-tooltip" data-tooltip-content="Place"
                                type="button"
                                className={'toolbar-button' + (SelectedTool === 'place' ? ' active' : '')}
                                onClick={() => onControlsClick('place')}
                               
                               //add msg 
                            >
                               
                                <FaRegCircle style={{ fontSize: "40px", strokeWidth: "1" }}  />
                                <Tooltip id="my-tooltip" />
                            </button>
                        </div>
                    </li>
            <li className="toolbar-item">
                        <div className="toolbar-button">
                            <button data-tooltip-id="my-tooltip" data-tooltip-content="Ajouter Jeton"
                                type="button"
                                className={'toolbar-button' + (SelectedTool === 'token' ? ' active' : '')}
                                onClick={() => onControlsClick('Add-token')}
                               
                                >
                              
                                <WiMoonFull style={{ fontSize: "20px", strokeWidth: "1" }}/>
                                <Tooltip id="my-tooltip" />
                            </button>
                        </div>
                    </li>
                    <li className="toolbar-item">
                        <div className="toolbar-button">
                            <button data-tooltip-id="my-tooltip" data-tooltip-content="Supprimer Jeton"
                                type="button"
                                className={'toolbar-button' + (SelectedTool === 'token' ? ' active' : '')}
                                onClick={() => onControlsClick('delete-token')}
                               
                                >
                                <WiMoonAltFull style={{ fontSize: "20px", strokeWidth: "1" }} />
                                <Tooltip id="my-tooltip" />
                            </button>
                        </div>
                    </li>
                    <li className="toolbar-item">
                        <div className="toolbar-button">
                            <button data-tooltip-id="my-tooltip" data-tooltip-content="Transition"
                                type="button"
                                className={'toolbar-button' + (SelectedTool === 'transition' ? ' active' : '')}
                                onClick={() => onControlsClick('transition')}
                               
                                >
                               
                                <LuSmartphone style={{ fontSize: "40px", strokeWidth: "1" }}/>
                                <Tooltip id="my-tooltip" />
                            </button>
                        </div>
                    </li>
                    <li className="toolbar-item">
                        <div className="toolbar-button">
                            <button data-tooltip-id="my-tooltip" data-tooltip-content="Timed_Transition"
                                type="button"
                                className={'toolbar-button' + (SelectedTool === 'timed-transition' ? ' active' : '')}
                                onClick={() => onControlsClick('timed-transition')}
                               
                                >
                                
                                <BsFillPhoneFill style={{ fontSize: "40px", strokeWidth: "1" }} />
                                <Tooltip id="my-tooltip" />
                            </button>
                        </div>
                    </li>
                    
                    <li className="toolbar-item">
                        <div className="toolbar-button">
                            <button data-tooltip-id="my-tooltip" data-tooltip-content="Arc"
                                type="button"
                                className={'toolbar-button' + (SelectedTool === 'arc' ? ' active' : '')}
                                onClick={() => onControlsClick('arc')}
                                
                                >
                               
                               <TbArrowWaveRightDown style={{ fontSize: "40px", strokeWidth: "1" }} />
                               <Tooltip id="my-tooltip" />
                            </button>
                        </div>
                    </li>
                    <li className="toolbar-item">
                        <div className="toolbar-button">
                            <button data-tooltip-id="my-tooltip" data-tooltip-content="Arc_inhibe"
                                type="button"
                                className={'toolbar-button' + (SelectedTool === 'arcinhibe' ? ' active' : '')}
                                onClick={() => onControlsClick('arcinhibe')}
                                
                                >
                               
                                <PiFlowArrowThin  style={{ fontSize: "40px", strokeWidth: "1" }}/>
                                <Tooltip id="my-tooltip" />
                            </button>
                        </div>
                    </li>
                   
           
           


          </ul>
        </div>
        
      </div>
     
      <div className="close-button-container">
        <button type="button" onClick={onClose} className="close-button">
        <RiArrowDropDownLine style={{ fontSize: "20px", strokeWidth: "1" }} />
        </button>
      </div>
     
    </div>


  );
};

export default ToolBar;

