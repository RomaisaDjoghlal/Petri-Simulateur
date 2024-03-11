import { useState } from 'react'
import { Provider } from 'react-redux';
import { Store } from './ReduxSlice/Store';
//import './Simulation/Simulater.jsx/'



import { Editer } from './Simulation/Editer'


function App() {
 // const [count, setCount] = useState(0)

  return (
    <>
   <Provider store={Store}>
   <Editer/>
  </Provider>,
    
      
      
    </>
  )
}

export default App