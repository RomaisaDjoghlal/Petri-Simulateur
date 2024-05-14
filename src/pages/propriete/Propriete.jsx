import React from 'react';
import './Propriete.css';
import { props } from './Data';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export const Propriete = () => {
    const Icon = ({ value }) => {
        if (value === 'Oui') {
            return <FaCheckCircle className='icon' style={{ color: 'green', fontSize: '4.5vh',marginRight : '1vw' }} />;
        } else if (value === 'Non') {
            return <FaTimesCircle className='icon' style={{ color: 'red', fontSize: '4.5vh' , marginRight : '1vw'}} />;
        } else {
            return null;
        }
    };

    return (
        <div className='page-container'>
            <h1 className='prop'>Propriétés du réseau de Petri</h1>
            <table className='prop-table'>
                <thead>
                    <tr>
                        <th>Type</th>
                       
                        <th>Valeur</th>
                    </tr>
                </thead>
                <tbody>
                    {props.map((prop, index) => (
                        <tr key={index}>
                            <td>{prop.type}</td>
                          
                            <td>
                                <Icon value={prop.value} /> {prop.value  } 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Propriete;

