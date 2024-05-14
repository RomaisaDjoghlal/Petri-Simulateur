import React from 'react';
import './Menu.css'; // Importez le fichier CSS pour les styles du menu
import { MdVideoLibrary, MdBook, MdDescription } from 'react-icons/md'; // Importer les icônes de la bibliothèque Material Icons

function Menu({ navigateTo }) {
  const handleButtonClick = (page) => {
    navigateTo(page);
  };

  return (
    <div className="menu-container">
      <h1 className="title">Ressources</h1>
      <ul className="list">
        <li><button className="opt" onClick={() => handleButtonClick('videos')}><MdVideoLibrary />  Vidéos</button></li>
        <li><button className="opt" onClick={() => handleButtonClick('livres')}><MdBook />  Livres</button></li>
        <li><button className="opt" onClick={() => handleButtonClick('sites')}><MdDescription />  Documents</button></li>
      </ul>
    </div>
  );
}

export default Menu;


