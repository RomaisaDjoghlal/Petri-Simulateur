import React, { useState } from 'react';
import './vidéos.css';
import { MdLink } from 'react-icons/md';

function Videos() {
  const [selectedLinkIndex, setSelectedLinkIndex] = useState(null);

  // Définir un tableau d'objets représentant les liens avec leur titre et leur URL
  const links = [
    { title: "Introduction aux réseaux de Petri", description: "Cette serie de vidéos sur la chaine Youtube Informatique Théorique couvre les différentes notions reliées aux reseaux de Petri, ainsi elle vous permet de bien comprendre leur fonctionnement.", url: "https://www.youtube.com/playlist?list=PLwp5OpRmcl_FqyvDqRMw9ZP3nXwrlqslB" },
    { title: "Marquage dans les réseaux de Petri", description: "Cette vidéo de la chaine Youtube KL-EITde explique comment créer un graphe des marquages accessibles pour un reseau de Petri", url: "https://www.youtube.com/watch?v=EhSw-EpKjxM" },
    { title: "Les propriétés des réseaux de Petri", description: "Cette vidéo Youtube de Hicham HIHI fournit une trés bonne explication sur les propriétés des reseaux de Petri.", url: "https://www.youtube.com/watch?v=i-2XgdvxJ6g" },
    { title: "Modélisations avec des réseaux de Petri", description: "Cette série de vidéos de la chaine Youtube de John Chaussard fournit des exemples de modélisation de problèmem en utiisant les réseaux de Petri",url: "https://www.youtube.com/playlist?list=PLsLnqY27Vp2qyH8mhfl1GGSKEmjhPAVUT" },
    
  ];

  const handleLinkClick = (index) => {
    if (selectedLinkIndex === index) {
      setSelectedLinkIndex(null);
    } else {
      setSelectedLinkIndex(index);
    }
  };

  return (
    <div className="videos-container">
      <h1 className="title">Vidéos</h1>
      <ul className="videos-group">
        {links.map((link, index) => (
          <li key={index}>
            <button className='titlebox' onClick={() => handleLinkClick(index)} >{link.title}</button>
            {selectedLinkIndex === index && (
              <div className='conten'>
                <p>{link.description}</p>
                <a href={link.url} target="_blank" rel="noopener noreferrer"><MdLink /> Voir le lien</a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Videos;


