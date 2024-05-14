import React, { useState } from 'react';
 import './Guide.css';
import Frame1 from './Frame1.png';
import Frame2 from  './Frame2.png';
import Frame3 from './Frame3.png';
import Frame4 from './Frame4.png';
import Frame5 from './Frame5.png';
import Frame6 from './Frame6.png';
import Frame7 from './Frame7.png';

// Tableau des URL des images
const imageUrls = [
  Frame1,
  Frame2,
  Frame3,
  Frame4,
  Frame5,
  Frame6,
  Frame7,
  // Ajoutez plus d'URLs d'images selon vos besoins
];

export const Guide = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // État pour suivre l'index de l'image actuelle, initialisé à 0

  const nextImage = () => {
    // Vérifie si nous ne sommes pas déjà à la dernière image avant de passer à la suivante
    if (currentImageIndex < imageUrls.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1); // Met à jour l'index pour afficher l'image suivante
    }
  };

  const previousImage = () => {
    // Vérifie si nous ne sommes pas déjà à la première image avant de passer à la précédente
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1); // Met à jour l'index pour afficher l'image précédente
    }
  };

  return (
    <div className='guide-container'>
      <h1 className='t'>Guide</h1>
      {}
      <img className='guide-image' src={imageUrls[currentImageIndex]} alt="pic" />

      {}
      <div className='navigation-buttons'>
        {}
        {currentImageIndex > 0 && <button className='prvsbtn' onClick={previousImage}>Retour</button>}
        {}
        {currentImageIndex < imageUrls.length - 1 && <button className='nextbtn' onClick={nextImage}>Suivant</button>}
      </div>
    </div>
  );
}

export default Guide;


