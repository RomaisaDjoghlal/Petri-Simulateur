import React from 'react'
import './Graphmenu.css'
import { Link } from 'react-router-dom'

export const Graphmenu = () => {
    console.log('hi')
  return (
    <>
      <div className='graph'>

      <div className='sections-graph'>
      <Link to="/simulation/marquages/GMA">
        <section className='sous-graph'>
           <h2 className='titreg'>Graphe des marquages accessibles</h2>
      
        </section>
        </Link>
        <Link to="/simulation/marquages/GMAR">
        <section className='sous-graph'>
          <h2 className='titreg'>Graphe des marquages accessibles réduit</h2>
          
        </section>
        </Link>
      </div>
      </div>
    </>
  )
}

