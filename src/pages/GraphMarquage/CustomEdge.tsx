
import React, { FC } from 'react';
import { EdgeProps, getBezierPath, EdgeLabelRenderer, BaseEdge } from 'reactflow';

export const CustomEdge: FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    //sourcePosition,
    targetX,
    targetY,
    //targetPosition,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
     
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-0%, -0%) translate(${labelX -  data.position}px,${labelY-65}px)`,
           backgroundColor: 'white',
            padding: 10,
            borderRadius: 5,
            fontSize: 12,
            fontWeight: 700,
          }}
  
          className="nodrag nopan"
        >
          {data.label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};


 