import React, { useState , useEffect,useRef } from 'react';
import ToolBar from './ToolBar'; // Adjust the path based on your project structure
import * as Icon from 'react-feather';

import { FaRegCircle } from 'react-icons/fa';
import { WiMoonFull } from 'react-icons/wi';
import { CiFileOn } from "react-icons/ci";
import { CgMathPlus } from "react-icons/cg";
import { TfiText } from "react-icons/tfi";
import { FiEdit } from "react-icons/fi";
import { IoSaveOutline } from "react-icons/io5";
import { CiUndo } from "react-icons/ci";
import { CiRedo } from "react-icons/ci";
import { MdRestartAlt } from "react-icons/md";
import { VscTriangleRight } from "react-icons/vsc";
import { RiEqualLine } from "react-icons/ri";
import { VscRunAll } from "react-icons/vsc";
import { AiOutlineShareAlt } from "react-icons/ai";
import { AiOutlinePullRequest } from "react-icons/ai";
import elementIcon from './element.svg';




import DropMenu from './DropMenu';


import { useDispatch, useSelector } from 'react-redux';
import {
  getSelectedTool,
  setSelectedTool,
  setIsSelectable,
  getSelectMsg ,
  setSelectMsg,
  setModalOpt,
} from '../ReduxSlice/EditSlice';
import './Styles/Styles.css';

import { Tooltip } from 'react-tooltip'

export const MainToolbar = ({ onSaveCanvas,DeleteAllCanvas , handleLoadGraph, handleSaveGraph , undo  , redo , simulationbystep ,handlesimulation , handleReInitialiserReseau ,pause}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropMenuOpen, setIsDropMenuOpen] = useState(false);
  const [selectedShape, setSelectedShape] = useState('');
  const dispatch = useDispatch();
  const SelectedTool = useSelector(getSelectedTool);
  const selectMsg = useSelector(getSelectMsg)


  //const [messagePosition, setMessagePosition] = useState({ top: 0, left: 0 });

  
  

  const toolbarItemRefs = useRef([]);

  

  const dropMenuRef = useRef(null);
 
  const handleMenuOpen = (shape) => {
    setIsMenuOpen(true);
    setSelectedShape(shape);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };
  const handleDropMenuOpen = (shape) => {
    setIsMenuOpen(true);
    setSelectedShape(shape);
  };

  const handleDropMenuClose = () => {
    setIsMenuOpen(false);
  };

 

  const onControlsClick = (target) => {
    dispatch(setSelectedTool(target));
    dispatch(setIsSelectable(target === 'pointer'));
  };

  
  

  const [currentTool, setCurrentTool] = useState('stop'); // State to track current tool

  const toggleTool = () => {
      setCurrentTool(prevTool => prevTool === 'start' ? 'stop' : 'start'); // Toggle between 'start' and 'stop'
  };
  const secondButtonRef = useRef(null);
  useEffect(() => {
    if (currentTool === 'start') {
        // If current tool is 'start', simulate click on the second button
        secondButtonRef.current.click();
    }
}, [currentTool]);

  

  
  
  

  //  <button onClick={handleLoadGraph}>Reload</button>
  //onClick={() => setIsDropMenuOpen(prevState => !prevState)}
  //  onClick={() => setIsDropMenuOpen(true)}

  return (
    <div className="grid" >
      <div className="col-span-main"  >
        <ul className="main-toolbar" >
        
        <li className="toolbar-item"  >
            <div className="toolbar-button">
              <button data-tooltip-id="my-tooltip" data-tooltip-content="Fichier"
                type="button"
                className="toolbar-button"
               
                    onClick={() => setIsDropMenuOpen(prevState => !prevState)}>
                <CiFileOn style={{ fontSize: '30px', strokeWidth: '1' }} />
                <Tooltip id="my-tooltip" />
              </button>
            </div>
            {isDropMenuOpen && (
              <DropMenu
                handleLoadGraph={handleLoadGraph}
                handleSaveGraph={handleSaveGraph}
                isOpen={isDropMenuOpen}
                onClose={handleDropMenuClose}
                ref={dropMenuRef}
              />
            )}
          </li>
        <li className="toolbar-item" ref={(el) => (toolbarItemRefs.current[0] = el)} >
                        <div className="toolbar-button">
                            <button data-tooltip-id="my-tooltip" data-tooltip-content="Pointeur"
                                type="button"
                                className={'toolbar-button' + (SelectedTool === 'pointer' ? ' active' : '')}
                                onClick={() => onControlsClick('pointer')}
                                onMouseEnter={() => dispatch(setSelectMsg('pointer'))}
                                onMouseLeave={() => dispatch(setSelectMsg(SelectedTool))}
                            >
                                <Icon.MousePointer  />
                                <Tooltip id="my-tooltip" />
                            </button>

                          
                        </div>
                    </li>
         
         
          <li className="toolbar-item">
            <div className="toolbar-button">
              <button type="button" className="toolbar-button"  onClick={() => handleMenuOpen('moon')}  data-tooltip-id="my-tooltip" data-tooltip-content="Eléments">
              <img
               src={elementIcon}
               
         
               style={{ width: '30px', height: '30px', strokeWidth: '1' }} 
      />
               
                <Tooltip id="my-tooltip" />
              </button>
            </div>
          </li>

          <li className="toolbar-item">
                        <div className="toolbar-button">
                            <button data-tooltip-id="my-tooltip" data-tooltip-content="Supprimer tout"
                                type="button"
                                className={'toolbar-button' + (SelectedTool === 'pointer' ? ' active' : '')}
                                onClick={() => DeleteAllCanvas('pointer')}
                                
                            >
                                <CgMathPlus style={{ fontSize: '40px', strokeWidth: '0.1' ,transform: 'rotate(45deg)'}} />
                                <Tooltip id="my-tooltip" />
                            </button>
                        </div>
                    </li>

                    <li className="toolbar-item">
                        <div className="toolbar-button">
                            <button  data-tooltip-id="my-tooltip" data-tooltip-content="Commentaire"
                                type="button"
                                className={'toolbar-button' + (SelectedTool === 'textUpdater' ? ' active' : '')}
                                onClick={() => onControlsClick('textUpdater')}
                                
                            >
                                <TfiText style={{ fontSize: '30px', strokeWidth: '0.3'}} />
                                <Tooltip id="my-tooltip" />
                            </button>
                        </div>
                    </li>

                   
                    <li className="toolbar-item" ref={(el) => (toolbarItemRefs.current[0] = el)}>
                        <div className="toolbar-button">
                            <button data-tooltip-id="my-tooltip" data-tooltip-content="Sauvgarder"
                                type="button"
                                className={'toolbar-button' + (SelectedTool === 'save' ? ' active' : '')}
                                onClick={onSaveCanvas}
                                onMouseEnter={() => dispatch(setSelectMsg('save'))}
                                onMouseLeave={() => dispatch(setSelectMsg(SelectedTool))}
                                
                            >
                                <IoSaveOutline style={{ fontSize: '30px', strokeWidth: '1'}} />
                                <Tooltip id="my-tooltip" />
                            </button>

                            
                        </div>
                    </li>

                    <ul className=" main-toolbar1" >
                    <li className="toolbar-item1" >
                        <div className="toolbar-button1">
                            <button data-tooltip-id="my-tooltip" data-tooltip-content="Anuuler"
                                type="button"
                              className={'toolbar-button1' }
                                onClick={undo}
                                
                            >
                                < CiUndo style={{ fontSize: '20px', strokeWidth: '0.5'}} />
                                <Tooltip id="my-tooltip" />
                            </button>
                        </div>
                    </li>

                    <li className=" toolbar-item1" style={{ marginLeft: '3px' }} >
                        <div className="toolbar-button1">
                            <button data-tooltip-id="my-tooltip" data-tooltip-content="Refaire"
                                type="button"
                                className={'toolbar-button1' }
                                onClick={redo}
                                
                            >
                                <CiRedo style={{ fontSize: '20px', strokeWidth: '0.5'}} />
                                <Tooltip id="my-tooltip" />
                            </button>
                        </div>
                    </li>

                    <li className="toolbar-item1" >
                        <div className="toolbar-button1">
                            <button data-tooltip-id="my-tooltip" data-tooltip-content="Réinitialiser"
                                type="button"
                               className={'toolbar-button1' }
                                onClick={handleReInitialiserReseau }
                                
                            >
                                < MdRestartAlt  style={{ fontSize: '20px', strokeWidth: '0.5'}} />
                                <Tooltip id="my-tooltip" />
                            </button>
                        </div>
                    </li>
                    <li className="toolbar-item1" style={{ marginLeft: '3px' }}>
                    <div className="toolbar-button1">
                        <button 
                            data-tooltip-id="my-tooltip" 
                            
                            type="button"
                            className="toolbar-button1"
                            onClick={() => {
                              toggleTool();
                              pause();
                          }} // Toggle between 'start' and 'stop'
                          
                          data-tooltip-content={currentTool === 'start' ? 'Commencer' : 'Arrêter'} 
                        >
                            {currentTool === 'start' ? (
                                <VscTriangleRight style={{ fontSize: '20px', strokeWidth: '0.5' }} />
                            ) : (
                                <RiEqualLine style={{ fontSize: '20px', strokeWidth: '0.5', transform: 'rotate(90deg)' }} />
                            )}
                            <Tooltip id="my-tooltip" />
                        </button>
                    </div>
                </li>


                    
                    <li className="toolbar-item1" >
                        <div className="toolbar-button1">
                            <button data-tooltip-id="my-tooltip" data-tooltip-content="Simulation par étape "
                                type="button"
                                id="monBouton"
                                className={'toolbar-button1'}
                                onClick={ simulationbystep}
                                
                            > 
                                <  AiOutlineShareAlt style={{ fontSize: '20px', strokeWidth: '0.5'}} />
                                <Tooltip id="my-tooltip" />
                            </button>
                        </div>
                    </li>

                    <li className="toolbar-item1" >
                        <div className="toolbar-button1">
                            <button data-tooltip-id="my-tooltip" data-tooltip-content="Simulation continue"
                                 ref={secondButtonRef}
                                type="button"
                                className={'toolbar-button1'}
                                onClick={ handlesimulation}
                               
                               
                               
                            
                            > 
                                < AiOutlinePullRequest style={{ fontSize: '20px', strokeWidth: '0.5'}} />
                                <Tooltip id="my-tooltip" />
                            </button>
                        </div>
                    </li>

                   
                    </ul>
                     
        
          {}
        </ul>
      </div>
      
    

    
                   
               

     
       
      {isMenuOpen && (
        <ToolBar
          isOpen={isMenuOpen}
          onClose={handleMenuClose}
          selectedShape={selectedShape}
          onControlsClick={onControlsClick}
        />
      )}
      
    </div>
  );
};


