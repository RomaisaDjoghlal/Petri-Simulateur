import React, { useCallback, useMemo,memo, useRef, useState , useEffect} from 'react';
import 'reactflow/dist/style.css';
import ReactFlow, { MiniMap,addEdge, Controls, useReactFlow ,Background ,useNodesState, useEdgesState, ReactFlowProvider, MarkerType } from 'reactflow';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedTool,  getIsSelectable, getIsSidebarVisible, getModalOpt, setSelectedTool, setElementToModify, setIsSelectable, setIsSidebarVisible, setModalOpt } from '../ReduxSlice/EditSlice';
import { addElement, getArcs, getPlaces, getTransitions,  updateElement , deleteElement } from '../ReduxSlice/petriSlice';
import { ToolBar } from './ToolBar';
import { creereseau } from '../Logique/integrations';
import { PlaceNode } from './Components/PlaceNode';
import { TransitionNode } from './Components/TransitionNode';
import { ModifyBar } from '../sideBars/modifyBar'
//import  Sidebar  from './Components/Sidebar.jsx';
import './Styles/Styles.css';
let id1 = 0;// place
const getId1 = () => {
  const newId1 = id1++ ;
  return `P${newId1}`;
}

let id2 = 0;//transition 
const getId2 = () => {
  const newId2 = id2++;
  return `T${newId2}`;
}

let id3 = 0;// arc
const getId3 = () => {
  const newId3 = id3++;
  return `A${newId3}`;
}

let idtokens = 0;// token 
const getidtokens = () => {
  const newidtokens = idtokens++;
  return `J${newidtokens}`;
}


 const reseau = creereseau() ;
localStorage.setItem('reseau',JSON.stringify(reseau))

export const Editer = () => {
  const dispatch = useDispatch()
  const SelectedTool = useSelector(getSelectedTool)
  const isSelectable = useSelector(getIsSelectable)
  const isSidebarVisible = useSelector(getIsSidebarVisible)

  const places = useSelector(getPlaces)
  const transitions = useSelector(getTransitions)
  const arcs = useSelector(getArcs)


  //========================================

  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
 // const reactFlowInstance = useReactFlow();

 /* 
 const nodeTypes = {
    place: PlaceNode,
    transition: TransitionNode  
  } 
 */ 
  const MemoizedPlaceNode = memo(PlaceNode);
  const MemoizedTransitionNode = memo(TransitionNode);

const nodeTypes = useMemo(
  () => ({
    transition : MemoizedTransitionNode ,
    place: MemoizedPlaceNode,
  }),
  []
);
  






const onPaneClick = useCallback((e) => {
  e.preventDefault()
  const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
  const position = reactFlowInstance.screenToFlowPosition({
    x: e.clientX ,
    y: e.clientY ,
   
  })
  
  
  const _places = reactFlowInstance.getNodes().filter(p => p.type === 'place')
  const _transitions = reactFlowInstance.getNodes().filter(p => p.type === 'transition')

   // const placeLabel = _places.length === 0 ? '1' : String(_places.length + 1)
  //const transitionLabel = _transitions.length === 0 ? '1' : String(_transitions.length + 1)

  
  if (SelectedTool === 'place') {
    let i1 = getId1() ;
      const element = {
          id:i1 ,
          type: 'place',
          position,
          data: { label: i1, tokens: '0' , Idtoken1 : '0' , Idtoken2 : '0' , Idtoken3 : '0' ,Idtoken4 : '0' , Idtoken5 : '0' },
      }
      setNodes((nds) => nds.concat(element))
      dispatch(addElement({type:element.type,element}))
      reseau.creeplace();
      reseau.Afficherplaces()
  }
  if (SelectedTool === 'transition') {
    let i2 = getId2() ;
    let p = 1 ;
      const element= {
          id:i2 ,
          type: 'transition',
          position,
          
          data: { label: i2 , poid : p , mode :'imediate'},
      }
      setNodes((nds) => nds.concat(element))
      dispatch(addElement({type:element.type,element}))
      reseau.creetrans()
      reseau.Affichertrans()
  }
  if (SelectedTool === 'timed-transition') {
    let i2 = getId2() ;
    let p = 1 ;
      const element= {
          id:i2 ,
          type: 'transition',
          position,
          style : {
            backgroundColor: 'red',
            borderRadius: '5px',
            padding: '2px',
          },
          data: { label: i2 , backgroundColor : 'red' , poid : p , mode :'timed' },
      }
      setNodes((nds) => nds.concat(element))
      dispatch(addElement({type:element.type,element}))
      reseau.creetransTimed()
  }
}, [reactFlowInstance, nodes, SelectedTool, setNodes, dispatch])


const MarkerType = {
  ArrowClosed: 'arrowclosed',
  ArrowOpen: 'arrowopen',
  Diamond: 'diamond',
  Circle: 'circle',
};


const onConnect = useCallback((params) => {
  const sourceType = reactFlowInstance.getNode(params.source).type
  const targetType = reactFlowInstance.getNode(params.target).type

 
  if (sourceType !== targetType ) {

    if (SelectedTool === 'arc') {
      const element = {
          id: getId3()  ,
          type: 'straight',
          type2 : 'arc',
          source: String(params.source),
          target: String(params.target),
          label: '1',
          data : {
           
          poid : '1' ,
          },         
          markerEnd: {type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: '#118C7E', 
                                }
      }
      setEdges((eds) => eds.concat(element))
      dispatch(addElement({type:element.type,element}))
  } 
 else {
  if (SelectedTool === 'arcinhibe') {
    const element = {
        id: getId3()  ,
        type: 'straight',
        type2 : 'arc',
        animated : true ,
        source: String(params.source),
        target: String(params.target),
        label: '1',
        data : {
        
        poid : '1' ,
        }, 
        markerEnd: {type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: '#118C7E', 
                              } 
       /* markerEnd: {
          type: MarkerType.Circle, 
         // marker: 'url(#circle)',
        }*/
    }
    setEdges((eds) => eds.concat(element))
    dispatch(addElement({type:element.type,element}))
} 
}
}
}, [reactFlowInstance, edges, setEdges, dispatch,SelectedTool])







const deleteNodesById = (ids) => {
  setNodes((nds) => nds.filter((n) => !ids.includes(n.id)));
};

const ajoutToken = (node) => {
  console.log("gggg "+ places[0].data.label)
  console.log("hhhh "+ node.data.label)
  let j = 0;
  const longueurplaces = places.length;
  
       let trouv = false;
  while(( j < longueurplaces)&&(trouv===false)) {
   if ((places[j].data.label) === node.data.label){trouv=true}
   j++;
  }
  j--
  reseau.places[j].SetJetons(reseau.places[j].GetJetons()+1) ;
  reseau.Afficherplaces();
 
};


const suppToken = (node) => {
  console.log("gggg "+ places[0].data.label)
  console.log("hhhh "+ node.data.label)
  let j = 0;
  const longueurplaces = places.length;
  
       let trouv = false;
  while(( j < longueurplaces)&&(trouv===false)) {
   if ((places[j].data.label) === node.data.label){trouv=true}
   j++;
  }
  j--
  reseau.places[j].SetJetons(reseau.places[j].GetJetons()-1) ;
  reseau.Afficherplaces();
 
};


const onNodeClick = useCallback((event, node) => {
  if (SelectedTool === 'pointer') {
    dispatch(setElementToModify(node))
    dispatch(setIsSidebarVisible(true))
  } else {
    if( node.type === 'place'){
    if (SelectedTool === 'Add-token') {
      const newTokens = parseInt(node.data.tokens) + 1;
      console.log("newTokens = " + newTokens)
   
        switch (node.data.tokens){   
          case '0' :
      const tokena = 
        {
          id: getidtokens(),
          type: 'group',
          //data: { label: 'Child Node 1' },
          style : {

          borderRadius: '50%' ,
          width: '8px'  ,
          height: '8px'  ,
          backgroundColor : 'black',
          padding : 0 ,
          margin : 0,
          },
          position: { x: 23, y: 23 },
          parentNode: node.id ,
          extent: 'parent',
        }
        setNodes((nds) => nds.concat(tokena));
        const updatedNode1 = { ...node, data: { ...node.data, tokens: newTokens.toString() , Idtoken1 : tokena.id } };  
              // Dispatch action to update Redux state
      dispatch(updateElement({ type: node.type, element: updatedNode1 }));
      ajoutToken(node) ;
      // Update local state after Redux state is updated
      setNodes((nds) => nds.map((n) => (n.id === node.id ? updatedNode1 : n)));
        break 
        case '1':
          const tokenb = 
        {
          id: getidtokens(),
          type: 'group',
          style : {
          borderRadius: '50%' ,
          width: '8px'  ,
          height: '8px'  ,
          backgroundColor : 'black',
          padding : 0 ,
          margin : 0,
          },
          position: { x: 10, y: 10 },
          hidden : false ,
          parentNode: node.id ,
          extent: 'parent',
        }
        setNodes((nds) => nds.concat(tokenb));
        const updatedNode2 = { ...node, data: { ...node.data, tokens: newTokens.toString() , Idtoken2 : tokenb.id } };  
        // Dispatch action to update Redux state
        dispatch(updateElement({ type: node.type, element: updatedNode2 }));
        ajoutToken(node) ;
        // Update local state after Redux state is updated
        setNodes((nds) => nds.map((n) => (n.id === node.id ? updatedNode2 : n)));
        break 
        case '2':
          const tokenc = 
          {
            id: getidtokens(),
            type: 'group',
            style : { 
            borderRadius: '50%' ,
            width: '8px'  ,
            height: '8px'  ,
            backgroundColor : 'black',
            padding : 0 ,
            margin : 0,
            },
            position: { x: 36 , y: 36 },
            hidden : false ,
            parentNode: node.id ,
            extent: 'parent',
          }
          setNodes((nds) => nds.concat(tokenc));
          const updatedNode3 = { ...node, data: { ...node.data, tokens: newTokens.toString() , Idtoken3 :tokenc.id } };  
          // Dispatch action to update Redux state
          dispatch(updateElement({ type: node.type, element: updatedNode3 }));
          ajoutToken(node) ;
          // Update local state after Redux state is updated
          setNodes((nds) => nds.map((n) => (n.id === node.id ? updatedNode3 : n)));
        break 
        case '3':
          const tokend = 
        {
          id: getidtokens(),
          type: 'group',
          style : {
          borderRadius: '50%' ,
          width: '8px'  ,
          height: '8px'  ,
          backgroundColor : 'black',
          padding : 0 ,
          margin : 0,
          },
          position: { x: 36, y: 10 },
          hidden : false ,
          parentNode: node.id ,
          extent: 'parent',
        }
        setNodes((nds) => nds.concat(tokend));
        const updatedNode4 = { ...node, data: { ...node.data, tokens: newTokens.toString() , Idtoken4 : tokend.id } };  
        // Dispatch action to update Redux state
        dispatch(updateElement({ type: node.type, element: updatedNode4 }));
        ajoutToken(node) ;
        // Update local state after Redux state is updated
        setNodes((nds) => nds.map((n) => (n.id === node.id ? updatedNode4 : n)));
        break 
        case '4':
          const tokene = 
        {
          id: getidtokens(),
          type: 'group',
          style : {
          borderRadius: '50%' ,
          width: '8px'  ,
          height: '8px'  ,
          backgroundColor : 'black',
          padding : 0 ,
          margin : 0,
          },
          position: { x: 10, y: 36 },
          hidden : false ,
          parentNode: node.id ,
          extent: 'parent',
        }
        setNodes((nds) => nds.concat(tokene));
        console.log(" tokend = "+ tokene.id)
          const updatedNode5 = { ...node, data: { ...node.data, tokens: newTokens.toString() , Idtoken5 :tokene.id } };          
        console.log(" tokendafter = "+ updatedNode5.data.token5)
        console.log(" newtoken = "+ updatedNode5.data.tokens)

        // Dispatch action to update Redux state
        dispatch(updateElement({ type: node.type, element: updatedNode5 }));
        ajoutToken(node) ;
        // Update local state after Redux state is updated
        setNodes((nds) => nds.map((n) => (n.id === node.id ? updatedNode5 : n)));
        nodes.forEach((e) => {
          console.log('ID :', e.id);
          console.log('Données :', e.data);
        });
        break 
        default :  
        console.log(" more than 5")
        nodes.forEach((e) => {
          console.log('ID :', e.id);
          console.log('Données :', e.data);
        });
        console.log("node.data.Idtoken1 = "+node.data.Idtoken1);            
                   const idsToDelete = [node.data.Idtoken1, node.data.Idtoken2,node.data.Idtoken3,node.data.Idtoken4,node.data.Idtoken5];
                   console.log(idsToDelete);
                    deleteNodesById(idsToDelete);
                    const updatedNode = { ...node, data: { ...node.data, tokens: newTokens.toString() ,/*Idtoken1 : '0' , Idtoken2 : '0' , Idtoken3 : '0' ,Idtoken4 : '0' , Idtoken5 : '0'*/} };  
                    // Dispatch action to update Redux state
                    dispatch(updateElement({ type: node.type, element: updatedNode }));
                    ajoutToken(node) ;
                    // Update local state after Redux state is updated
                    setNodes((nds) => nds.map((n) => (n.id === node.id ? updatedNode : n)));      
        break 
      }
      console.log(" l = "+newTokens);

        }else if (SelectedTool === 'delete-token'){
          switch (node.data.tokens){   
              case '0':
              break
              case '1':
                const idsToDelete1 = [node.data.Idtoken1];
                deleteNodesById(idsToDelete1);
                const newTokens1 = parseInt(node.data.tokens) - 1;
                const updatedNode1 = { ...node, data: { ...node.data, tokens: newTokens1.toString()   } };
                console.log(" l2 = "+newTokens1);
                suppToken(node);
                // Dispatch action to update Redux state
                dispatch(updateElement({ type: node.type, element: updatedNode1 }));
          
                // Update local state after Redux state is updated
                setNodes((nds) => nds.map((n) =>(n.id === node.id ? updatedNode1 : n)));
              break 
              case '2':
                const idsToDelete2 = [node.data.Idtoken2];
                deleteNodesById(idsToDelete2); 
                const newTokens2 = parseInt(node.data.tokens) - 1;
                const updatedNode2 = { ...node, data: { ...node.data, tokens: newTokens2.toString()   } };
                console.log(" l2 = "+newTokens2);
          
                // Dispatch action to update Redux state
                dispatch(updateElement({ type: node.type, element: updatedNode2 }));
                suppToken(node);
                // Update local state after Redux state is updated
                setNodes((nds) => nds.map((n) =>(n.id === node.id ? updatedNode2 : n)));
              break
              case '3':
                const idsToDelete3 = [node.data.Idtoken3];
                deleteNodesById(idsToDelete3);
                const newTokens3 = parseInt(node.data.tokens) - 1;
                const updatedNode3 = { ...node, data: { ...node.data, tokens: newTokens3.toString()   } };
                console.log(" l2 = "+newTokens3);
          
                // Dispatch action to update Redux state
                dispatch(updateElement({ type: node.type, element: updatedNode3 }));
                suppToken(node);
                // Update local state after Redux state is updated
                setNodes((nds) => nds.map((n) =>(n.id === node.id ? updatedNode3 : n)));
              break
              case '4':

                const idsToDelete4 = [node.data.Idtoken4];
                deleteNodesById(idsToDelete4);
                const newTokens4 = parseInt(node.data.tokens) - 1;
                const updatedNode4 = { ...node, data: { ...node.data, tokens: newTokens4.toString()   } };
                console.log(" l2 = "+newTokens4);
          
                // Dispatch action to update Redux state
                dispatch(updateElement({ type: node.type, element: updatedNode4 }));
                suppToken(node);
                // Update local state after Redux state is updated
                setNodes((nds) => nds.map((n) =>(n.id === node.id ? updatedNode4 : n)));
              break
              case '5':
                console.log(" = 5")
        nodes.forEach((e) => {
          console.log('ID :', e.id);
          console.log('Données :', e.data);
        });
                const idsToDelete5 = [node.data.Idtoken5];
                deleteNodesById(idsToDelete5);
                const newTokens5 = parseInt(node.data.tokens) - 1;
                const updatedNode5 = { ...node, data: { ...node.data, tokens: newTokens5.toString()   } };
                console.log(" l2 = "+newTokens5);
          
                // Dispatch action to update Redux state
                dispatch(updateElement({ type: node.type, element: updatedNode5 }));
                suppToken(node);
                // Update local state after Redux state is updated
                setNodes((nds) => nds.map((n) =>(n.id === node.id ? updatedNode5 : n)));
              break
              case '6':

              const token = 
              {
                id: getidtokens(),
                type: 'group',
                style : {     
                borderRadius: '50%' ,
                width: '8px'  ,
                height: '8px'  ,
                backgroundColor : 'black',
                padding : 0 ,
                margin : 0,
                },
                position: { x: 23, y: 23 },
                parentNode: node.id ,
                extent: 'parent',
              }
              setNodes((nds) => nds.concat(token));
                const token1 = 
              {
                id: getidtokens(),
                type: 'group',
                style : {      
                borderRadius: '50%' ,
                width: '8px'  ,
                height: '8px'  ,
                backgroundColor : 'black',
                padding : 0 ,
                margin : 0,
                },
                position: { x: 10, y: 10 },
                hidden : false ,
                parentNode: node.id ,
                extent: 'parent',
              }
              setNodes((nds) => nds.concat(token1));
                const token2 = 
                {
                  id: getidtokens(),
                  type: 'group',
                  style : {       
                  borderRadius: '50%' ,
                  width: '8px'  ,
                  height: '8px'  ,
                  backgroundColor : 'black',
                  padding : 0 ,
                  margin : 0,
                  },
                  position: { x: 36 , y: 36 },
                  hidden : false ,
                  parentNode: node.id ,
                  extent: 'parent',
                }
                setNodes((nds) => nds.concat(token2));
                const token3 = 
              {
                id: getidtokens(),
                type: 'group',
                style : {     
                borderRadius: '50%' ,
                width: '8px'  ,
                height: '8px'  ,
                backgroundColor : 'black',
                padding : 0 ,
                margin : 0,
                },
                position: { x: 36, y: 10 },
                hidden : false ,
                parentNode: node.id ,
                extent: 'parent',
              }
              setNodes((nds) => nds.concat(token3));
                const token4 = 
              {
                id: getidtokens(),
                type: 'group',
                //data: { label: 'Child Node 1' },
                style : {
      
                borderRadius: '50%' ,
                width: '8px'  ,
                height: '8px'  ,
                backgroundColor : 'black',
                padding : 0 ,
                margin : 0,
                },
                position: { x: 10, y: 36 },
                hidden : false ,
                parentNode: node.id ,
                extent: 'parent',
              }
              setNodes((nds) => nds.concat(token4));
           
               const newTokens = parseInt(node.data.tokens) - 1;
             const updatedNode = { ...node, data: { ...node.data, tokens: newTokens.toString()  , Idtoken1 : token.id , Idtoken2 : token1.id , Idtoken3 : token2.id ,Idtoken4 : token3.id , Idtoken5 : token4.id } };
             console.log(" l2 = "+newTokens);
       
             // Dispatch action to update Redux state
             dispatch(updateElement({ type: node.type, element: updatedNode }));
             suppToken(node);
             // Update local state after Redux state is updated
             setNodes((nds) => nds.map((n) =>(n.id === node.id ? updatedNode : n)));
              break
              default :
              const newTokenss = parseInt(node.data.tokens) - 1;
              const updatedNodee = { ...node, data: { ...node.data, tokens: newTokenss.toString()  /*, Idtoken1 : node.data.Idtoken1 , Idtoken2 : node.data.Idtoken2 , Idtoken3 : node.data.Idtoken3 ,Idtoken4 : node.data.Idtoken4 , Idtoken5 : node.data.Idtoken5 */} };
              console.log(" l2 = "+newTokenss);
        
              // Dispatch action to update Redux state
              dispatch(updateElement({ type: node.type, element: updatedNodee }));
              suppToken(node);
              // Update local state after Redux state is updated
              setNodes((nds) => nds.map((n) =>(n.id === node.id ? updatedNodee : n)));
              break 
             }
             /* if (node.data.tokens !== '0'){
             const newTokens = parseInt(node.data.tokens) - 1;
             const updatedNode = { ...node, data: { ...node.data, tokens: newTokens.toString()  , Idtoken1 : node.data.Idtoken1 , Idtoken2 : node.data.Idtoken2 , Idtoken3 : node.data.Idtoken3 ,Idtoken4 : node.data.Idtoken4 , Idtoken5 : node.data.Idtoken5 } };
             console.log(" l2 = "+newTokens);
       
             // Dispatch action to update Redux state
             dispatch(updateElement({ type: node.type, element: updatedNode }));
       
             // Update local state after Redux state is updated
             setNodes((nds) => nds.map((n) =>(n.id === node.id ? updatedNode : n)));
              }*/
      }
  }   
  }    

  }
,[SelectedTool, dispatch,setNodes,nodes,reactFlowInstance,useEffect])
const onEdgeClick = useCallback((event, edge) => {
  if (SelectedTool === 'pointer') {
      dispatch(setElementToModify(edge))
      dispatch(setIsSidebarVisible(true))
  } 
},[SelectedTool, dispatch])



const onUpdateEl = useCallback((element) => {
  if (element.type === 'place' || element.type === 'transition') {
      reactFlowInstance.setNodes((nds) => [...nds, element])            
  } else {
      reactFlowInstance.setEdges((eds) => {
          let index = 0
          eds.forEach((e,i) => {
              if (e.id === element.id) {
                  index = i
              }
          })
          eds.splice(index,1,element)
          return eds
      })
  } 
  dispatch(updateElement({type:element.type,element}))
  dispatch(setIsSidebarVisible(false))
  dispatch(setElementToModify({}))
},[reactFlowInstance, dispatch])



const onDeleteEl = useCallback((element) => {
  if (element.type === 'place' || element.type === 'transition') {
      reactFlowInstance.deleteElements({nodes:[element],edges:[]})
      setTimeout(() => {
          dispatch(addElement({type:'edges',element:reactFlowInstance.getEdges()}))
      },1000)
  } else {
      reactFlowInstance.deleteElements({nodes:[],edges:[element]})
  }
  dispatch(deleteElement({type:element.type,element : element }))
  dispatch(setIsSidebarVisible(false))
  dispatch(setElementToModify({}))
},[reactFlowInstance, dispatch])



return (
  <>
  <div   style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      width: '100vw', /* Added width */
     
      top: 0, 
      left: 0 
    }}>
       <div style={{ width: '85%', height: '85vh', position: 'relative' }}> 
    
     <svg style={{ position: 'absolute', top: 0, left: 0 , pointerEvents: 'none' }}>
        <defs>
          <marker
            id="circle"
            viewBox="0 0 40 40"
            markerHeight={30}
            markerWidth={30}
            refX={20}
            refY={20}
          >
            {/* Create a circle with the desired attributes */}
            <circle cx="20" cy="13" r="10" fill="red" stroke="#1A192B" strokeWidth="2" />
          </marker>
        </defs>
      </svg>
 
  <ModifyBar isVisible={isSidebarVisible} onDelete={onDeleteEl} onUpdate={onUpdateEl} />

  <div className="grid ">
      <div className="col-span">
      <ToolBar/>
          <ReactFlowProvider>
         
              <div  style={{ height:(window.innerHeight-20-( reactFlowWrapper.current ? reactFlowWrapper.current.getBoundingClientRect().top : 0))}} ref={reactFlowWrapper}>
                  <ReactFlow
                     defaultzoom={1.5}
                     minZoom={0.2}
                     maxZoom={4}
                      nodes={nodes}
                      edges={edges}
                      nodeTypes={nodeTypes}
                      elementsSelectable={isSelectable}
                      onInit={setReactFlowInstance}
                      onPaneClick={onPaneClick}
                      onNodesChange={onNodesChange}
                      onEdgesChange={onEdgesChange}
                      onConnect={onConnect}
                      onNodeClick={onNodeClick}
                      onEdgeClick={onEdgeClick}
                  >
                      <MiniMap zoomable pannable className='hidden md:block' />
                      <Controls />
                      <Background />
                  </ReactFlow>
              </div>
          </ReactFlowProvider>
      </div>
  </div>
  </div>
  </div>
  
  </>
)




  
}