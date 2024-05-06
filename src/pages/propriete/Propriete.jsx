import React from 'react'
import { useEffect, useState } from 'react'
import './Propriete.css'
import {props} from './Data'



export const Propriete = () => {
    useEffect(() => {
        // Perform any actions you want to happen when the component is mounted or when it's re-rendered
        console.log('Propriete component mounted or re-rendered');
    }, []);
    const [popupcont , setpopupcont] = useState([]);
    const [popuptogle , setpopuptogle] = useState(false);
    const changecontent = (prop) => {
        setpopupcont([prop]);
        setpopuptogle(!popuptogle);
    }
    return (
        
        <>
        <div className='page-container'>
        <h1 className='prop'>Propriétés</h1>
         <div className='content-container'>
            {
               /* props.map((prop)=>{
                    return(
                        <div className="content_card" onClick={()=> changecontent(prop)}>
                            <p className='titre' >{prop.type}</p>
                        </div>
                    )
                })*/
                props.map((prop) => {
                    return (
                        <div key={prop.index} className="content_card" onClick={() => changecontent(prop)}>
                            <p className='titre'>{prop.type}</p>
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
                            <p className='val'> {pop.value}</p>
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