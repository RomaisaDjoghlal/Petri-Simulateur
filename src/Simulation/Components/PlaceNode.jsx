import React, { memo } from 'react'
import { Handle, Position } from 'reactflow'

export const PlaceNode = ({data }  ) => {

    return (
        <div className="custom-node place">
            <Handle type="source" position={Position.Right} />
            {
               data.tokens > 5 ? <div className='token'>{data.tokens}</div> : null 
            }
            <label htmlFor="text">{data.label}</label>
            <Handle type="target" position={Position.Left} />
        </div>
    )
}
