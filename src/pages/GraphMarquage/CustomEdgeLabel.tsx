import React, { FC } from 'react';
import { EdgeProps, getBezierPath, EdgeLabelRenderer, BaseEdge , MarkerType  } from 'reactflow';

// this is a little helper component to render the actual edge label
function EdgeLabel({ transform, label }: { transform: string; label: string }) {
  return (
    <div
      style={{
        position: 'absolute',
      //  background: 'transparent',
     
        fontSize: 12,
        fontWeight: 700,
        transform,
      }}
      className="nodrag nopan"
    >
      {label}
    </div>
  );
}

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
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} 
                            />
      <EdgeLabelRenderer>
        {data.label && (
          <EdgeLabel
            transform={`translate(-50%, -100%) translate(${targetX -0}px,${targetY -20}px`}
            label={data.label}
            
          />
        )}
      </EdgeLabelRenderer>
    </>
  );
};

// default CustomEdge;








/*

import React, { FC } from 'react';
import { EdgeProps, getStraightPath, EdgeLabelRenderer, BaseEdge } from 'reactflow';

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
  const [edgePath, labelX, labelY] = getStraightPath({
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
            transform: `translate(-240%, -40%) translate(${labelX + 100}px,${labelY+10}px)`,
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

 //default CustomEdge;
*/
/*
 import React, { FC } from 'react';
 import { EdgeProps, getStraightPath, EdgeLabelRenderer, BaseEdge } from 'reactflow';
 
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
   const [edgePath, labelX, labelY] = getStraightPath({
     sourceX,
     sourceY,
    
     targetX,
     targetY,
    
   });
 
   return (
     <>
       <BaseEdge id={id} path={edgePath}/>
       
       
      
       <EdgeLabelRenderer>
         <div
           style={{
             position: 'absolute',
             left: labelX,
             top: labelY,
             transform: `translate(-240%, -40%) translate(${labelX+100}px,${labelY+10}px)`,

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
 */