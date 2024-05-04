import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedTool: 'place',
   
    isSelectable: false,
   
    toastOpt: {
        isVisible: false,
        context: 'pending',
        title: '',
        msg: ''
    },
   
    convasOpt: {
        editor: {
            arcType: (localStorage.getItem('arcs') && JSON.parse(localStorage.getItem('arcs')).length ? JSON.parse(localStorage.getItem('arcs'))[0].type : 'straight')
        },
        tree: {
            arcType: 'straight',
            nodeType: 'nodeH'
        },
        graph: {
            arcType: 'straight',
            nodeType: 'nodeV'
        }    
    },
    

    modalOpt: {
      isVisible: false,
      context: 'danger',
      title: '',
      msg: '',
      confirmBtn: '',
      target: ''
  },


    //pour les toknes
    isSidebarVisible: false,
    elementToModify: {},
    placeSelection: {},
  
    
}

export const  EditSlice = createSlice({
    name: 'controls',
    initialState,
    reducers: {
        setSelectedTool: (state, action) => {
            state.SelectedTool = action.payload
        },
       
        setIsSelectable: (state, action) => {
            state.isSelectable = action.payload
        },

        setToastOpt: (state, action) => {
            Object.keys(action.payload).forEach((k) => {
                state.toastOpt[k] = action.payload[k]
            })
        },
        setSelectMsg: (state, action) => {
            state.selectMsg = action.payload
        },
        
        setModalOpt: (state, action) => {
            Object.keys(action.payload).forEach((k) => {
                state.modalOpt[k] = action.payload[k]
            })
        },
        setIsSidebarVisible: (state, action) => {
            state.isSidebarVisible = action.payload
        },
        setElementToModify: (state, action) => {
            if (Object.keys(action.payload).includes('field')) {
                switch (action.payload.field) {
                    case 'label':
                        state.elementToModify.data = {...state.elementToModify.data, label: String(action.payload.value)}
                        break
                    case 'tokens':
                        state.elementToModify.data = {...state.elementToModify.data, tokens: String(action.payload.value)}
                        break
                    case 'poid': 
                        state.elementToModify.data = {...state.elementToModify.data, poid: String(action.payload.value)}
                        break
                    case 'poidarc':
                        state.elementToModify = {...state.elementToModify, label: String(action.payload.value)}
                        break    
                    default:
                        break
                }
            } else {
                state.elementToModify = action.payload
            }
        },
        
        setCanvasOpt: (state, action) => {
            Object.keys(action.payload.opt).forEach((k) => {
                state.convasOpt[action.payload.target][k] = action.payload.opt[k]
            }) 
        },
        setPlaceSelection: (state, action) => {
            state.placeSelection[action.payload.id] = action.payload.value
        },

        setCopiedElement: (state,action) => {
            state.copiedElement = action.payload
        }
       
       
      
    }
})


// selectors
export const getSelectedTool = state => state.controls.SelectedTool
export const getSelectMsg = state => state.controls.selectMsg
export const getIsSelectable = state => state.controls.isSelectable
export const getToastOpt = state => state.controls.toastOpt
export const getModalOpt = state => state.controls.modalOpt
export const getIsSidebarVisible = state => state.controls.isSidebarVisible
export const getElementToModify = state => state.controls.elementToModify
export const getCanvasOpt = state => state.controls.convasOpt
export const getCopiedElement = state => state.controls.copiedElement

export const { setSelectedTool, setSelectMsg , setIsSelectable, setToastOpt, setModalOpt, setIsSidebarVisible, setElementToModify,  setPlaceSelection , setCanvasOpt,setCopiedElement } = EditSlice.actions;
export default EditSlice.reducer