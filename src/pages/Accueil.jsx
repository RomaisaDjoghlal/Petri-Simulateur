// Accueil.js

import React, { useState, useEffect } from 'react';
import './Accueil.css';
import design from './homedesign.svg';
import { Link } from 'react-router-dom';

export const Accueil = () => {
    const messages = [
        "Bienvenue sur PetriSim !",
        "Commencez dès aujourd'hui à créer vos propres réseaux !",
        "Guide, explications et ressources !"
    ];
    const descriptions = [
        "Nous sommes ravis de vous accueillir sur notre application dédiée aux Réseaux de Petri. Que vous soyez un débutant ou un expert, notre application est conçue pour répondre à tous vos besoins en matière de modélisation et d'analyse de réseaux de Petri.",
        "Prêt à démarrer ? Commencez dès aujourd'hui à créer vos propres réseaux de Petri ! Notre application vous offre les outils dont vous avez besoin pour donner vie à vos idées. Créez, modifiez, simulez et partagez vos réseaux avec une facilité sans précédent.",
        "Besoin d'aide pour commencer ? Consultez notre guide pour obtenir des conseils pratiques pour commencer à utiliser notre application. Besoin d'informations plus détaillées ? Consultez notre documentation complète qui contient des explications ainsi que des ressources complémentaires ."
    ];
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        // Change le message toutes les 5 secondes
        const interval = setInterval(() => {
            setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [messages]);

    const handleMouseEnter = (index) => {
        setCurrentMessageIndex(index);
    };

    return (
        <div className='home-container'>
            <h1 className='titre'>PetriSim</h1>
            <div className='contenu-container'>
                 <div className='text-container'>
                    
                    <div className='scrolling-text'>
                        <p className='message'>{messages[currentMessageIndex]}</p>
                        <p className='description'>{descriptions[currentMessageIndex]}</p>
                    </div>
                    <div className='button-container'>
                        {messages.map((message, index) => (
                            <button
                                key={index}
                                className='hover-button'
                                onMouseEnter={() => handleMouseEnter(index)}
                            >
                                
                            </button>
                        ))}
                    </div>
                    <Link to="/simulation/editeur" ><button className='btncreer'>Créer mon réseau</button></Link>
                </div>
                <img src={design} className='design' alt='Design'/>
                
            </div>
        </div>
    );
};

export default Accueil;
