import React, { useState } from 'react';
import { MdLink } from 'react-icons/md';
import './livres.css';

function Livres() {
  // Déclarer un état local pour suivre les éléments ouverts/fermés
  const [openIndexes, setOpenIndexes] = useState([]);

  // Fonction pour basculer l'état d'ouverture d'un élément
  const toggleItem = (index) => {
    if (openIndexes.includes(index)) {
      // Si l'index est déjà ouvert, le retirer
      setOpenIndexes(openIndexes.filter(item => item !== index));
    } else {
      // Sinon, l'ajouter
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <div className="Livres-container">
      <h1 className="title">Livres</h1>
      <ul className="Livres-list">
        {livresData.map((livre, index) => (
          <li key={index}>
            {}
            <div className='bookbox'>
            <h1 className='booktitle' onClick={() => toggleItem(index)}>
              {livre.title}
            </h1>

            </div>
            
            {}
            {openIndexes.includes(index) && (
              <div className="cont">
                <p>Description : {livre.description}</p>
                <p>Auteur : {livre.author}</p>
                <a href={livre.link} target="_blank" rel="noopener noreferrer"><MdLink />  lien</a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Données des livres
const livresData = [
  {
    title: "Petri Nets: Properties, Analysis and Applications",
    link: "https://www.amazon.fr/Understanding-Petri-Nets-Modeling-Techniques/dp/3642332773",
    description: "Présente les éléments essentiels de cette puissante technique de modélisation bien établie, comprend des exercices et des illustrations entièrement intégrées",
    author: "Wolfgang Reisig, professeur à la Humboldt Universität zu Berlin, en Allemagne"
  },
  {
    title: "Petri Nets:Theoretical Models and Analysis Methods for Concurrent Systems",
    link: "https://link.springer.com/book/10.1007/978-981-19-6309-4",
    description: "Ce livre fournit des informations essentielles sur la théorie des réseaux de Petri et les méthodes de vérification de modèles basées sur les réseaux de Petri.",
    author: "Guan Jun Liu, professeur au Département d'informatique de l'Université de Tongji, en Chine ."
  },
  {
    title: "Petri Nets: Fundamental Models, Verification and Applications",
    link: "https://onlinelibrary.wiley.com/doi/book/10.1002/9780470611647",
    description: "Ce livre présente d'abord les modèles de base, y compris les extensions temporelles et stochastiques. Les problèmes de vérification associés sont ensuite abordés et les solutions correspondantes proposées .",
    author: "Michel Diaz, directeur de la recherche au centre national de la recherche scientifique(CNRS), Paris, France."
  },
  // Ajoutez d'autres livres ici
];

export default Livres;

