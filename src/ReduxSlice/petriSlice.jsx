import { createSlice } from '@reduxjs/toolkit'
import { Place , Transition , Reseau } from '../Logique/structure'
import { creereseau } from '../Logique/integrations'




const makeDataPersistent = (state) => {
    localStorage.setItem('places', JSON.stringify(state.places))
    localStorage.setItem('transitions', JSON.stringify(state.transitions))
    localStorage.setItem('arcs', JSON.stringify(state.arcs))
    localStorage.setItem('textUpdaters', JSON.stringify(state.textUpdaters))
    
}

const initialState = {
    places: [],
    transitions: [],
    arcs: [] ,
    textUpdaters:[],
}

let reseau = JSON.parse(localStorage.getItem('reseau'));

export const petriSlice = createSlice({
    name: 'petri',
    initialState,
    reducers: {
        addElement: (state, action) => {
            switch (action.payload.type) {
                case 'place':
                    state.places = action.payload.element.length > 0 ? action.payload.element : [...state.places,action.payload.element]
                break
                case 'transition':
                    state.transitions =  action.payload.element.length > 0 ? action.payload.element : [...state.transitions,action.payload.element]
                break
                case 'textUpdater':
                    state.textUpdaters =  action.payload.element.length > 0 ? action.payload.element : [...state.textUpdaters,action.payload.element]
                break
                default:
                    state.arcs = action.payload.element.length > 0 ? action.payload.element : [...state.arcs,action.payload.element]
                break
            }
           // makeDataPersistent(state)
        },
        updateElement: (state, action) => {
            switch (action.payload.type) {
                case 'place':
                    state.places.forEach((p,i) => {
                        if (p.id === action.payload.element.id) {
                            state.places.splice(i,1,action.payload.element)

                        }
                    })
                break
                case 'transition':
                    state.transitions.forEach((p,i) => {
                        if (p.id === action.payload.element.id) {
                            state.transitions.splice(i,1,action.payload.element)
                            console.log("ff = "+action.payload.element.data.poid)
                           // reseau.Transitions[0].SetPoids(3)
                            //reseau.Transitions[i].SetPoids(3)
                            //reseau.Transitions[i].SetPoids(action.payload.element.data.poid)
                           // reseau.Affichertrans();
                        }
                    })
                break
               
                default:
                    state.arcs.forEach((p,i) => {
                        if (p.id === action.payload.element.id) {
                            state.arcs.splice(i,1,action.payload.element)
                        }
                    })
                break
            }
           
        },
     
        deleteElement: (state, action) => {
          switch (action.payload.type) {
              case 'place':
                  state.places.forEach((p,i) => {
                      if (p.id === action.payload.element.id) {
                        
                        state.places[i] = { ...p, data: '', position: '' };

                          
                        
                       
                      }
                  })

                  
              break
              
              case 'transition':
                  state.transitions.forEach((p,i) => {
                      if (p.id === action.payload.element.id) {
                        state.transitions[i] = { ...p, data: '', position: '' };

                  
                      }
                  })
              break
             case 'textUpdater':
              
                console.log("Action payload element ID:", action.payload.element.id);
                console.log("TextUpdater IDs in state:", state.textUpdaters.map(p => p.id));

                  state.textUpdaters.forEach((p,i) => {
                    console.log("yes",p.id)
                   
                      if (p.id === action.payload.element.id) {
                        console.log("yes")
                       

                       //   state.textUpdaters.split('_')[i,1]
                       state.textUpdaters.splice(i, 1);
                
                      }
                  })
                  

              break
              case 'timed-transition':
                  state.transitions.forEach((p,i) => {
                      if (p.id === action.payload.element.id) {
                        state.transitions[i] = { ...p, data: '', position: '' };
                         
                      }
                  })
              break
              
          
              default:
                  state.arcs.forEach((p,i) => {
                      if (p.id === action.payload.element.id) {
                          state.arcs.splice(i,1)
                      }
                  })
              break
          }  makeDataPersistent(state)
         
      },
    
      DeleteAll: (state,action) => {
        state.places = []
        state.transitions = []
        state.arcs = []
        localStorage.clear()
    
    },
   /* saveNet: (state, action) => {
        const places = action.payload.nodes.filter(e => e.type === 'place')
        const transitions = action.payload.nodes.filter(e => e.type === 'transition')
        
        const textUpdaters = action.payload.nodes.filter(e => e.type === 'textUpdater').map(node => ({
            ...node,
             id: parseInt(node.id.replace('textUpdater_', '')),
            
             //Include the text data from the node
             text: localStorage.getItem(`textUpdater_${node.id}`) , // Retrieve the text data from localStorage
             position :localStorage.getItem(`textUpdaterPosition_${node.id}`) ,
               
            
            
           
          
          }));
          textUpdaters.forEach(node => {
            console.log("Node ID:", node.id);
            console.log("Position:", node.position);
        });
        const arcs = action.payload.edges;
        state.places = places
        state.transitions = transitions
        state.textUpdaters=textUpdaters
        state.arcs = arcs;
      
        localStorage.setItem('places', JSON.stringify(places));
        localStorage.setItem('transitions', JSON.stringify(transitions));
        localStorage.setItem('textUpdaters', JSON.stringify(textUpdaters));
        localStorage.setItem('arcs', JSON.stringify(arcs));
       
        makeDataPersistent(state)
        
        
      
    }*/

    
    saveNet: (state, action) => {
        const places = action.payload.nodes.filter(e => e.type === 'place');
        const tokens = action.payload.nodes.filter(e => e.type === 'group');

        const transitions = action.payload.nodes.filter(e => e.type === 'transition');
        const textUpdaters = action.payload.nodes.filter(e => e.type === 'textUpdater');
      /* const textUpdaters = action.payload.nodes.filter(e => e.type === 'textUpdater').map(node => {
            const id = parseInt(node.id.replace('textUpdater_', ''));
            const text = localStorage.getItem(`textUpdater_${node.id}`); // Retrieve the text data from localStorage
            
            // Here we're creating the position key for textUpdater nodes
            const positionKey = `textUpdaterPosition_${id}`; // Corrected position key
            
            // Here we're storing the position in localStorage
            localStorage.setItem(positionKey, JSON.stringify(node.position)); // Store the position in localStorage
            
            
            return {
                ...node,
                id,
                text,
            };
        });*/
        
        const arcs = action.payload.edges;
    
        // Update state
        state.tokens=tokens ;
        state.places = places;
        state.transitions = transitions;
        state.textUpdaters = textUpdaters;
        state.arcs = arcs;
      
        // Store data in localStorage
        localStorage.setItem('places', JSON.stringify(places));
        localStorage.setItem('transitions', JSON.stringify(transitions));
        localStorage.setItem('textUpdaters', JSON.stringify(textUpdaters));
        localStorage.setItem('tokens', JSON.stringify(tokens));
        localStorage.setItem('arcs', JSON.stringify(arcs));
    
        // Assuming makeDataPersistent is a function to handle other persistent data
        makeDataPersistent(state);
    }
    
      
       
    }
})

// selectors
export const getPlaces = state => state.petri.places
export const getTransitions = state => state.petri.transitions
export const getArcs = state => state.petri.arcs
export const gettextUpdaters = state => state.petri.textUpdaters

export const { addElement, updateElement , deleteElement , DeleteAll, saveNet } = petriSlice.actions;
export default petriSlice.reducer