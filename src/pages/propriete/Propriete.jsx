import React from 'react'
import { useEffect, useState } from 'react'
import './Propriete.css'
import {props} from './Data'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
//import  {useHistory } from 'react-router-dom'

export const Propriete = () => {
    const [popupcont , setpopupcont] = useState([]);
    const [popuptogle , setpopuptogle] = useState(false);
   // const history = useHistory();
    const changecontent = (prop) => {
        setpopupcont([prop]);
        setpopuptogle(!popuptogle);
    }
    const Icon = ({ value }) => {
        if (value === 'oui') {
            return <FaCheckCircle className='icon' style={{ color: 'green',  fontSize: '7vh',marginLeft: '6VW',marginTop: '4vh' }} />;
        } else if (value === 'non') {
            return <FaTimesCircle className='icon' style={{ color: 'red', fontSize: '7vh',marginLeft: '6VW',marginTop: '4vh'}} />;
        } else {
            return null;
        }
    };
  //  history.push("/simulation/propriete")
    return (
        
        <>
        <div className='page-container'>
        <h1 className='prop'>Propriétés</h1>
         <div className='content-container'>
            {
                props.map((prop)=>{
                    return(
                        <div className="content_card" onClick={()=> changecontent(prop)}>
                            <p className='titre' >{prop.type}</p>
                        </div>
                    )
                })
            }
         </div>
         {popuptogle&&<div className="pop-up-container" onClick={changecontent}>
            <div className="pop-up-body" onClick={(e)=> e.stopPropagation()}>
            <div className="pop-up-header">
                <button className='exit' onClick={changecontent}>X</button>
            </div>
            <div className='pop-up-content'>
                {popupcont.map((pop)=>{
                    return(
                        <div className="pop_up_card">
                            <h1 className='pop_titre' >{pop.type}</h1>
                            <p className='def'> {pop.definition}</p>
                            <p className='rep'>
                        <Icon value={pop.value} /> {pop.description}
                         </p>
                        </div>
                    )
                })}
            </div>
            </div>
            
         </div>
         }
        </div>
        
         </>
    ) ;

}
export default Propriete;