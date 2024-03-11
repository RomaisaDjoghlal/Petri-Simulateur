import { createSlice } from '@reduxjs/toolkit'
import { Place , Transition , Reseau } from '../Logique/structure'
import { creereseau } from '../Logique/integrations'




const initialState = {
    places: [],
    transitions: [],
    arcs: []
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
                            reseau.Transitions[0].SetPoids(3)
                            //reseau.Transitions[i].SetPoids(3)
                            //reseau.Transitions[i].SetPoids(action.payload.element.data.poid)
                            reseau.Affichertrans();
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
                          state.places.splice(i,1)
                      }
                  })
              break
              case 'transition':
                  state.transitions.forEach((p,i) => {
                      if (p.id === action.payload.element.id) {
                          state.transitions.splice(i,1)
                      }
                  })
              break
              case 'timed-transition':
                  state.transitions.forEach((p,i) => {
                      if (p.id === action.payload.element.id) {
                          state.transitions.splice(i,1)
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
          }
         
      },
      
       
    }
})

// selectors
export const getPlaces = state => state.petri.places
export const getTransitions = state => state.petri.transitions
export const getArcs = state => state.petri.arcs

export const { addElement, updateElement , deleteElement } = petriSlice.actions;
export default petriSlice.reducer