import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import Videos from './vidéos';
import Livres from './livres';
import Sites from './Sites';

export function Ressources() {
  const [currentPage, setCurrentPage] = useState('menu');

  const navigateTo = (page) => {
    setCurrentPage(page);
    // Ajouter la page actuelle à l'historique du navigateur
    window.history.pushState({ page }, '', `/${page}`);
  };

  useEffect(() => {
    // Fonction pour revenir en arrière lorsque l'utilisateur clique sur le bouton de retour du navigateur
    const handleBackNavigation = (event) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
      } else {
        setCurrentPage('menu');
      }
    };

    // Écouter les événements de changement d'état du navigateur
    window.addEventListener('popstate', handleBackNavigation);

    // Nettoyer l'écouteur d'événement lorsque le composant est démonté
    return () => window.removeEventListener('popstate', handleBackNavigation);
  }, []);

  return (
    <div>
      {currentPage === 'menu' && <Menu navigateTo={navigateTo} />}
      {currentPage === 'videos' && <Videos />}
      {currentPage === 'livres' && <Livres />}
      {currentPage === 'sites' && <Sites />}
    </div>
  );
}

export default Ressources;

