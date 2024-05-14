import React, { useState } from 'react';
import './Explication.css';

export function Explication() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="exp-container">
      <h1 className="title">Explication</h1>
      <ul className="exp-list">
        {livresData.map((livre, index) => (
          <li key={index}>
            <div className='expbox'>
              <h1 className='exptitle' onClick={() => toggleItem(index)}>
                {livre.title}
              </h1>
            </div>
            {openIndex === index && (
              <div className="exp">
                {}
                {livre.description.split('\n').map((line, i) => (
                  // Utilisez un fragment avec une clé unique pour chaque ligne
                  <React.Fragment key={i}>
                    <p>{line}</p>
                  </React.Fragment>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const livresData = [
  { title: "Place", description: "Dans les réseaux de Petri, une place est un élément fondamental représentant une condition, une ressource ou une capacité dans un système. Les places sont symbolisées par des cercles dans un diagramme de réseau de Petri. Elles servent de conteneurs pour les jetons, qui représentent l'état de la ressource ou la présence de la condition.\nUne place peut être vide ou contenir un certain nombre de jetons. L'état de la place peut être utilisé pour représenter différentes situations dans le système. Les transitions, qui représentent les événements pouvant se produire dans le système, déplacent les jetons entre les places, ce qui modifie ainsi l'état global du système. Elles permettent de décrire les conditions initiales, les états intermédiaires et les résultats finaux d'un système, ainsi que les interactions entre ses différentes composantes." },
  { title: "Transition", description: "Dans les réseaux de Petri, une transition représente un événement qui peut se produire dans le système. Elles décrivent les changements d'état ou les actions qui peuvent se produire dans le système, et sont responsables du mouvement des jetons entre les places. Une transition est activée lorsqu'elle a suffisamment de jetons dans ses places d'entrée pour être franchie. Ces jetons servent de conditions préalables à l'activation de la transition.\nLorsqu'une transition est franchie, elle consomme les jetons de ses places d'entrée et produit de nouveaux jetons dans ses places de sortie. Les transitions dans un réseau de Petri sont généralement indépendantes les unes des autres, ce qui signifie qu'elles peuvent être franchies dans n'importe quel ordre, tant que les conditions préalables sont remplies. Dans certains réseaux de Petri, plusieurs transitions peuvent être activées simultanément si toutes leurs conditions sont remplies. Cela peut conduire à des choix non déterministes sur la transition à franchir en premier." },
  { title: "Arc", description: "Un arc est une connexion entre une place et une transition ou entre une transition et une place. Il représente la relation de précondition ou de postcondition entre ces éléments. Les arcs inhibiteurs empêchent une transition de se déclencher si certaines conditions sont remplies." },
  { title: "Marquage", description: "Dans les réseaux de Petri, le marquage fait référence à la distribution de jetons dans les différentes places du réseau, représentant ainsi l'état actuel du système. Le marquage est donc une représentation graphique de l'état du système à un instant précis. Lorsque le système évolue, les transitions sont franchies, ce qui entraîne le déplacement de jetons entre les places du réseau. Cela modifie le marquage du réseau et représente le changement d'état du système. En observant le marquage, on peut comprendre les ressources disponibles, les conditions remplies et les transitions possibles à partir de cet état. Il permet de prédire le comportement du système, d'identifier les états critiques et de vérifier la validité des modèles." },
  { title: "Propriétés", description: "Propriétés du réseau de Petri :\n- Bornitude : La bornitude fait référence à la capacité de chaque place à contenir un nombre maximum de jetons. \n - Vivacité : Indique que chaque transition peut se déclencher.\n - Quasi-vivacité : Similaire à la vivacité, mais avec des restrictions.\n- Réversibilité : Possibilité de revenir à l’état initial.\n- Persistance : Le système conserve son état tant qu'aucune transition ne peut se déclencher" },
];

export default Explication;

