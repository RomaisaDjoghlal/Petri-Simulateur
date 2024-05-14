import React from 'react'
import { Handle, Position } from 'reactflow';
import '../Styles/Styles.css';
export const TransitionNode = ( {data }) => {

    return (
        <div className="custom-node transition">
            <Handle type="source" position={Position.Right} />
              <label htmlFor="text">{data.label}</label>
              <label className= {data.classestyle} htmlFor="text1">  {data.poid}  </label>
            <Handle type="target" position={Position.Left} />
        </div>
    )
}
