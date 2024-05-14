import React ,  { useCallback } from 'react'
import { X } from "react-feather"
import { useDispatch, useSelector } from "react-redux"
import { getElementToModify, setElementToModify, setIsSidebarVisible } from "../ReduxSlice/EditSlice"
//import './css/utils.css'
import './sideBar.css'

export const ModifyBar = ({isVisible, onDelete, onUpdate}) => {

    const dispatch = useDispatch()
    const element = useSelector(getElementToModify)


    // traitement des jetons 
   

    const onCancelChanges = () => {
        dispatch(setElementToModify({}))
        dispatch(setIsSidebarVisible(false))
    }

    return (
        <div className={'modal modal-slide-over overflow-y-auto ' + (isVisible && element && Object.keys(element).length !== 0 ? 'show' : '')}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <button type="button" className="sidebar-close" onClick={onCancelChanges}>
                        <X className="w-8 h-8 text-slate-400" />
                    </button>
                    { element && Object.keys(element).length !== 0 ? (
                        <>
                        <div className="modal-header">
                            <h2 className="font-medium text-base mr-auto"> Élément sélectionné  {
                                //element.type === 'place' ? 'Place '+element.data.label : (element.type === 'transition' ? 'Transition '+element.data.label : 'Edge'  )
                                element.type === 'place' ? 'Place '+element.data.label : (element.type === 'transition' ? 'Transition '+element.data.label : element.type2 === 'arc' ? 'Edge '  :'textUpdater' )
                                
                            }</h2>
                             
                        </div>
                        <div className="modal-body">  
                            {
                                element.type === 'place' || element.type === 'transition'  ? (
                                    <div>
                                        <label htmlFor="new-label" className="form-label"> Nouveau libellé </label>
                                        <input type="text" id="new-label" disabled={false}   readOnly={false}  className="form-control" value={element.data.label} onChange={(e) => dispatch(setElementToModify({field:'label',value:e.target.value}))} />
                                    </div>    
                                ) : null
                                
                            }
                            {
                                element.type2 ==='arc' ? (
                                    <div>
                                        <label htmlFor="new-label" className="form-label"> Nouveau poid </label>
                                        <input type="text" id="new-label" disabled={false}   readOnly={false}   className="form-control" value={element.label} onChange={(e) => dispatch(setElementToModify({field:'poidarc',value:e.target.value}))} />
                                    </div>    
                                ) : null
                                
                            }
                            {
                                 element.type === 'transition' ? (
                                    <div>
                                        <label htmlFor="new-poid" className="form-label">Nouveau poid</label>
                                        <input type="text" id="new-poid" disabled={false}   readOnly={false}   className="form-control" value={element.data.poid} onChange={(e) => dispatch(setElementToModify({field:'poid',value:e.target.value}))} />
                                    </div>    
                                ) : null
                            }
                            {
                              
                            }
                        </div>

                        
                        <div className="modal-footer w-full absolute bottom-0">
                        <button
                                type="button"
                                className="btn btn-outline-secondary mr-2 w-full md:w-max mb-2 md:mb-0"
                                onClick={onCancelChanges}
                            >Annuler </button>
                            <button
                                type="button"
                                className="btn btn-danger mr-2 w-full md:w-max mb-2 md:mb-0"
                                onClick={() => onDelete(element)}
                            >Supprimer élément</button>
                            <button
                                type="button"
                                className="btn btn-primary w-full md:w-max mb-2 md:mb-0"
                                onClick={() => onUpdate(element)}
                                
                            >Confirmer </button>
                        </div>
                        </>
                    ) : null }
                </div>
            </div>
        </div>
    )
}
