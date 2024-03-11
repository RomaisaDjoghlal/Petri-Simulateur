
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { PlaceNode } from './PlaceNode';
import { TransitionNode } from './TransitionNode';




export default () => {
  const onDragStart = (event, nodeInfo) => {
    event.dataTransfer.setData("application/reactflow", JSON.stringify(nodeInfo));
    event.dataTransfer.effectAllowed = "move";
  };
  const nodeTypes = useMemo(() => ({  place: PlaceNode, transition: TransitionNode  }), []); 
 
  

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event,  { type: 'transition'  })}
        draggable
      >
        transition
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event,  { type: 'place'})}
        draggable
      >
        place
      </div>

    </aside>
  );
};