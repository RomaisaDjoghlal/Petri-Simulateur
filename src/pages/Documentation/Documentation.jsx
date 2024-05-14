import React from 'react'
import './Documentation.css'
import { Link } from 'react-router-dom'

export const Documentation = () => {
    console.log('hi')
  return (
    <>
      <div className='Doc'>
      <h1 className='title'>Documentation</h1>
      <div className='sections-doc'>
      <Link to="/documentation/Explication">
        <section className='sous-doc'>
           <h2 className='titre'>Explications</h2>
           <p className='description'>" Une explication approfondie sur les réseaux de PETRI "</p>
        </section>
        </Link>
        <Link to="/documentation/quiz">
        <section className='sous-doc'>
          <h2 className='titre'>Quiz</h2>
          <p className='description'>" Explorez vos connaissances grâce à nos quiz interactifs "</p>
        </section>
        </Link>
        <Link to="/documentation/Ressources">
        <section className='sous-doc'>
          <h2 className='titre'>Ressources</h2>
          <p className='description'>" Des vidéos, et des liens de documents pour apprendre "</p>
        </section>
        </Link>
      </div>
      </div>
    </>
  )
}







