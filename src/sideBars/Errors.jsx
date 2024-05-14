import React from "react"
import { CheckCircle, Info, XOctagon } from "react-feather"
import { useDispatch } from "react-redux"
import { setToastOpt } from "../ReduxSlice/EditSlice"
import './sideBar.css'

export const Errors = ({opt}) => {

    const dispatch = useDispatch()
    
    return(
        <div className={'toastify toastify-right toastify-top ' + (opt.isVisible ? 'on' : '')}>
            <div className={'toastify-content flex ' + (!opt.isVisible ? 'hidden' : '')}>
                {
                    opt.context === 'pending' ? <XOctagon className={'text-'+opt.context} /> : (opt.context === 'success' ? <CheckCircle className={'text-'+opt.context} /> : <Info className={'text-'+opt.context} />)
                                 
                }
                <div className=" msg-title ">
                    <div className={' Text text-'+opt.context}>{opt.title}</div>
                    <div className="text-msg ">{opt.msg}</div>
                </div>
                <span className="toast-close" onClick={() => dispatch(setToastOpt({isVisible:false}))}>✖</span>
            </div>
            
        </div>
    )
}
