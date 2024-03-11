import React from 'react'
import * as Icon from "react-feather"
import { FaRegCircle } from "react-icons/fa";
import { TbArrowWaveRightDown } from "react-icons/tb";
import { PiFlowArrowThin } from "react-icons/pi";
import { LuSmartphone } from "react-icons/lu";
import { BsFillPhoneFill } from "react-icons/bs";
import { WiMoonFull } from "react-icons/wi";
import { WiMoonAltFull } from "react-icons/wi";

import { useDispatch, useSelector } from "react-redux"
import {  getSelectedTool,  setSelectedTool, setIsSelectable, setModalOpt } from '../ReduxSlice/EditSlice';
import './Styles/Styles.css';

export const ToolBar = () => {

    const dispatch = useDispatch()
    const SelectedTool = useSelector(getSelectedTool)
    

    const onControlsClick = (target) => {
        dispatch(setSelectedTool(target))
        dispatch(setIsSelectable(target === 'pointer' ? true : false))
        
        /*if (target === 'arc') {
            const modal = {
                target:'editor',
                isVisible: true,
                context: 'primary',
                title: 'Pick your style!',
                msg: 'Select one of the following styles to be applied to arcs on canvas.',
                confirmBtn: 'Confirm',
            }
            dispatch(setModalOpt(modal))
        }*/
    }

    return(
        <div className="grid">
            <div className="col-span">
                <ul className="toolbar">
                   
                    <li className="toolbar-item">
                        <div className="toolbar-button">
                            <button
                                type="button"
                                className={'toolbar-button' + (SelectedTool === 'place' ? ' active' : '')}
                                onClick={() => onControlsClick('place')}
                               //add msg 
                            >
                               
                                <FaRegCircle style={{ fontSize: "40px", strokeWidth: "1" }}  />
                            </button>
                        </div>
                    </li>
                    <li className="toolbar-item">
                        <div className="toolbar-button">
                            <button
                                type="button"
                                className={'toolbar-button' + (SelectedTool === 'token' ? ' active' : '')}
                                onClick={() => onControlsClick('Add-token')}
                               
                                >
                              
                                <WiMoonFull style={{ fontSize: "20px", strokeWidth: "1" }}/>
                            </button>
                        </div>
                    </li>
                    <li className="toolbar-item">
                        <div className="toolbar-button">
                            <button
                                type="button"
                                className={'toolbar-button' + (SelectedTool === 'token' ? ' active' : '')}
                                onClick={() => onControlsClick('delete-token')}
                               
                                >
                                <WiMoonAltFull style={{ fontSize: "20px", strokeWidth: "1" }} />
                            </button>
                        </div>
                    </li>
                    <li className="toolbar-item">
                        <div className="toolbar-button">
                            <button
                                type="button"
                                className={'toolbar-button' + (SelectedTool === 'transition' ? ' active' : '')}
                                onClick={() => onControlsClick('transition')}
                               
                                >
                               
                                <LuSmartphone style={{ fontSize: "40px", strokeWidth: "1" }}/>
                            </button>
                        </div>
                    </li>
                    <li className="toolbar-item">
                        <div className="toolbar-button">
                            <button
                                type="button"
                                className={'toolbar-button' + (SelectedTool === 'timed-transition' ? ' active' : '')}
                                onClick={() => onControlsClick('timed-transition')}
                               
                                >
                                
                                <BsFillPhoneFill style={{ fontSize: "40px", strokeWidth: "1" }} />
                            </button>
                        </div>
                    </li>
                    <li className="toolbar-item">
                        <div className="toolbar-button">
                            <button
                                type="button"
                                className={'toolbar-button' + (SelectedTool === 'pointer' ? ' active' : '')}
                                onClick={() => onControlsClick('pointer')}
                                
                            >
                                <Icon.MousePointer  />
                            </button>
                        </div>
                    </li>
                    <li className="toolbar-item">
                        <div className="toolbar-button">
                            <button
                                type="button"
                                className={'toolbar-button' + (SelectedTool === 'arc' ? ' active' : '')}
                                onClick={() => onControlsClick('arc')}
                                
                                >
                               
                               <TbArrowWaveRightDown style={{ fontSize: "40px", strokeWidth: "1" }} />
                            </button>
                        </div>
                    </li>
                    <li className="toolbar-item">
                        <div className="toolbar-button">
                            <button
                                type="button"
                                className={'toolbar-button' + (SelectedTool === 'arcinhibe' ? ' active' : '')}
                                onClick={() => onControlsClick('arcinhibe')}
                                
                                >
                               
                                <PiFlowArrowThin  style={{ fontSize: "40px", strokeWidth: "1" }}/>
                            </button>
                        </div>
                    </li>
                   
                </ul>
            </div>
          
        </div>
    )
}