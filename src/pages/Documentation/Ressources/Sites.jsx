import React, { useState } from 'react';
import './Sites.css';
import { MdLink } from 'react-icons/md';

function Sites() {
  const [selectedLink, setSelectedLink] = useState(null);

  // Définir un tableau d'objets représentant les liens avec leur titre et leur URL
  const links = [
    { title: "Document 1", description: "Cours de l'Ecole Nationale Supérieure des Mines de Saint-Etienne ,France .Réalisé par le professeur Vincent Augusto ", url: "https://www.emse.fr/~augusto/enseignement/icm/gis1/UP2-2-RdP-slides.pdf" },
    { title: "Document 2", description: "These de Doctorat de l'université d'EVRY-VAL D'ESSONNE , réalisé par Lukasz FRONC", url: "https://www.biblio.univ-evry.fr/theses/2013/2013EVRY0034.pdf" },
    { title: "Document 3", description: "Un cours sur les reseaux de Petri réalisé par Slim BEN SAOUD ", url: "https://www.uvt.rnu.tn/resources-uvt/cours/Automatismes/chapitre4_rdp.pdf" },
    { title: "Document 4", description: "Notions sur les réseaux de PETRI, réalisé par HAMDI HOCINE à l'université        Mentouri-Constantine",url: "https://fac.umc.edu.dz/st/RDP.pdf" },
    
  ];

  const handleLinkClick = (link) => {
    if (selectedLink === link) {
      setSelectedLink(null);
    } else {
      setSelectedLink(link);
    }
  };

  return (
    <div className="Sites-container">
      <h1 className="title">Documents</h1>
      <ul className="Sites-list">
        {links.map((link, index) => (
          <li key={index}>
            <button className='boxsite' onClick={() => handleLinkClick(link.url)} >{link.title}</button>
            {selectedLink === link.url && (
              <div className='contenu'>
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

export default Sites;

