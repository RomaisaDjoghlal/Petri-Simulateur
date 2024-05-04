
import React ,{ useCallback, useMemo,memo, useRef, useState , useEffect} from 'react';
import 'reactflow/dist/style.css';
import ReactFlow, { MiniMap,addEdge, Controls, useReactFlow ,Background ,useNodesState, useEdgesState, ReactFlowProvider, MarkerType } from 'reactflow';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedTool,  getIsSelectable, getCanvasOpt, getIsSidebarVisible,  setSelectedTool, setElementToModify, setIsSelectable, setIsSidebarVisible, setModalOpt , setCopiedElement ,getCopiedElement ,getToastOpt ,setToastOpt } from '../ReduxSlice/EditSlice';
import { addElement, getArcs, getPlaces, getTransitions,  updateElement , deleteElement , DeleteAll, saveNet} from '../ReduxSlice/petriSlice';
import { MainToolbar } from './MainToolbar';
import { creereseau } from '../Logique/integrations';
import { Place } from '../Logique/structure';
import { PlaceNode } from './Components/PlaceNode';
import TextUpdaterNode from './Components/TextUpdaterNode';
import { TransitionNode } from './Components/TransitionNode';
import { ModifyBar } from '../sideBars/modifyBar'
//import {  } from '../sideBars/attention';
import {Errors} from '../sideBars/Errors'
//import  Sidebar  from './Components/Sidebar.jsx';
import './Styles/Styles.css';

import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';







//localStorage.clear();

let starthistory = 0 , indexhistory = -1 , hislong = 0;
let apdatedhistoryelement = '' ;

const existingNodes  = JSON.parse(localStorage.getItem('tokens')) || [];

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

//const existingNodes = nodes.filter(node => node.type === 'group')

const nodeId = existingNodes.length === 0 ? 0 : Math.max(...existingNodes.map( token=> parseInt(token.id.slice(1)))) + 1 ;
let idtokens = nodeId;// token 
const getidtokens = () => {
  const newidtokens = idtokens++;
  return `J${newidtokens}`;
}

let idtxt = 0;// textNode
const getidtext = () => {
  const newIdtxt = idtxt++ ;
  return `${newIdtxt}`;
}

let k = 0  , pauseRequested = false,lastIteration = 0 ;
let prevtrans = {} ; let marquageInit = [] ;
let tabstep = [];let tabtrans = []


const reseau = creereseau() ;
localStorage.setItem('reseau',JSON.stringify(reseau))



const incrementk = (k) => {
  //if( k !== 0 ){ 
    console.log('k avant = ',k,'tabstep.length',tabstep.length)
  if(k<tabstep.length -1){
 k = k+1 ;}else{ k = tabstep.length }//}
 console.log('k apres = ',k)
 return k ;
}

export const Editer = () => {

 


  const dispatch = useDispatch()
  const SelectedTool = useSelector(getSelectedTool)
  const isSelectable = useSelector(getIsSelectable)
  const isSidebarVisible = useSelector(getIsSidebarVisible)
  const toastOpt = useSelector(getToastOpt)
  const places = useSelector(getPlaces)
  const transitions = useSelector(getTransitions)
  const arcs = useSelector(getArcs)
  const canvasOpt = useSelector(getCanvasOpt)

  
   


  //==============================

 
  


  //========================================
 /* const initialNodes = () => {
    
    if (localStorage.getItem('places') || localStorage.getItem('transitions') ||  localStorage.getItem('textUpdater')) {
     
        return JSON.parse(localStorage.getItem('places')).concat(JSON.parse(localStorage.getItem('transitions'))).concat(JSON.parse(localStorage.getItem('textUpdater')))
    } else if (places.length || transitions.length) {
        return places.concat(transitions)
    } else {
        return []
    }
  }*/
  /*const initialNodes = () => {
    const storedPlaces = JSON.parse(localStorage.getItem('places')) || [];
    const storedTransitions = JSON.parse(localStorage.getItem('transitions')) || [];
    const storedTextUpdaters = JSON.parse(localStorage.getItem('textUpdaters')) || [];
  
    if (storedPlaces.length || storedTransitions.length || storedTextUpdaters.length) {
      return storedPlaces.concat(storedTransitions).concat(storedTextUpdaters);
    } else if (places.length || transitions.length) {
      return places.concat(transitions);
    } else {
      return [];
    }
  };*/



  
  
  /*const toast1 = {
    isVisible: true,
    context: 'dark',
    title: 'Indice !',
   
   msg:'Veuillez consulter le guide pour connaître la fonction de chaque bouton.'
}
dispatch(setToastOpt(toast1))
setTimeout(() => {
    dispatch(setToastOpt({isVisible:false}))
}, 1000)
*/
  




  const initialNodes = () => {

  const toast = {
    isVisible: true,
    context: 'pending',
    title: 'Important !',
    msg:'Sauvegardez votre réseau pour parcourir les pages en sécurité'
}
dispatch(setToastOpt(toast))
setTimeout(() => {
    dispatch(setToastOpt({isVisible:false}))
}, 5000)

  
    const storedPlaces = JSON.parse(localStorage.getItem('places')) || [];
    const storedtokens = JSON.parse(localStorage.getItem('tokens')) || [];

    const storedTransitions = JSON.parse(localStorage.getItem('transitions')) || [];
    const storedTextUpdaters = JSON.parse(localStorage.getItem('textUpdaters')) || [];
    const storedTextUpdaterKeys = Object.keys(localStorage)
      .filter((key) => key.startsWith('textUpdater_'));
    
    console.log('Found textUpdater keys:', storedTextUpdaterKeys);
  
    const storedTextUpdater = storedTextUpdaterKeys
      .map((key) => {
        const textUpdaterId = key.split('_')[2]; // Extracting the ID from the key
        console.log("iddddtt",textUpdaterId)

     
        
        const positionKey = `textUpdaterPosition_${textUpdaterId}`;
       
        const position = JSON.parse(localStorage.getItem(positionKey));
        console.log("pos",position)
        
       // if (position !== null) {
          return {
            id: `textUpdater_${textUpdaterId}`,
            type: 'textUpdater',
            data: { label: `Text Updater ${textUpdaterId}`, text: localStorage.getItem(key) },
            position: position || { x: 0, y: 0 }, // Set the initial position as per your requirement
          };
       // }
        return null; // Ignore nodes with missing position data
      })
      .filter(node => node !== null); // Remove any null nodes
  
    console.log("Number of stored textUpdaters:", storedTextUpdater.length);
  
    if (storedPlaces.length || storedTransitions.length || storedTextUpdaters.length) {
      return storedPlaces.concat(storedTransitions).concat(storedTextUpdaters).concat(storedtokens);
    } else if (places.length || transitions.length) {
      return places.concat(transitions).concat(storedtokens);
    } else {
      return [];
    }
  };
  
  
  
  
  
  //const initialEdges = localStorage.getItem('arcs') ? JSON.parse(localStorage.getItem('arcs')) : (arcs.length ? arcs : [])
  

  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange ] = useNodesState(initialNodes)


 
 
 // const [ ,, onNodesChange] = useNodesState(initialNodes);
  //const [nodes, setNodes, { undo, canUndo, redo, canRedo }] = useUndoable(initialNodes());
  //const [nodes, setNodes, { undo,canRedo , canUndo, redo },onNodesChange] = useUndoable(initialNodes());
 

  
 
// First, destructure nodes and setNodes from useUndoable
//const [nodes, setNodes,onNodesChange] = useNodesState(initialNodes);
//const { undo, canUndo, redo, canRedo } = useUndoable(nodes);

// Then, use the nodes and setNodes from useUndoable to initialize onNodesChange




  const initialEdges = localStorage.getItem('arcs') ? JSON.parse(localStorage.getItem('arcs')) : (arcs.length ? arcs : []);

// Ensure each edge has a unique key
/*const uniqueEdges = initialEdges.map((edge, index) => ({
  ...edge,
  id: index.toString(), // Use a unique identifier, such as index, if the edges don't have unique IDs
}));

// Use uniqueEdges instead of initialEdges
const [edges, setEdges, onEdgesChange] = useEdgesState(uniqueEdges);*/

  




  
  
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  
  const [reactFlowInstance, setReactFlowInstance] = useState(null)

 
 
 /* const onNodeDrag = (event, node) => {
    
    const { id, position } = node;
    const updatedNodes = nodes.map(n => {
      if (n.id === id) {
        return { ...n, position };
      }
      return n;
    });
  
    setNodes(updatedNodes);
  
    // Update edges connected to the dragged node
    const updatedEdges = edges.map(edge => {
      if (edge.source === id) {
        return { ...edge, sourceHandle: position };
      }
      if (edge.target === id) {
        return { ...edge, targetHandle: position };
      }
      return edge;
    });
  
    setEdges(updatedEdges);
  };
  
  const onEdgeDrag = (event, edge) => {
    const { id, sourceHandle, targetHandle, animated, label, style } = edge;
    const updatedEdges = edges.map(e => {
      if (e.id === id) {
        return { ...e, sourceHandle, targetHandle, animated, label, style };
      }
      return e;
    });
    
    setEdges(updatedEdges);
  };*/


  
  
  
  
  
  

  // Function to handle custom treatment when undo is clicked
 

  /*const handleUndo = useCallback(() => {
   
    // Get the last undone state
    const lastState = undo();
    console.log('lastStatek',lastState);
    console.log('Supprimer reseau ');
    // Check if the last state contains nodes
    if (lastState && lastState.length > 0) {
      // Iterate over the last state to find place nodes and perform "Supprimer reseau" action
      lastState.forEach(node => {
        if (node.type === 'place') {
        
          const idplace = parseInt(node.id.slice(1));
          console.log('Supprimer reseau for place node:', idplace);
          // Perform your "Supprimer reseau" action for place nodes
          
          reseau.SuppPlace(idplace)
          reseau.Afficherplaces();
        }
      });
    }
  }, [undo]);
  


  // Function to handle custom treatment when redo is clicked
  const handleRedo = () => {
    console.log("Redo clicked");
    redo(); // Call redo function
    // Add your custom treatment here
  };*/


  

  
  
 // const reactFlowInstance = useReactFlow();

 /* 
 const nodeTypes = {
    place: PlaceNode,
    transition: TransitionNode  
  } 
 */ 
  const MemoizedPlaceNode = memo(PlaceNode);
  const MemoizedTransitionNode = memo(TransitionNode);
  const MemoizedTextUpdaterNode = memo(TextUpdaterNode);



const nodeTypes = useMemo(
  () => ({
    transition : MemoizedTransitionNode ,
    place: MemoizedPlaceNode,
    textUpdater: MemoizedTextUpdaterNode ,
  }),
  []
);





//////SAVE //////
/*const generatePdfBlob = (flowData) => {
  const doc = new jsPDF();
  doc.text('Flow Graph PDF', 10, 10);
  // Add more content to the PDF based on your flowData
  doc.save('myGraph.pdf');

  return new Blob([doc.output()], { type: 'application/pdf' });
};

//////////UNDO////
//const handleGraphChange = (newNodes, newEdges) => {
  //setStateHistory([...stateHistory, { nodes, edges }]); // Add current state to history
  //setNodes(newNodes); // Update nodes state with new nodes
  //setEdges(newEdges); // Update edges state with new edges
//};

const previousNodesRef = useRef(null);

  




////////////////


///////png//////////



// Helper function to convert data URI to Blob
const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: 'image/png' });
};







const handleDownloadPDF = () => {
  const input = document.getElementById('reactflow-background');
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save('downloaded-file.pdf');
  });
};*/



const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: 'image/png' });
};



const saveGraphAsPng = () => {
  // Get the container element containing the React Flow elements
  const elementsContainer = document.querySelector('.react-flow__viewport');

  // Store the current background color
  const originalBackgroundColor = elementsContainer.style.backgroundColor;

  // Set the background color to your desired color
  elementsContainer.style.backgroundColor = 'white'; // Change this to your desired background color

  // Capture the canvas
  html2canvas(elementsContainer).then((canvas) => {
    // Convert the canvas to a PNG data URL
    const pngDataUrl = canvas.toDataURL('image/png');

    // Convert the PNG data URL to a blob
    const blob = dataURItoBlob(pngDataUrl);

    // Trigger the download of the PNG image
    saveAs(blob, 'elementsBackground.png');

    // Restore the original background color
    elementsContainer.style.backgroundColor = originalBackgroundColor;
  });
};











const handleDownloadPDF = () => {
  //const input = document.getElementById('reactFlowBackground'); // Corrected the ID here
  const elementsContainer = document.querySelector('.react-flow__viewport');

  // Store the current background color
  const originalBackgroundColor = elementsContainer.style.backgroundColor;

  // Set the background color to your desired color
  elementsContainer.style.backgroundColor = 'white'; // Change this to your desired background color

  html2canvas(elementsContainer).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgWidth = 210; // A4 size
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('downloaded-file.pdf');
    elementsContainer.style.backgroundColor = originalBackgroundColor;
  });
};

/*const saveGraph = (fileType) => {
  let fileName;
  if (fileType === 'pdf') {
    handleDownloadPDF(); // Call the handleDownloadPDF function to save as PDF
  } else if (fileType === 'png') {
    saveGraphAsPng(); // Call the saveGraphAsPng function to save as PNG
  } else if (fileType === 'json') {
    blob = new Blob([JSON.stringify(flowData)], { type: 'application/json' });
    fileName = 'myGraph.json';
  } else {
    console.error('Invalid file type specified.');
    return;}
};*/


const saveGraph = (fileType) => {
  const flowData = { nodes, edges };

  let blob;
  let fileName;

  if (fileType === 'pdf') {
    //blob = generatePdfBlob(flowData);
    handleDownloadPDF(); 
    fileName = 'myGraph.pdf';
  } else if (fileType === 'json') {
    blob = new Blob([JSON.stringify(flowData)], { type: 'application/json' });
    fileName = 'myGraph.json';
  } else if (fileType === 'png') {
    saveGraphAsPng(); // Call the saveGraphAsPng function to save as PNG
    return; // Exit the saveGraph function after saving PNG
  } else {
    console.error('Invalid file type specified.');
    return;
  }

  saveAs(blob, fileName);
};


////////////////////



///RELOADGRAPH//////
const loadGraph = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsText(file);
  });
};




////FIN RELOAD///////







const handleSaveGraph = (fileType) => {
  saveGraph(fileType);
};


//////FINSAVE//////
 /////RELOAD GRAPH/////

 //const [selectedFile, setSelectedFile] = useState(null);
 
 const handleLoadGraph = async (event) => {
  const file = event.target.files[0];
 
/* if (!file) {
    return; // If no file is selected, do nothing
  }*/

  const data = await loadGraph(file);
 if (data && data.nodes && data.edges) {
    setNodes(data.nodes);
    setEdges(data.edges);
  }
};


////////////////////////////


  
//========================================

  const initializeReseau = useCallback((nodes) => {

  const storedPlaces = nodes.filter(node => node.type === 'place');
  console.log("tab",storedPlaces);
  const storedTransitions = nodes.filter(node => node.type === 'transition');
  const storedTokens = nodes.filter(node => node.type === 'group');
 
  //const newPlace = new Place(0, 0);
 // cuz i can not delete the last place because it always start from 1 in table places
 // reseau.AddPlace(newPlace);
  
    
    //reseau.creeplace();

   // const newPlace = new Place(placeData.id, placeData.nbjetons);


   // reseau.AddPlace(newPlace);
   const idTokenMap = new Array(storedPlaces.length).fill(-1);

   storedPlaces.forEach(element => {
     
       const idd =element.id.slice(1) ;
       idTokenMap[idd] = element.data.tokens;
       dispatch(addElement({type:element.type,element}))

   });
   console.log("jjjj",idTokenMap )
   
   for (const id in idTokenMap) {
     
       
       const nbjetons = idTokenMap[id] !== undefined ? idTokenMap[id] : -1;
      
       const newPlace = new Place(id, parseInt(nbjetons)); 

       if(nbjetons==-1)
       {
        newPlace.SetPlacesup(true);
       }
       reseau.AddPlace(newPlace);
      
       console.log("Created place:", newPlace);
   }

   

  



  
  console.log(" reseau.NpPlacesexist ", reseau.NpPlaces );
  
  storedTransitions.forEach(transitionData => {
    reseau.creetrans();
  });
 // reseau.Afficherplaces();
  reseau.Affichertrans();
  console.log('eddg',edges)
console.log('edges.length',edges.length)
 /*if( edges.length > 0){
for (const element of edges) {
  console.log("eeee", element);
  let p = element.source[0];
  console.log("p = " + p);
  let t = element.target[0];
  console.log("t = " + t);
  let type = element.markerEnd === 'circleMarker';
  
  if (p === 'P' && t === 'T') {
    let Idplace = parseInt(element.source.slice(1));
    let Idtrans = parseInt(element.target.slice(1));
    reseau.Addpre(Idplace, Idtrans, parseInt(element.label), type);
  }
  
  if (p === 'T' && t === 'P') {
    let Idplace = parseInt(element.target.slice(1));
    let Idtrans = parseInt(element.source.slice(1));
    reseau.Addpost(Idplace, Idtrans, parseInt(element.label), type);
  }
}
 }
 /* edges.forEach(element=> {
    console.log("eeee",element);
    let p;
   p = element.source[0]
  console.log("p = "+p)
  let t = element.target[0]
  console.log("t = "+t)
  let type ;
  if(element.markerEnd === 'circleMarker'){
     type =true ;
  }else{ type = false  }
  if((p === 'P') && (t === 'T')){
   let  Idplace = parseInt(element.source.slice(1));
   let  Idtrans = parseInt(element.target.slice(1));
  // let type = reseau.Pre[Idplace][Idtrans].type ;
  // console.log("type = "+type)
   reseau.Addpre(Idplace,Idtrans,parseInt(element.label),type) /// je doit regler ça , il doit dependre de element 
  }
 // reseau.AfficherPre();
  if( (p === 'T') && (t === 'P')){
    let  Idplace = parseInt(element.target.slice(1));
    let  Idtrans = parseInt(element.source.slice(1));
    console.log('hi')
   // let type = reseau.Post[Idplace][Idtrans].type ;
   // console.log("type = "+type)
    reseau.Addpost(Idplace,Idtrans,parseInt(element.label),type) /// je doit regler ça , il doit dependre de element 
  }
 

  
 
}, []); */


edges.forEach(element => {
  if (element && element.source && element.target) {
    console.log("eeee", element);
    let p = element.source[0];
    console.log("p = " + p);
    let t = element.target[0];
    console.log("t = " + t);
    let type = element.markerEnd === 'circleMarker';
    
    if (p === 'P' && t === 'T') {
      let Idplace = parseInt(element.source.slice(1));
      let Idtrans = parseInt(element.target.slice(1));
      reseau.Addpre(Idplace, Idtrans, parseInt(element.label), type);
    }
    
    if (p === 'T' && t === 'P') {
      let Idplace = parseInt(element.target.slice(1));
      let Idtrans = parseInt(element.source.slice(1));
      reseau.Addpost(Idplace, Idtrans, parseInt(element.label), type);
    }
  } else {
    console.log("Invalid edge element:", element);
  }
});

 
reseau.Afficherplaces();

}, []);



useEffect(() => {
  if(reseau.Transitions.length === 0 && reseau.places.length=== 0 ){
    console.log('ffff')
  initializeReseau(nodes); }
}, [initializeReseau]);


console.log("placeback",reseau.places);
console.log("transeback",reseau.Transitions);

console.log("placefront",places);
console.log("transfront",transitions);



 
console.log('pre',reseau.Pre)
console.log('post',reseau.Post)



const onPaneClick = useCallback((e) => {
  e.preventDefault()
  const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
  const position = reactFlowInstance.screenToFlowPosition({
    x: e.clientX ,
    y: e.clientY ,
   
   
  })

 
 
 // const existingPlaces = nodes.filter(node => node.type === 'place')
 // console.log("existingPlaces",existingPlaces);


 // const existingTransitions = nodes.filter(node => node.type === 'transition')
  const existingTextUpdaters = nodes.filter(node => node.type === 'textUpdater')
 
  const placeId = places.length === 0 ? 0 : Math.max(...places.map(place => parseInt(place.id.slice(1)))) + 1

  const transitionId = transitions.length === 0 ? 0 : Math.max(...transitions.map(transition => parseInt(transition.id.slice(1)))) + 1
 
  const textUpdaterId = existingTextUpdaters.length === 0 ? 0 : Math.max(...existingTextUpdaters.map(textUpdater => parseInt(textUpdater.id.split('_')[1]))) + 1 ;

  if(SelectedTool === 'place' || SelectedTool === 'transition' || SelectedTool === 'timed-transition' || SelectedTool === 'textUpdater' )
  {
    const toast = {
      isVisible: true,
      context: 'dark',
      title: 'Indice !',
     // msg:'Pour ajouter un nouvel élément au réseau de Petri, cliquez sur le canevas.'
     msg:'Pour supprimer l\'élément ou modifier ses propriétés, cliquez dessus avec le pointeur.'
  }
  dispatch(setToastOpt(toast))
  setTimeout(() => {
      dispatch(setToastOpt({isVisible:false}))
  }, 10000)
  }
 

if (SelectedTool === 'place') {
  
 
    const element = {
        id: `P${placeId}`,
        type: 'place',
        position,
        data: { label: `P${placeId}` , tokens: '0' , Idtoken1 : '0' , Idtoken2 : '0' , Idtoken3 : '0' ,Idtoken4 : '0' , Idtoken5 : '0' },
    }
    setNodes((nds) => nds.concat(element))
    console.log("ll",element);
    dispatch(addElement({type:element.type,element}))
    console.log("kk",places);
 
    reseau.creeplace();
    reseau.Afficherplaces();
    sethistory((history) => history.concat({effect : 'add' , elementold : '' , elementnew : element }))
   // reseau.Afficherplaces()
}
if (SelectedTool === 'transition') {
 // let i2 = getId2() ;
  let p = 1 ;
    const element= {
      id: `T${transitionId}`,
        type: 'transition',
        position,
        
        data: { label: `T${transitionId}`, poid : p , mode :'imediate' , classestyle : "centered-label"
      },
    }
    setNodes((nds) => nds.concat(element))
    dispatch(addElement({type:element.type,element}))
    console.log("kk",transitions);
    reseau.creetrans()
   reseau.Affichertrans()
   sethistory((history) => history.concat({effect : 'add' , elementold : '' , elementnew : element }))
}
if (SelectedTool === 'timed-transition') {
 // let i2 = getId2() ;
     let p = 1 ;
    const element= {
        id: `T${transitionId}`,
        type: 'transition',
        position,
        style : {
          backgroundColor: 'grey',
          borderRadius: '5px',
          padding: '0.2px',
        },
        data: { label:  `T${transitionId}` , poid : p , mode :'timed',classestyle : "centered-label-timed" },
    }
    setNodes((nds) => nds.concat(element))
    dispatch(addElement({type:element.type,element}))
    reseau.creetransTimed()
    reseau.Affichertrans();
    sethistory((history) => history.concat({effect : 'add' , elementold : '' , elementnew : element }))
}
  if (SelectedTool === 'textUpdater') {
   
      const element= {
         
          id: `textUpdater_${textUpdaterId}`,
          type: 'textUpdater',
         // position: { x: position.x, y: position.y }, 
         position,
          
         // data: { label: i , mode :'imediate'},
      }
      //const textUpdaterPositions = { ...localStorage.getItem('textUpdaterPositions') };
      //textUpdaterPositions[textUpdaterId] = position;
      //localStorage.setItem('textUpdaterPositions', JSON.stringify(textUpdaterPositions));
  
      console.log("possss",position);
    
      
      setNodes((nds) => nds.concat(element))
      dispatch(addElement({type:element.type,element}))
      const positionKey = `textUpdaterPosition_${textUpdaterId}`;
      console.log("mmm",positionKey);
      localStorage.setItem(positionKey, JSON.stringify(position));
    
     
       
  
      
  }
  

}, [reactFlowInstance, nodes, SelectedTool, setNodes, dispatch])





/*const onPaneClick = useCallback((e) => {
  e.preventDefault()
  const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
  const position = reactFlowInstance.screenToFlowPosition({
    x: e.clientX ,
    y: e.clientY ,
   
  })
  
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
      reseau.Afficherplaces();
     // reseau.Afficherplaces()
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
      reseau.Affichertrans();
  }

  if (SelectedTool === 'textUpdater') {
    let i =  getidtext() ;
    let p = 1 ;
      const element= {
          id:i ,
          type: 'textUpdater',
          position,
          
          data: { label: i , mode :'imediate'},
      }
      setNodes((nds) => nds.concat(element))
      dispatch(addElement({type:element.type,element}))
      
  }


}, [reactFlowInstance, nodes, SelectedTool, setNodes, dispatch])*/

const MarkerType = {
  ArrowClosed: 'arrowclosed',
  ArrowOpen: 'arrowopen',
  Diamond: 'diamond',
  Circle: 'circle',
};

const integreArc = (type,params) => {
 /* const longueurtrans = transitions.length;
     let i = 0;
     let Sourcetrouvtrans = false;
while(( i < longueurtrans)&&(Sourcetrouvtrans===false)) {
 if ((transitions[i].id)===params.source){Sourcetrouvtrans=true}
 i++;
}
let ist=i-1;
let j = 0;
const longueurplaces = places.length;

     let Sourcetrouvplaces = false;
while(( j < longueurplaces)&&(Sourcetrouvplaces===false)) {
 if ((places[j].id)===params.source){Sourcetrouvplaces=true}
 j++;
}
let isp =0;
isp= j-1;

let k =0;
let Targettrouvplaces = false;
while(( k< longueurplaces)&&(Targettrouvplaces===false)) {
 if ((places[k].id)===params.target){Targettrouvplaces=true}
 k++;
}
let itp=k-1;
let l = 0;
let Targettrouvtrans = false;
while(( l < longueurtrans)&&(Targettrouvtrans===false)) {
  if ((transitions[l].id)===params.target){Targettrouvtrans=true}
  l++;
 }
 let itt=l-1;
 //console.log('targetran');
 ///console.log(Targettrouvtrans);
 //console.log('sourceplace');
// console.log(Sourcetrouvplaces);
 
 if((Targettrouvtrans===true)&&(Sourcetrouvplaces===true) ){
  reseau.Addpre(isp,itt,1,type);
  console.log('pre p t');
  reseau.AfficherPre();
 }
 if((Sourcetrouvtrans===true)&&(Targettrouvplaces === true )){
  reseau.Addpost(itp,ist,1,type);
  console.log('post t p');
  reseau.AfficherPost();
 }*/

 let p = params.source[0]
      console.log("p = "+p)
      let t = params.target[0]
      console.log("t = "+t)
      if( (p === 'P') && (t === 'T')){
       let  Idplace = parseInt(params.source.slice(1));
       let  Idtrans = parseInt(params.target.slice(1));
       //let type = reseau.Pre[Idplace][Idtrans].type ;
       console.log("type = "+type)
       reseau.Addpre(Idplace,Idtrans,1,type)/// je doit regler ça , il doit dependre de element 
      }
  
      if( (p === 'T') && (t === 'P')){
        let  Idplace = parseInt(params.target.slice(1));
        let  Idtrans = parseInt(params.source.slice(1));
       // let type = reseau.Post[Idplace][Idtrans].type ;
        console.log("type = "+type)
        reseau.Addpost(Idplace,Idtrans,1,type)/// je doit regler ça , il doit dependre de element 
      }

}
const onConnect = useCallback((params) => {
  const sourceType = reactFlowInstance.getNode(params.source).type
  const targetType = reactFlowInstance.getNode(params.target).type

  if  (((sourceType === 'place' ) && (targetType === 'place')) || ((sourceType === 'transition' ) && (targetType === 'transition'))){
    console.log("affichere errro");
      const toast = {
                isVisible: true,
                context: 'pending',
                title: 'Erreur!',
                msg: "Vous ne pouvez pas connecter deux nœuds du même type."
            }
            dispatch(setToastOpt(toast))
            setTimeout(() => {
                dispatch(setToastOpt({isVisible:false}))
            }, 10000)
        }

 console.log("sourceType = "+sourceType)
 console.log("targetType = "+targetType)
  if (sourceType !== targetType ) {

    
    const existingEdges = edges.filter(edge => edge.type === 'straight');
    const edgeId = existingEdges.length === 0 ? 0 : Math.max(...existingEdges.map(arc => parseInt(arc.id.slice(1)))) + 1;



     //const edgeId = edges.length === 0 ? '0' : String(Math.max(...edges.map(n => parseInt(n.id).slice(1))) + 1)
    if (SelectedTool === 'arc') {
      const element = {
          id: `A${edgeId}` ,
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
      console.log("sourve = "+element.source)
      setEdges((eds) => eds.concat(element))
      dispatch(addElement({type:element.type,element}))
      integreArc(false,params)
      sethistory((history) => history.concat({effect : 'add' , elementold : '' , elementnew : element }))
  } 
 else {
if (SelectedTool === 'arcinhibe') {
  if((sourceType === 'transition' ) && (targetType === 'place')){
  const toast2 = {
    isVisible: true,
    context: 'pending',
    title: 'Erreur!',
    msg: "Vous ne pouvez pas connecter l'arc inhibé d'une Transition à une Place."
}
dispatch(setToastOpt(toast2))
setTimeout(() => {
    dispatch(setToastOpt({isVisible:false}))
}, 10000)
}

  if ((sourceType === 'place' ) && (targetType === 'transition')){
    console.log("here")
    const element = {
      id: `A${edgeId}` ,
      type: 'straight',
      type2 : 'arc',
      source: String(params.source),
      target: String(params.target),
      label: '1',
      data : {       
      poid : '1' ,
      },         
      markerEnd: "circleMarker"
  } 
  //////////
  // Create the SVG element
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

// Create the defs element
const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

// Create the marker element
const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
marker.setAttribute("id", "circleMarker");
marker.setAttribute("markerWidth", "8");
marker.setAttribute("markerHeight", "8");
marker.setAttribute("refX", "8");
marker.setAttribute("refY", "4");
marker.setAttribute("orient", "auto");
// Create the circle element inside the marker
const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
circle.setAttribute("cx", "4");
circle.setAttribute("cy", "4");
circle.setAttribute("r","4");
circle.setAttribute("fill", "black");
//circle.setAttribute("stroke", "black");


// Append the circle to the marker, and marker to the defs
marker.appendChild(circle);
defs.appendChild(marker);

// Create the line element
const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
line.setAttribute("x1", "50");
line.setAttribute("y1", "50");
line.setAttribute("x2", "150");
line.setAttribute("y2", "150");
line.setAttribute("marker-end", "url(#circleMarker)");

// Append the defs and line to the SVG
svg.appendChild(defs);
svg.appendChild(line);

// Append the SVG to the document body or any other container
document.body.appendChild(svg);


 ////////
  console.log('mark');
   console.log(element.markerEnd);

   setEdges((eds) => eds.concat(element))
   dispatch(addElement({type:element.type,element}))
   integreArc(true,params)
  }

  
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

  const existingNodes = nodes.filter(node => node.type === 'group')
  const nodeId = existingNodes.length === 0 ? 0 : Math.max(...existingNodes.map( token=> parseInt(token.id.slice(1)))) + 1
  
  if (SelectedTool === 'pointer') {
    apdatedhistoryelement = node ;
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
          id: getidtokens() ,
          type: 'group',
          style : {
          borderRadius: '50%' ,
          width: '8px'  ,
          height: '8px'  ,
          backgroundColor : 'black',
          padding : 0 ,
          margin : 0,
          },
          position: { x: 23, y: 23},
          parentNode: node.id ,
          extent: 'parent',
        }
        setNodes((nds) => nds.concat(tokena));
        const updatedNode1 = { ...node, data: { ...node.data, tokens: newTokens.toString() , Idtoken1 : tokena.id } };  
              // Dispatch action to update Redux state
      dispatch(updateElement({ type: node.type, element: updatedNode1 }));
      sethistory((history) => history.concat({effect : 'addtoken' , elementold :  node, elementnew : [updatedNode1,tokena] }))
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
        sethistory((history) => history.concat({effect : 'addtoken' , elementold :  node, elementnew : [updatedNode2,tokenb] }))

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
          sethistory((history) => history.concat({effect : 'addtoken' , elementold :  node, elementnew : [updatedNode3,tokenc] }))

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
        sethistory((history) => history.concat({effect : 'addtoken' , elementold :  node, elementnew : [updatedNode4,tokend] }))

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
        sethistory((history) => history.concat({effect : 'addtoken' , elementold :  node, elementnew : [updatedNode5,tokene] }))
 
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
                    sethistory((history) => history.concat({effect : 'addtoken' , elementold :  node, elementnew : [updatedNode,''] }))

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
                sethistory((history) => history.concat({effect : 'deletetoken' , elementold :  node, elementnew : [updatedNode1,node.data.Idtoken1,1] }))
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
                sethistory((history) => history.concat({effect : 'deletetoken' , elementold :  node, elementnew : [updatedNode2,node.data.Idtoken2,2] }))
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
                sethistory((history) => history.concat({effect : 'deletetoken' , elementold :  node, elementnew : [updatedNode3,node.data.Idtoken3,3] }))
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
                sethistory((history) => history.concat({effect : 'deletetoken' , elementold :  node, elementnew : [updatedNode4,node.data.Idtoken4,4] }))
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
                sethistory((history) => history.concat({effect : 'deletetoken' , elementold :  node, elementnew : [updatedNode5,node.data.Idtoken5,5] }))
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
             sethistory((history) => history.concat({effect : 'deletetoken' , elementold :  node, elementnew : [updatedNode,'',''] }))
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
              sethistory((history) => history.concat({effect : 'deletetoken' , elementold :  node, elementnew : [updatedNodee,'',''] }))
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

      else {
        const toast = {
            isVisible: true,
            context: 'dark',
            title: 'Indice !',
            msg: 'Sélectionnez l\'outil Pointeur si vous souhaitez gérer l\'élément'
        }
        dispatch(setToastOpt(toast))
        setTimeout(() => {
            dispatch(setToastOpt({isVisible:false}))
        }, 10000)
    }
  }   
  }    

  }
,[SelectedTool, dispatch,setNodes,nodes,reactFlowInstance,useEffect])

console.log('nodes',nodes)




const onEdgeClick = useCallback((event, edge) => {
  if (SelectedTool === 'pointer') {
    apdatedhistoryelement = edge ;
      dispatch(setElementToModify(edge))
      dispatch(setIsSidebarVisible(true))
  } else {
    const toast = {
        isVisible: true,
        context: 'dark',
        title: 'Indice !',
        msg: 'Sélectionnez l\'outil Pointeur si vous souhaitez gérer l\'élément'
    }
    dispatch(setToastOpt(toast))
    setTimeout(() => {
        dispatch(setToastOpt({isVisible:false}))
    }, 10000)
}
},[SelectedTool, dispatch])

console.log("nodessss",nodes);

const onUpdateEl = useCallback((element) => {
  if (element.type === 'place' || element.type === 'transition' || element.type === 'textUpdater') {
    setNodes((prevNodes) => prevNodes.map((n) => (n.id === element.id ? element : n)));

      if(apdatedhistoryelement !== ''  && apdatedhistoryelement.id === element.id){
        sethistory((history) => history.concat({effect : 'update' , elementold : apdatedhistoryelement , elementnew : element }))
      }         
  } else {
    if(apdatedhistoryelement !== ''  && apdatedhistoryelement.id === element.id){
      sethistory((history) => history.concat({effect : 'update' , elementold : apdatedhistoryelement , elementnew : element }))
    }
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
      reseau.AfficherPre();
      let p = element.source[0]
      console.log("p = "+p)
      let t = element.target[0]
      console.log("t = "+t)
      if( (p === 'P') && (t === 'T')){
       let  Idplace = parseInt(element.source.slice(1));
       let  Idtrans = parseInt(element.target.slice(1));
       let type = reseau.Pre[Idplace][Idtrans].type ;
       console.log("type = "+type)
       reseau.Addpre(Idplace,Idtrans,parseInt(element.label),type)/// je doit regler ça , il doit dependre de element 
      }
      reseau.AfficherPre();
      if( (p === 'T') && (t === 'P')){
        let  Idplace = parseInt(element.target.slice(1));
        let  Idtrans = parseInt(element.source.slice(1));
        let type = reseau.Post[Idplace][Idtrans].type ;
        console.log("type = "+type)
        reseau.Addpost(Idplace,Idtrans,parseInt(element.label),type)/// je doit regler ça , il doit dependre de element 
      }
      
    
  } 
  if(element.type === 'transition'){
  const indice  = parseInt(element.id.slice(1)); 
  console.log("indice = "+ indice)
  console.log("element.data.poid = "+element.data.poid)
  reseau.Transitions[indice].SetPoids(element.data.poid)
  }
  //reseau.Transitions[indice].SetPoids(2)
   reseau.Affichertrans() ;
  dispatch(updateElement({type:element.type,element}))
  dispatch(setIsSidebarVisible(false))
  dispatch(setElementToModify({}))
},[reactFlowInstance, dispatch])



const onDeleteEl = useCallback((element) => {
  
  if (element.type === 'place' || element.type === 'transition' || element.type === 'textUpdater' ) {
    let edgestab = [] ;
   
    if(element.type === 'place'){
      const idplace  = parseInt(element.id.slice(1)); 
        
        reseau.SuppPlace(idplace)
        reseau.AfficherPre();
    }else{
      if(element.type === 'transition') {
      const idtrans  = parseInt(element.id.slice(1)); 
      console.log(" idtrans = "+idtrans)
        reseau.SuppTrans(idtrans)}

      else{

        localStorage.removeItem(element.id);
        localStorage.removeItem(`textUpdater_${element.id}`);
        console.log('txtid',`textUpdater${element.id}`);

       
      }
    }
    console.log('edges inside',edges)
    for( let k = 0 ; k< edges.length ; k++){
      console.log('element.id',element.id)
      if(edges[k].source === element.id  || edges[k].target === element.id ){
        console.log('edge',edges[k])
        edgestab = edgestab.concat(edges[k]);
            
      }
    }
      console.log('edgestab',edgestab)
    

      reactFlowInstance.deleteElements({nodes:[element],edges:[]})

      sethistory((history) => history.concat({effect : 'delete' , elementold : element , elementnew : edgestab }))

      //setNodes(prevNodes => prevNodes.filter(node => node.id !== element.id));

      setTimeout(() => {
          dispatch(addElement({type:'edges',element:reactFlowInstance.getEdges()}))
      },1000)
  } else if (element.type === 'arc' ) {
     console.log("delte arc")
      reactFlowInstance.deleteElements({nodes:[],edges:[element]})
      sethistory((history) => history.concat({effect : 'delete' , elementold : element , elementnew : '' }))
      setNodes(prevNodes => prevNodes.filter(node => node.id !== element.id));
      reseau.AfficherPre();
      let p = element.source[0]
      console.log("p = "+p)
      let t = element.target[0]
      console.log("t = "+t)
      let poid = 0 , type = 0 ;
      if( (p === 'P') && (t === 'T')){
       let  Idplace = parseInt(element.source.slice(1));
       let  Idtrans = parseInt(element.target.slice(1));
      reseau.Pre[Idplace][Idtrans] = {poid,type} ;
      }
      if( (p === 'T') && (t === 'P')){
        let  Idplace = parseInt(element.target.slice(1));
        let  Idtrans = parseInt(element.source.slice(1));
       reseau.Post[Idplace][Idtrans] = {poid,type} ;
       }

      reseau.AfficherPre();

  }
  reseau.Afficherplaces()
  reseau.Affichertrans()
  dispatch(deleteElement({type:element.type,element : element }))

  dispatch(setIsSidebarVisible(false))
  dispatch(setElementToModify({}))
 
},[reactFlowInstance, dispatch])

console.log("placelengthhhfront",places.length);
/*
const onDeleteEl = useCallback((element) => {
  
  if (element.type === 'place' || element.type === 'transition' || element.type === 'textUpdater') {
    let idToRemove = null;

    if (element.type === 'place') {
        idToRemove = parseInt(element.id.slice(1));
        console.log("iddd", element.id);
        reseau.SuppPlace(idToRemove);
    } else if (element.type === 'transition') {
        idToRemove = parseInt(element.id.slice(1));
        console.log(" idtrans = " + idToRemove);
        reseau.SuppTrans(idToRemove);
    } else if (element.type === 'textUpdater') {
        idToRemove = parseInt(element.id.split('_')[1]); 

        console.log("idddsupp", element.id);
        // Handle the removal of textUpdater here
    }

    reactFlowInstance.deleteElements({ nodes: [element], edges: [] });

    setNodes(prevNodes => {
      return prevNodes
        .map(node => {
          const nodeId = parseInt(node.id.slice(1));
          if (node.type === 'place' && nodeId > idToRemove) {
          
            node.id = `P${nodeId - 1}`;
          } else if (node.type === 'transition' && nodeId > idToRemove) {
            node.id = `T${nodeId - 1}`;
          }
          return node;
        })
        .filter(node => node.id !== element.id);
    });
    

    

    
  } else {
    reactFlowInstance.deleteElements({ nodes: [], edges: [element] });
    setNodes(prevNodes => prevNodes.filter(node => node.id !== element.id));
    reseau.AfficherPre();
    let p = element.source[0];
    console.log("p = " + p);
    let t = element.target[0];
    console.log("t = " + t);
    if ((p === 'P') && (t === 'T')) {
      let Idplace = parseInt(element.source.slice(1));
      let Idtrans = parseInt(element.target.slice(1));
      reseau.Pre[Idplace][Idtrans] = 0;
    }
    if ((p === 'T') && (t === 'P')) {
      let Idplace = parseInt(element.target.slice(1));
      let Idtrans = parseInt(element.source.slice(1));
      reseau.Post[Idplace][Idtrans] = 0;
    }
    reseau.AfficherPre();
  }

  console.log("placesafterdelte",places);
  
  reseau.Afficherplaces();
  reseau.Affichertrans();
  console.log("elmid",element.type);
  dispatch(deleteElement({ type: element.type, element: element }));
  dispatch(setIsSidebarVisible(false));
  dispatch(setElementToModify({}));

}, [reactFlowInstance, dispatch]);

*/




console.log("placeredux",places);
console.log("transredux",transitions);


 





const DeleteAllCanvas = useCallback(() => {
  reactFlowInstance.setNodes([])
  reactFlowInstance.setEdges([])
  dispatch(DeleteAll())
  
  dispatch(setSelectedTool('place'))
  
  localStorage.clear();
  reseau.DelteReseau();

},[reactFlowInstance, dispatch])



const onSaveCanvas = useCallback(() => {
  dispatch(setSelectedTool('save'))
  dispatch(setIsSelectable(false))
  k = 0 ; pauseRequested = false
  lastIteration = 0 ;
  let can = marquageallowed();
  let tab = [] ;
  let arc = [] ;
  let tab1 = [] ;  let arc1 = [] ;
  console.log('savecanvas')
if( can === true ){
  let marquageInitiale = reseau.getmarqini() ;
  console.log('marquage initiale ')
  console.log(marquageInitiale)
 
  reseau.ConstrGraphmarq(marquageInitiale,0,tab,arc)
  console.log(' le tableau ')
  console.log(tab)
  console.log(' le tableau arc  ')
  console.log(arc)
  localStorage.setItem('listArc',JSON.stringify(arc))
  localStorage.setItem('listMarquage',JSON.stringify(tab))
   reseau.ConstrGraphmarqre(tab,arc,tab1,arc1) ;
   console.log(' le tableau reduit ')
   console.log(tab1)
   console.log(' le tableau arc  reduit')
   console.log(arc1)
   localStorage.setItem('listArcreduit',JSON.stringify(arc1))
   localStorage.setItem('listMarquagereduit',JSON.stringify(tab1))
   marquageInit = reseau.getmarqini() ;
  console.log('avant simul')
  tabstep = reseau.simulation(tab,arc,marquageInit,tabtrans)
  console.log('tabstep outside',tabstep)
  console.log('tabtrans',tabtrans)
}
 /*
  k = 0 ; pauseRequested = false
          lastIteration = 0 ;
          let can = marquageallowed();
          let tab = [] ;
        let arc = [] ;
        
        if( can === true ){
          let marquageInitiale = reseau.getmarqini() ;
          console.log('marquage initiale ')
          console.log(marquageInitiale)
         
          reseau.ConstrGraphmarq(marquageInitiale,0,tab,arc)
          console.log(' le tableau ')
          console.log(tab)
          console.log(' le tableau arc  ')
          console.log(arc)
          localStorage.setItem('listArc',JSON.stringify(arc))
          localStorage.setItem('listMarquage',JSON.stringify(tab))
        
           marquageInit = reseau.getmarqini() ;
          console.log('avant simul')
          tabstep = reseau.simulation(tab,arc,marquageInit,tabtrans)
          console.log('tabstep outside',tabstep)
          console.log('tabtrans',tabtrans)
        }

  */
  let toast = {}


  /*dispatch(saveNet({nodes:reactFlowInstance.getNodes(),edges:reactFlowInstance.getEdges()}))

  
  const currentNodes = reactFlowInstance.getNodes().map(n => n.data.label)
  const checkDuplicated = currentNodes.filter((n,i) => currentNodes.indexOf(n) !== i)
  if (checkDuplicated.length) {
      toast = {
          isVisible: true,
          context: 'pending',
          title: 'Erreur !',
          msg: "Il n'est pas possible d'avoir deux nœuds ou plus avec le même libellé ( "+checkDuplicated+" )."
      }

  } else {*/


      dispatch(saveNet({nodes:reactFlowInstance.getNodes(),edges:reactFlowInstance.getEdges()}))
      toast = {
          isVisible: true,
          context: 'success',
          title: 'succès!',
          msg: 'Opération terminée avec succès. Vous pouvez maintenant naviguer sur les pages et garder votre réseau de Petri en sécurité !'
      }  
  //}
  dispatch(setToastOpt(toast))
  setTimeout(() => {
      dispatch(setSelectedTool('place'))
  }, 100)
  setTimeout(() => {
      dispatch(setToastOpt({isVisible:false}))
  }, 10000)
  

},[reactFlowInstance, dispatch])


//<TextUpdaterNode id={`textUpdater_0`} onDeleteText={onDeleteText} />

const idToken =()=>{
const existingNodes = nodes.filter(node => node.type === 'group')
console.log("existe",existingNodes)
const nodeId = existingNodes.length === 0 ? 0 : Math.max(...existingNodes.map( token=> parseInt(token.id.slice(1)))) + 1 ;
return `J${nodeId}` ; 
}


const drawtokens = (node,nbtokens) => {

 
  let updatedNode = node ;   let tabId = [] ; 
  if(parseInt(nbtokens)<=5){       
   for (let j = 0;j<parseInt(nbtokens) ;j++){

   
    tabId[j]= getidtokens() ;console.log('tab',j,'=',tabId[j]) ; }}
    if(nbtokens === '0' ){     updatedNode = { ...node, data: { ...node.data, tokens: nbtokens , Idtoken1 :'0' , Idtoken2 : '0' , Idtoken3 : '0', Idtoken4 : '0' , Idtoken5 : '0'} }; 
   }
    if (nbtokens === '1' || nbtokens === '2' || nbtokens === '3' || nbtokens === '4' || nbtokens === '5'){
       console.log('nbj = ',nbtokens)
       console.log('node ',node)
     const tokena =  {
       id: tabId[0] , type: 'group',
       style : { borderRadius: '50%' , width: '8px'  ,height: '8px'  ,
       backgroundColor : 'black', padding : 0 , margin : 0,
       },
       position: { x: 23, y: 23 },parentNode: node.id ,extent: 'parent',}
     setNodes((nds) => nds.concat(tokena));
      updatedNode = { ...node, data: { ...node.data, tokens: nbtokens , Idtoken1 :tabId[0] , Idtoken2 : '0' , Idtoken3 : '0', Idtoken4 : '0' , Idtoken5 : '0'} }; 
      console.log('updatedNode1',updatedNode)         
    } if (nbtokens === '2' || nbtokens === '3' || nbtokens === '4' || nbtokens === '5') {
    
     const tokenb =  {
       id: tabId[1], type: 'group',
       style : { borderRadius: '50%' , width: '8px'  ,height: '8px'  ,
       backgroundColor : 'black', padding : 0 , margin : 0,
       },
       position: {x: 10, y: 10 },parentNode: node.id ,extent: 'parent',}
     setNodes((nds) => nds.concat(tokenb));
     updatedNode = { ...updatedNode, data: { ...node.data, tokens: nbtokens , Idtoken1 :tabId[0] , Idtoken2 :tabId[1] , Idtoken3 : '0', Idtoken4 : '0' , Idtoken5 : '0'} };          
     console.log('updatedNode2',updatedNode)         
 
    }
 if (nbtokens === '3' || nbtokens === '4' || nbtokens === '5'){
     const tokenc =  {
       id: tabId[2], type: 'group',
       style : { borderRadius: '50%' , width: '8px'  ,height: '8px'  ,
       backgroundColor : 'black', padding : 0 , margin : 0,
       },
       position: {x: 36, y: 36 },parentNode: node.id ,extent: 'parent',}
     setNodes((nds) => nds.concat(tokenc));
     updatedNode = { ...updatedNode, data: { ...node.data, tokens: nbtokens , Idtoken1 :tabId[0] , Idtoken2 :tabId[1] , Idtoken3 :tabId[2] , Idtoken4 : '0' , Idtoken5 : '0'} };          
     console.log('updatedNode3',updatedNode)         
 
    }if (nbtokens === '4' || nbtokens === '5'){
     const tokend =  {
       id: tabId[3], type: 'group',
       style : { borderRadius: '50%' , width: '8px'  ,height: '8px'  ,
       backgroundColor : 'black', padding : 0 , margin : 0,
       },
       position: {x: 36, y: 10 },parentNode: node.id ,extent: 'parent',}
     setNodes((nds) => nds.concat(tokend));
     updatedNode = { ...updatedNode, data: { ...node.data, tokens: nbtokens , Idtoken1 :tabId[0] , Idtoken2 :tabId[1] , Idtoken3 :tabId[2], Idtoken4 :tabId[3] , Idtoken5 : '0'} };          
     console.log('updatedNode4',updatedNode)         
 
    } if (nbtokens === '5'){
     const tokene =  {
       id: tabId[4], type: 'group',
       style : { borderRadius: '50%' , width: '8px'  ,height: '8px'  ,
       backgroundColor : 'black', padding : 0 , margin : 0,
       },
       position: {x: 10, y: 36 },parentNode: node.id ,extent: 'parent',}
     setNodes((nds) => nds.concat(tokene));
     updatedNode = { ...updatedNode, data: { ...node.data, tokens: nbtokens , Idtoken1 :tabId[0] , Idtoken2 :tabId[1] , Idtoken3 :tabId[2], Idtoken4 :tabId[3] , Idtoken5 :tabId[4]} };          
     console.log('updatedNode5',updatedNode)         
 
    } if(parseInt(nbtokens) >= 6){
     const idsToDelete = [node.data.Idtoken1, node.data.Idtoken2,node.data.Idtoken3,node.data.Idtoken4,node.data.Idtoken5];
     console.log(idsToDelete);
      deleteNodesById(idsToDelete);
       updatedNode = { ...updatedNode, data: { ...node.data, tokens:nbtokens ,/*Idtoken1 : '0' , Idtoken2 : '0' , Idtoken3 : '0' ,Idtoken4 : '0' , Idtoken5 : '0'*/} };  
 
    }
    //let j = 0;
    const longueurplaces = reseau.places.length;  console.log('longueurplaces',longueurplaces)
  /* let trouv = false;
    while(( j < longueurplaces)&&(trouv===false)) {
     if ((places[j].data.label) === node.data.label){trouv=true}j++;}
      j--;console.log('j = ',j)*/
      reseau.places[longueurplaces-1].SetJetons(parseInt(nbtokens)) ;
    reseau.Afficherplaces();
    return updatedNode ;
   
 }
 
 const [showContextMenu, setShowContextMenu] = useState(false);
 const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0 , y: 0 });
 const handleNodeContextMenu = useCallback((event, node) => {
   event.preventDefault();
   setShowContextMenu(true);
   setContextMenuPosition({ x: event.clientX, y: event.clientY });
   console.log('Clic droit sur le nœud :', node);
   dispatch(setCopiedElement(node))
 },[dispatch]);
 const copy = () => {
   setShowContextMenu(false);
   //console.log(' copiednode ',node)
 
   //dispatch(setCopiedElement(node))
 
 }
 const copiedElement = useSelector(getCopiedElement)


 const nextId = (node) => {
  const existingPlaces = nodes.filter(node => node.type === 'place')
  const existingTransitions = nodes.filter(node => node.type === 'transition')
  const placeId = existingPlaces.length === 0 ? 0 : Math.max(...existingPlaces.map(place => parseInt(place.id.slice(1)))) + 1
  const transitionId = existingTransitions.length === 0 ? 0 : Math.max(...existingTransitions.map(transition => parseInt(transition.id.slice(1)))) + 1
 
  if(node.type === 'place'){
   
  
   return `P${placeId}` ;
  }else if (node.type === 'transition' ){
    return `T${transitionId}` ;
  }
}
 
const paste = () => {
  setShowContextMenu(false); 
  let i = nextId(copiedElement) ;
  let  j = copiedElement.data.tokens ;
   //copiedElement.id = nextId(copiedElement)
   const node = {
    ...copiedElement, id: i ,
   // position : position ,
    data: {
    ...copiedElement.data,  label: i, tokens : j,}};
  console.log('copiedElement',copiedElement)

  if( node.type === 'place'){
    setNodes((nodes) => [...nodes, node]);
    reseau.creeplace();
    reseau.Afficherplaces();
    let element = drawtokens(node,node.data.tokens)
    setNodes((nodes) => [...nodes, element]);
    console.log('element.data.tokens',element.data.tokens)    
    console.log('element', element)
    sethistory((history) => history.concat({effect : 'paste' , elementold : '' , elementnew : element }))

      dispatch(addElement({type:element.type,element}))
     // const element = drawtokens(element,element.data.tokens)
      console.log('placeelemet',element)  
  }else if (node.type === 'transition'){
    let element = node ;
    dispatch(addElement({type:element.type,element}))
    setNodes((nodes) => [...nodes, element]);
    sethistory((history) => history.concat({effect : 'add' , elementold : '' , elementnew : element }))
    reseau.creetrans(); console.log('reseau.Transitions.length ',reseau.Transitions.length )
    reseau.Transitions[reseau.Transitions.length -1].SetPoids(parseInt(node.data.poid));       
      reseau.Affichertrans();
  }else if (node.type === 'trans'){
    let element = node ;     setNodes((nodes) => [...nodes, element]);
    dispatch(addElement({type:element.type,element}))
      reseau.creetransTimed();console.log('reseau.Transitions.length ',reseau.Transitions.length )
      reseau.Transitions[reseau.Transitions.length -1].SetPoids(parseInt(node.data.poid));  
      reseau.Affichertrans();
  }

  // Mettre à jour l'état en ajoutant l'élément modifié à nodes

  console.log(' place redux = ',places) ;
  console.log(' node outside ',node)
  //setNodes((nds) => nds.concat(copiedElement))

}
 const handleContextMenu = useCallback((event, node) => {
   event.preventDefault();
   const position = reactFlowInstance.screenToFlowPosition({
     x: event.clientX ,
     y: event.clientY ,
    
   })
   setShowContextMenu(true);
   //setContextMenuPosition({ x: event.clientX, y: event.clientY });
   setContextMenuPosition({ x: position.x, y: position.y });
 
   console.log('Clic droit sur le nœud :', node);
  
 },[reactFlowInstance]);
 
 const handleNodesChange = (node) => {
  
   if (showContextMenu) {
     if (node.__rf && node.__rf.position){
 
       const nodePosition = node.__rf.position;
       setContextMenuPosition({ x: nodePosition.x, y: nodePosition.y });
     }
     
   }
 };
 {showContextMenu && (
           <div className='copypaste' style={{ position: 'absolute', top: contextMenuPosition.y, left: contextMenuPosition.x }}>
               <div className='listcp1' onClick={copy}>Copier</div>
               <div className='listcp2' onClick={paste}><br/>Coller</div>
           </div>
         )}
 
         const [history, sethistory] = useState([]);



 const undo = () =>{
  
          console.log('hislenght',history.length)
          if(indexhistory === -1 && hislong == history.length)
          {}else{
          if(starthistory === 0 || hislong < history.length ){
            indexhistory = history.length - 1 ;
             hislong = history.length ;
            starthistory = 1 ; 
          }
          console.log('indexhis',indexhistory)
          let juste = history[indexhistory] ;  console.log('juste ',juste)
          if(juste.effect === 'add' || juste.effect === 'paste' ){
            let element = juste.elementnew ;
            dispatch(deleteElement({type:element.type,element : element }))
             if(juste.elementnew.type === 'place' || juste.elementnew.type === 'transition'){
              reactFlowInstance.deleteElements({nodes:[juste.elementnew],edges:[]})
               if(juste.elementnew.type === 'place' ){
              const idplace  = parseInt(juste.elementnew.id.slice(1)); 
                reseau.SuppPlace(idplace)
                console.log('reseau.places',reseau.places) ;
            }else{
              const idtrans  = parseInt(juste.elementnew.id.slice(1)); 
              console.log(" idtrans = "+idtrans)
                reseau.SuppTrans(idtrans)
                console.log('reseau.trans',reseau.Transitions) ;
            }
             }else if(juste.elementnew.type2 === 'arc'){
              reseau.AfficherPre();
              let p = juste.elementnew.source[0]
              console.log("p = "+p)
              let t = juste.elementnew.target[0]
              console.log("t = "+t)
              let poid = 0 , type = 0 ;
              if( (p === 'P') && (t === 'T')){
               let  Idplace = parseInt(juste.elementnew.source.slice(1));
               let  Idtrans = parseInt(juste.elementnew.target.slice(1));
              reseau.Pre[Idplace][Idtrans] = {poid,type} ;
              }
              if( (p === 'T') && (t === 'P')){
                let  Idplace = parseInt(juste.elementnew.target.slice(1));
                let  Idtrans = parseInt(juste.elementnew.source.slice(1));
               reseau.Post[Idplace][Idtrans] = {poid,type} ;
               }
              reseau.AfficherPre();
              reactFlowInstance.deleteElements({nodes:[],edges:[juste.elementnew]})
        
             }
             
          }else if(juste.effect === 'delete'){
            let element = juste.elementold 
              dispatch(addElement({type:element.type,element}))
            if(juste.elementold.type === 'place' || juste.elementold.type === 'transition'){
              if(nodes.includes(juste.elementold)){
                console.log('exist')
              }else{
                setNodes((nds) => nds.concat(juste.elementold)) ;
        
                console.log('edgestab out',juste.elementnew)
               setEdges((eds) => eds.concat(juste.elementnew))
              }
              
              
              if(juste.elementold.type === 'place' ){
                console.log('hiiiiiiiiiiiiiiiiii')
                if(parseInt(juste.elementold.data.tokens) >= 1 ){
                  const token = 
                  {id: juste.elementold.data.Idtoken1,type: 'group',
                    style : {borderRadius: '50%' ,width: '8px'  ,height: '8px'  ,
                    backgroundColor : 'black', padding : 0 ,margin : 0,},
                    position: { x: 23, y: 23 },
                    parentNode: juste.elementold.id ,
                    extent: 'parent',
                  }  ; setNodes((nds) => nds.concat(token));
                 }   if(parseInt(juste.elementold.data.tokens) >= 2 ){
                  const token = 
                  {id: juste.elementold.data.Idtoken2,type: 'group',
                    style : {borderRadius: '50%' ,width: '8px'  ,height: '8px'  ,
                    backgroundColor : 'black', padding : 0 ,margin : 0,},
                    position: { x: 10, y: 10 },
                    parentNode: juste.elementold.id ,
                    extent: 'parent',
                  }  ; setNodes((nds) => nds.concat(token));
                 }  if(parseInt(juste.elementold.data.tokens) >= 3 ){
          
                  const token = 
                  {id: juste.elementold.data.Idtoken3,type: 'group',
                    style : {borderRadius: '50%' ,width: '8px'  ,height: '8px'  ,
                    backgroundColor : 'black', padding : 0 ,margin : 0,},
                    position: { x: 36, y: 36 },
                    parentNode: juste.elementold.id ,
                    extent: 'parent',
                  }  ; setNodes((nds) => nds.concat(token));
                 }  if(parseInt(juste.elementold.data.tokens) >= 4 ){
                  const token = 
                  {id: juste.elementold.data.Idtoken4,type: 'group',
                    style : {borderRadius: '50%' ,width: '8px'  ,height: '8px'  ,
                    backgroundColor : 'black', padding : 0 ,margin : 0,},
                    position: { x: 36, y: 10 },
                    parentNode: juste.elementold.id ,
                    extent: 'parent',
                  }  ; setNodes((nds) => nds.concat(token));
                 }  if(parseInt(juste.elementold.data.tokens)>= 5 ){
                  const token = 
                  {id: juste.elementold.data.Idtoken5,type: 'group',
                    style : {borderRadius: '50%' ,width: '8px'  ,height: '8px'  ,
                    backgroundColor : 'black', padding : 0 ,margin : 0,},
                    position: { x: 10, y: 36 },
                    parentNode: juste.elementold.id ,
                    extent: 'parent',
                  }  ; setNodes((nds) => nds.concat(token));
                 }
                   
                 const idplace  = parseInt(juste.elementold.id.slice(1)); 
                 reseau.places[idplace].SetPlacesup(false) 
                 console.log('reseau.places',reseau.places) ;
             }else{
               const idtrans  = parseInt(juste.elementold.id.slice(1)); 
               console.log(" idtrans = "+idtrans)
                 reseau.Transitions[idtrans].SetTranssup(false)
                 console.log('reseau.trans',reseau.Transitions) ;
         
             }
            }else  if(juste.elementold.type2 === 'arc'){
              if(edges.includes(juste.elementold)){
                console.log('exist')
              }else{
                setEdges((eds) => eds.concat(juste.elementold)) ;
                reseau.AfficherPre();
                  let p = juste.elementold.source[0]
                  console.log("p = "+p)
                  let t = juste.elementold.target[0]
                  console.log("t = "+t)
                  let poid = parseInt(juste.elementold.label) ,type ;
                  if(juste.elementold.markerEnd.type === 'arrowclosed'){type = false}else{ type = true } 
                  if( (p === 'P') && (t === 'T')){
                   let  Idplace = parseInt(juste.elementold.source.slice(1));
                   let  Idtrans = parseInt(juste.elementold.target.slice(1));
                  reseau.Pre[Idplace][Idtrans] = {poid,type} ;
                  }
                  if( (p === 'T') && (t === 'P')){
                    let  Idplace = parseInt(juste.elementold.target.slice(1));
                    let  Idtrans = parseInt(juste.elementold.source.slice(1));
                   reseau.Post[Idplace][Idtrans] = {poid,type} ;
                   }
                  reseau.AfficherPre();
        
              } 
            }
            
         }else  if (juste.effect === 'update'){
          let element = juste.elementold ;
          dispatch(updateElement({type:element.type,element}))
            if(juste.elementnew.type === 'place' || juste.elementnew.type === 'transition'){
             // setNodes((nds) => nds.concat(juste.elementold)) ;
              setNodes((nds) => nds.map((n) => (n.id === juste.elementold.id ? juste.elementold : n)));      
        
              if(juste.elementold.type === 'transition'){
                const idtrans  = parseInt(juste.elementold.id.slice(1)); 
                reseau.Transitions[idtrans].SetPoids(parseInt(juste.elementold.data.poid))
                console.log('transs',reseau.Transitions)
              }
          
             }else if(juste.elementnew.type2 === 'arc'){
              //setEdges((eds) => eds.concat(juste.elementold)) ;
              setEdges(edges => {
                return edges.map(edge => {
                  if (edge.id === juste.elementold.id) {
                    return juste.elementold; } else {    return edge;}
                });
              });
              let p = juste.elementold.source[0] ; console.log("p = "+p)
              let t = juste.elementold.target[0] ; console.log("t = "+t)
              let poid = parseInt(juste.elementold.label) ,type ;
              if(juste.elementold.markerEnd.type === 'arrowclosed'){type = false}else{ type = true } 
              if( (p === 'P') && (t === 'T')){
               let  Idplace = parseInt(juste.elementold.source.slice(1));
               let  Idtrans = parseInt(juste.elementold.target.slice(1));
              reseau.Pre[Idplace][Idtrans] = {poid,type} ;
              }
              if( (p === 'T') && (t === 'P')){
                let  Idplace = parseInt(juste.elementold.target.slice(1));
                let  Idtrans = parseInt(juste.elementold.source.slice(1));
               reseau.Post[Idplace][Idtrans] = {poid,type} ;
               }
             }
          }else if (juste.effect === 'addtoken' && juste.elementnew[0].type === 'place'){
            //console
            const idplace  = parseInt(juste.elementold.id.slice(1)); 
            reseau.places[idplace].SetJetons(parseInt(juste.elementold.data.tokens)) 
            console.log('reseau.places',reseau.places) ;
         let element = juste.elementold ;
          dispatch(updateElement({type:element.type,element}))
               if( juste.elementnew[1] !== ''){
                console.log('delete one ')
                reactFlowInstance.deleteElements({nodes:[juste.elementnew[1]],edges:[]})
                setNodes((nds) => nds.map((n) => (n.id === juste.elementold.id ? juste.elementold : n)));      
               }else {
                setNodes((nds) => nds.map((n) => (n.id === juste.elementold.id ? juste.elementold : n)));
                if(juste.elementold.data.tokens == '5'){
                const token = 
                {id: juste.elementold.data.Idtoken1,type: 'group',
                  style : {borderRadius: '50%' ,width: '8px'  ,height: '8px'  ,
                  backgroundColor : 'black', padding : 0 ,margin : 0,},
                  position: { x: 23, y: 23 },
                  parentNode: juste.elementold.id ,
                  extent: 'parent',
                }
                setNodes((nds) => nds.concat(token));
                  const token1 = 
                { id: juste.elementold.data.Idtoken2,type: 'group',
                  style : {borderRadius: '50%' ,width: '8px'  ,height: '8px'  ,
                  backgroundColor : 'black', padding : 0 ,margin : 0,},
                  position: { x: 10, y: 10 },
                  hidden : false ,
                  parentNode: juste.elementold.id ,
                  extent: 'parent',
                }
                setNodes((nds) => nds.concat(token1));
                  const token2 = 
                  {
                    id: juste.elementold.data.Idtoken3,type: 'group',
                    style : {borderRadius: '50%' ,width: '8px'  ,height: '8px'  ,
                    backgroundColor : 'black', padding : 0 ,margin : 0,},
                    position: { x: 36 , y: 36 },
                    hidden : false ,
                    parentNode: juste.elementold.id ,
                    extent: 'parent',
                  }
                  setNodes((nds) => nds.concat(token2));
                  const token3 = 
                {
                  id:juste.elementold.data.Idtoken4,type: 'group',
                  style : {borderRadius: '50%' ,width: '8px'  ,height: '8px'  ,
                  backgroundColor : 'black', padding : 0 ,margin : 0,},
                  position: { x: 36, y: 10 },
                  hidden : false ,
                  parentNode: juste.elementold.id ,
                  extent: 'parent',
                }
                setNodes((nds) => nds.concat(token3));
                  const token4 = 
                {
                  id: juste.elementold.data.Idtoken5,type: 'group',
                  style : {borderRadius: '50%' ,width: '8px'  ,height: '8px'  ,
                  backgroundColor : 'black', padding : 0 ,margin : 0,},
                  position: { x: 10, y: 36 },
                  hidden : false ,
                  parentNode: juste.elementold.id , extent: 'parent',
                }
                setNodes((nds) => nds.concat(token4));
                }             
               }
          }else if(juste.effect === 'deletetoken' && juste.elementnew[0].type === 'place') {
            let element = juste.elementold ;
          dispatch(updateElement({type:element.type,element}))
            const idplace  = parseInt(juste.elementold.id.slice(1)); 
            reseau.places[idplace].SetJetons(parseInt(juste.elementold.data.tokens)) 
            console.log('reseau.places',reseau.places) ;
            setNodes((nds) => nds.map((n) => (n.id === juste.elementold.id ? juste.elementold : n)));
            if( juste.elementnew[1] !== ''){
              console.log('hi')
               if(juste.elementnew[2] == 1 ){
                const token = 
                {id: juste.elementnew[1],type: 'group',
                  style : {borderRadius: '50%' ,width: '8px'  ,height: '8px'  ,
                  backgroundColor : 'black', padding : 0 ,margin : 0,},
                  position: { x: 23, y: 23 },
                  parentNode: juste.elementold.id ,
                  extent: 'parent',
                }  ; setNodes((nds) => nds.concat(token));
               } else  if(juste.elementnew[2] == 2 ){
                const token = 
                {id: juste.elementnew[1],type: 'group',
                  style : {borderRadius: '50%' ,width: '8px'  ,height: '8px'  ,
                  backgroundColor : 'black', padding : 0 ,margin : 0,},
                  position: { x: 10, y: 10 },
                  parentNode: juste.elementold.id ,
                  extent: 'parent',
                }  ; setNodes((nds) => nds.concat(token));
               }else  if(juste.elementnew[2] == 3 ){
        
                const token = 
                {id: juste.elementnew[1],type: 'group',
                  style : {borderRadius: '50%' ,width: '8px'  ,height: '8px'  ,
                  backgroundColor : 'black', padding : 0 ,margin : 0,},
                  position: { x: 36, y: 36 },
                  parentNode: juste.elementold.id ,
                  extent: 'parent',
                }  ; setNodes((nds) => nds.concat(token));
               }else  if(juste.elementnew[2] == 4 ){
                const token = 
                {id: juste.elementnew[1],type: 'group',
                  style : {borderRadius: '50%' ,width: '8px'  ,height: '8px'  ,
                  backgroundColor : 'black', padding : 0 ,margin : 0,},
                  position: { x: 36, y: 10 },
                  parentNode: juste.elementold.id ,
                  extent: 'parent',
                }  ; setNodes((nds) => nds.concat(token));
               }else  if(juste.elementnew[2] == 5 ){
                const token = 
                {id: juste.elementnew[1],type: 'group',
                  style : {borderRadius: '50%' ,width: '8px'  ,height: '8px'  ,
                  backgroundColor : 'black', padding : 0 ,margin : 0,},
                  position: { x: 10, y: 36 },
                  parentNode: juste.elementold.id ,
                  extent: 'parent',
                }  ; setNodes((nds) => nds.concat(token));
               }
            }else if(juste.elementold.data.tokens == 6){
                 const idsToDelete = [juste.elementnew[0].data.Idtoken1,juste.elementnew[0].data.Idtoken2,juste.elementnew[0].data.Idtoken3,juste.elementnew[0].data.Idtoken4,juste.elementnew[0].data.Idtoken5]
                 deleteNodesById(idsToDelete);
                 console.log('idstodelete',idsToDelete)
        
            }
          }
             indexhistory = indexhistory -1 ;
             hislong = history.length ;
        }}
        
        const redo = () => {
          if((indexhistory < history.length - 1) && (starthistory === 1)){;
            indexhistory = indexhistory +1 ;
            //if(indexhistory<history.length  ){indexhistory = indexhistory +1 ;}
            let juste = history[indexhistory] ;  console.log('juste ',juste)
            if(juste.effect === 'add'){
              let element = juste.elementnew 
              dispatch(addElement({type:element.type,element}))
              if(juste.elementnew.type === 'place' || juste.elementnew.type === 'transition'){
                if(nodes.includes(juste.elementnew)){
                  console.log('exist')
                }else{
                  if(juste.elementnew.type === 'place' ){
                    const idplace  = parseInt(juste.elementnew.id.slice(1)); 
                      reseau.places[idplace].SetPlacesup(false) 
                      console.log('reseau.places',reseau.places) ;
                  }else{
                    const idtrans  = parseInt(juste.elementnew.id.slice(1)); 
                    console.log(" idtrans = "+idtrans)
                      reseau.Transitions[idtrans].SetTranssup(false)
                      console.log('reseau.trans',reseau.Transitions) ;
              
                  }
                  setNodes((nds) => nds.concat(juste.elementnew)) ;
                }
              }else  if(juste.elementnew.type2 === 'arc'){
                if(edges.includes(juste.elementnew)){
                  console.log('exist')
                }else{
                  setEdges((eds) => eds.concat(juste.elementnew)) ;
                  reseau.AfficherPre();
                  let p = juste.elementnew.source[0]
                  console.log("p = "+p)
                  let t = juste.elementnew.target[0]
                  console.log("t = "+t)
                  let poid = parseInt(juste.elementnew.label) ,type ;
                  if(juste.elementnew.markerEnd.type === 'arrowclosed'){type = false}else{ type = true } 
                  if( (p === 'P') && (t === 'T')){
                   let  Idplace = parseInt(juste.elementnew.source.slice(1));
                   let  Idtrans = parseInt(juste.elementnew.target.slice(1));
                  reseau.Pre[Idplace][Idtrans] = {poid,type} ;
                  }
                  if( (p === 'T') && (t === 'P')){
                    let  Idplace = parseInt(juste.elementnew.target.slice(1));
                    let  Idtrans = parseInt(juste.elementnew.source.slice(1));
                   reseau.Post[Idplace][Idtrans] = {poid,type} ;
                   }
                  reseau.AfficherPre();
                } 
              }
            }else if(juste.effect === 'paste'){
              let element = juste.elementnew 
                dispatch(addElement({type:element.type,element}))
                if(juste.elementnew.type === 'place' || juste.elementnew.type === 'transition'){
                  if(nodes.includes(juste.elementnew)){
                    console.log('exist')
                  }else{
                    setNodes((nds) => nds.concat(juste.elementnew)) ;
                    if(juste.elementnew.type === 'place' ){
                      const idplace  = parseInt(juste.elementnew.id.slice(1)) , nbtokens = juste.elementnew.data.tokens; 
                        reseau.places[idplace].SetPlacesup(false) 
                        console.log('reseau.places',reseau.places) ;
                        if (nbtokens === '1' || nbtokens === '2' || nbtokens === '3' || nbtokens === '4' || nbtokens === '5'){
                          console.log('nbj = ',nbtokens)
                        const tokena =  {
                          id: juste.elementnew.data.Idtoken1 , type: 'group',
                          style : { borderRadius: '50%' , width: '8px'  ,height: '8px'  ,
                          backgroundColor : 'black', padding : 0 , margin : 0,
                          },
                          position: { x: 23, y: 23 },parentNode: juste.elementnew.id ,extent: 'parent',}
                        setNodes((nds) => nds.concat(tokena));
                      } if (nbtokens === '2' || nbtokens === '3' || nbtokens === '4' || nbtokens === '5') {             
                        const tokenb =  {
                          id: juste.elementnew.data.Idtoken2, type: 'group',
                          style : { borderRadius: '50%' , width: '8px'  ,height: '8px'  ,
                          backgroundColor : 'black', padding : 0 , margin : 0,
                          },
                          position: {x: 10, y: 10 },parentNode: juste.elementnew.id ,extent: 'parent',}
                        setNodes((nds) => nds.concat(tokenb));
                       }if (nbtokens === '3' || nbtokens === '4' || nbtokens === '5'){
                        const tokenc =  {
                          id: juste.elementnew.data.Idtoken3, type: 'group',
                          style : { borderRadius: '50%' , width: '8px'  ,height: '8px'  ,
                          backgroundColor : 'black', padding : 0 , margin : 0,
                          },
                          position: {x: 36, y: 36 },parentNode: juste.elementnew.id ,extent: 'parent',}
                        setNodes((nds) => nds.concat(tokenc));
                       }if (nbtokens === '4' || nbtokens === '5'){
                        const tokend =  {
                          id: juste.elementnew.data.Idtoken4, type: 'group',
                          style : { borderRadius: '50%' , width: '8px'  ,height: '8px'  ,
                          backgroundColor : 'black', padding : 0 , margin : 0,
                          },
                          position: {x: 36, y: 10 },parentNode: juste.elementnew.id ,extent: 'parent',}
                        setNodes((nds) => nds.concat(tokend));                      
                       } if (nbtokens === '5'){
                        const tokene =  {
                          id: juste.elementnew.data.Idtoken5, type: 'group',
                          style : { borderRadius: '50%' , width: '8px'  ,height: '8px'  ,
                          backgroundColor : 'black', padding : 0 , margin : 0,
                          },
                          position: {x: 10, y: 36 },parentNode: juste.elementnew.id ,extent: 'parent',}
                        setNodes((nds) => nds.concat(tokene));                
                       }
                    }else{
                      const idtrans  = parseInt(juste.elementnew.id.slice(1)); 
                      console.log(" idtrans = "+idtrans)
                        reseau.Transitions[idtrans].SetTranssup(false)
                        console.log('reseau.trans',reseau.Transitions) ;
                
                    }
                  }
              
                } 
            }else if(juste.effect === 'delete'){
              let element = juste.elementold ;
              dispatch(deleteElement({type:element.type,element : element }))
              if(juste.elementold.type === 'place' || juste.elementold.type === 'transition'){
               reactFlowInstance.deleteElements({nodes:[juste.elementold],edges:[]})
               if(juste.elementnew.type === 'place' ){
                
                const idplace  = parseInt(juste.elementold.id.slice(1)); 
                  reseau.SuppPlace(idplace)
                  console.log('reseau.places',reseau.places) ;
              }else{
                
                const idtrans  = parseInt(juste.elementold.id.slice(1)); 
                console.log(" idtrans = "+idtrans)
                  reseau.SuppTrans(idtrans)
                  console.log('reseau.trans',reseau.Transitions) ;
              }
              }else if(juste.elementold.type2 === 'arc'){
                
               reactFlowInstance.deleteElements({nodes:[],edges:[juste.elementold]})
               reseau.AfficherPre();
                  let p = juste.elementold.source[0]
                  console.log("p = "+p)
                  let t = juste.elementold.target[0]
                  console.log("t = "+t)
                  let poid = 0,type = 0 ;
                  if( (p === 'P') && (t === 'T')){
                   let  Idplace = parseInt(juste.elementold.source.slice(1));
                   let  Idtrans = parseInt(juste.elementold.target.slice(1));
                  reseau.Pre[Idplace][Idtrans] = {poid,type} ;
                  }
                  if( (p === 'T') && (t === 'P')){
                    let  Idplace = parseInt(juste.elementold.target.slice(1));
                    let  Idtrans = parseInt(juste.elementold.source.slice(1));
                   reseau.Post[Idplace][Idtrans] = {poid,type} ;
                   }
                  reseau.AfficherPre();
        
          
              }
              
           }else if (juste.effect === 'update'){
               let element = juste.elementnew ;
               dispatch(updateElement({type:element.type,element}))
              if(juste.elementnew.type === 'place' || juste.elementnew.type === 'transition'){
               // setNodes((nds) => nds.concat(juste.elementnew)) ;
                setNodes((nds) => nds.map((n) => (n.id === juste.elementnew.id ? juste.elementnew : n)));      
                if(juste.elementnew.type === 'transition'){
                  const idtrans  = parseInt(juste.elementnew.id.slice(1)); 
                  reseau.Transitions[idtrans].SetPoids(parseInt(juste.elementnew.data.poid))
                  console.log('transs',reseau.Transitions)
                }
               }else if(juste.elementnew.type2 === 'arc'){
               // setEdges((eds) => eds.concat(juste.elementnew)) ;
                setEdges(edges => {
                  return edges.map(edge => {
                    if (edge.id === juste.elementnew.id) {
                      return juste.elementnew; } else {    return edge;}
                  });
                });
                let p = juste.elementnew.source[0]
                console.log("p = "+p)
                let t = juste.elementnew.target[0]
                console.log("t = "+t)
                let poid = parseInt(juste.elementnew.label) ,type ;
                if(juste.elementnew.markerEnd.type === 'arrowclosed'){type = false}else{ type = true } 
                if( (p === 'P') && (t === 'T')){
                 let  Idplace = parseInt(juste.elementnew.source.slice(1));
                 let  Idtrans = parseInt(juste.elementnew.target.slice(1));
                reseau.Pre[Idplace][Idtrans] = {poid,type} ;
                }
                if( (p === 'T') && (t === 'P')){
                  let  Idplace = parseInt(juste.elementnew.target.slice(1));
                  let  Idtrans = parseInt(juste.elementnew.source.slice(1));
                 reseau.Post[Idplace][Idtrans] = {poid,type} ;
                 }
               }
            }else if (juste.effect === 'addtoken' && juste.elementnew[0].type === 'place'){
              //dispatch(updateElement({ type: juste.elementnew[0], element: juste.elementnew[0] }));
              let element = juste.elementnew[0];
              dispatch(updateElement({type:element.type,element}))
              const idplace  = parseInt(juste.elementnew[0].id.slice(1)); 
              reseau.places[idplace].SetJetons(parseInt(juste.elementnew[0].data.tokens)) 
              console.log('reseau.places',reseau.places) ;
                 if(juste.elementnew[1] !== ''){
                  //setNodes((nds) => nds.map((n) => (n.id === juste.elementnew[1].id ? juste.elementnew[1] : n)));
                  setNodes((nds) => nds.map((n) => (n.id === juste.elementnew[0].id ? juste.elementnew[0] : n)));
                  setNodes((nds) => nds.concat(juste.elementnew[1])) ;
        
                 }else{
                  setNodes((nds) => nds.map((n) => (n.id === juste.elementnew[0].id ? juste.elementnew[0] : n)));
                  const idsToDelete = [juste.elementnew[0].data.Idtoken1, juste.elementnew[0].data.Idtoken2,juste.elementnew[0].data.Idtoken3,juste.elementnew[0].data.Idtoken4,juste.elementnew[0].data.Idtoken5];
                           console.log(idsToDelete);
                            deleteNodesById(idsToDelete);
        
                 }
            }else if(juste.effect === 'deletetoken' && juste.elementnew[0].type === 'place') {
              //dispatch(updateElement({ type: juste.elementnew, element: juste.elementnew }));
              let element = juste.elementnew[0];
              dispatch(updateElement({type:element.type,element}))
              const idplace  = parseInt(juste.elementnew[0].id.slice(1)); 
              reseau.places[idplace].SetJetons(parseInt(juste.elementnew[0].data.tokens)) 
              console.log('reseau.places',reseau.places) ;
              if(juste.elementnew[1] === ''){
                setNodes((nds) => nds.map((n) => (n.id === juste.elementnew[0].id ? juste.elementnew[0] : n)));
                if(juste.elementnew[0].data.tokens == 6){
                  const idsToDelete = [juste.elementnew[0].data.Idtoken1,juste.elementnew[0].data.Idtoken2,juste.elementnew[0].data.Idtoken3,juste.elementnew[0].data.Idtoken4,juste.elementnew[0].data.Idtoken5]
                  deleteNodesById(idsToDelete); 
                }if(juste.elementnew[0].data.tokens == 5){
                  const token = 
                  {id: juste.elementnew[0].data.Idtoken1,type: 'group',
                    style : {borderRadius: '50%' ,width: '8px'  ,height: '8px'  ,
                    backgroundColor : 'black', padding : 0 ,margin : 0,},
                    position: { x: 23, y: 23 },
                    parentNode: juste.elementold.id ,
                    extent: 'parent',
                  }
                  setNodes((nds) => nds.concat(token));
                    const token1 = 
                  { id: juste.elementnew[0].data.Idtoken2,type: 'group',
                    style : {borderRadius: '50%' ,width: '8px'  ,height: '8px'  ,
                    backgroundColor : 'black', padding : 0 ,margin : 0,},
                    position: { x: 10, y: 10 },
                    hidden : false ,
                    parentNode: juste.elementold.id ,
                    extent: 'parent',
                  }
                  setNodes((nds) => nds.concat(token1));
                    const token2 = 
                    {
                      id: juste.elementnew[0].data.Idtoken3,type: 'group',
                      style : {borderRadius: '50%' ,width: '8px'  ,height: '8px'  ,
                      backgroundColor : 'black', padding : 0 ,margin : 0,},
                      position: { x: 36 , y: 36 },
                      hidden : false ,
                      parentNode: juste.elementold.id ,
                      extent: 'parent',
                    }
                    setNodes((nds) => nds.concat(token2));
                    const token3 = 
                  {
                    id:juste.elementnew[0].data.Idtoken4,type: 'group',
                    style : {borderRadius: '50%' ,width: '8px'  ,height: '8px'  ,
                    backgroundColor : 'black', padding : 0 ,margin : 0,},
                    position: { x: 36, y: 10 },
                    hidden : false ,
                    parentNode: juste.elementold.id ,
                    extent: 'parent',
                  }
                  setNodes((nds) => nds.concat(token3));
                    const token4 = 
                  {
                    id: juste.elementnew[0].data.Idtoken5,type: 'group',
                    style : {borderRadius: '50%' ,width: '8px'  ,height: '8px'  ,
                    backgroundColor : 'black', padding : 0 ,margin : 0,},
                    position: { x: 10, y: 36 },
                    hidden : false ,
                    parentNode: juste.elementold.id , extent: 'parent',
                  }
                  setNodes((nds) => nds.concat(token4));
                }
              }else {
                setNodes((nds) => nds.map((n) => (n.id === juste.elementnew[0].id ? juste.elementnew[0] : n)));
                   let idsToDelete = [juste.elementnew[1]] 
                   deleteNodesById(idsToDelete) 
                  
              }
            }
            
          }
        }
        let tab = [] , arc = [] ;

        const marquageallowed = () => {
          console.log('matrice ');
          let allowed = false ;
        //Nombre de colonnes (longueur d'une ligne)
        for (let k = 0; k < reseau.Pre.length; k++) {
            for (let l = 0; l < reseau.Pre[k].length; l++) {
                // Afficher chaque élément du tableau
                if (reseau.Pre[k][l].poid !== 0 ){
                  allowed = true
                  return allowed ;
                }
            }
        }
        for (let k = 0; k < reseau.Post.length; k++) {
          for (let l = 0; l < reseau.Post[k].length; l++) {
              // Afficher chaque élément du tableau
              if (reseau.Post[k][l].poid !== 0){
                allowed = true
                return allowed ;
              }
          }
        }
        return allowed ;
        }
        

        let can = marquageallowed();

        
/*
        const handlesimulationbystep = (tabstep,tabtrans,l) => {
           
           const toast = {
            isVisible: true,
            context: 'pending',
            title: 'Important !',
           
           msg:'Sauvgarder le réseau avant la simulation pour éviter les incohérences de données'
        }
        dispatch(setToastOpt(toast))
        setTimeout(() => {
            dispatch(setToastOpt({isVisible:false}))
        }, 10000)

        if(k===0)
          {
            const toast2 = {
              isVisible: true,
              context: 'dark',
              title: 'Indice !',
             
             msg:'Vous ne pouvez pas changer le réseau pendant la simulation',
          }
          dispatch(setToastOpt(toast2))
          setTimeout(() => {
              dispatch(setToastOpt({isVisible:false}))
          }, 10000)
          }
          let nbplaces = reseau.NpPlaces 
          console.log('nbplaces ',nbplaces)
        //for(let k= 0 ; k<tabstep.length ; k++){
          console.log('k = ',l)
          console.log('nodes inside hndlsim',nodes)
          console.log('tabtrans en simul ',tabtrans)
          if( l < tabstep.length ){ 
            if( l> 0 ){
           if( tabtrans[l] !== tabtrans[l-1]){
              console.log('prevtrans',prevtrans) ;
            setNodes((prevNodes) => prevNodes.map((n) => (n.id === 'T'+tabtrans[l-1] ? prevtrans : n)));
            let element = prevtrans ;
            dispatch(updateElement({type:element.type,element}))
            let id = 'T'+tabtrans[l] ;
           let trans =  nodes.find(node => node.id === id);
           const newtran = {
            ...trans, 
           // position : position ,
            data: {
            ...trans.data,  classestyle : "centered-label-franchit",}};
            setNodes((prevNodes) => prevNodes.map((n) => (n.id === trans.id ? newtran : n)));
            element = trans ;
            dispatch(updateElement({type:element.type,element}))
            prevtrans = trans ;
          }else{
        
          }}else{ // l = 0 
           let id = 'T'+tabtrans[l] ;
               let trans =  nodes.find(node => node.id === id);
           const newtran = {
            ...trans, 
           // position : position ,
            data: {
            ...trans.data,  classestyle : "centered-label-franchit",}};
            setNodes((prevNodes) => prevNodes.map((n) => (n.id === trans.id ? newtran : n)));
            let element = trans ;
            dispatch(updateElement({type:element.type,element}))
             prevtrans = trans ;
          }
            let id = 'T'+tabtrans[l] ;
           let trans =  nodes.find(node => node.id === id);
           const newtran = {
            ...trans, 
           // position : position ,
            data: {
            ...trans.data,  classestyle : "centered-label-franchit",}};
            setNodes((prevNodes) => prevNodes.map((n) => (n.id === trans.id ? newtran : n)));
            let element = trans ;
            dispatch(updateElement({type:element.type,element}))
           for(let g = 0 ; g < nbplaces ; g++){
            console.log('tabstep[k][g]',tabstep[l][g])
            if(tabstep[l][g] !== -1){
              let idplace = 'P'+g ;
              console.log('idplace ',idplace)
              let node =   nodes.find(node => node.id === idplace);
              console.log('node ',node);
              const idsToDelete = [node.data.Idtoken1, node.data.Idtoken2,node.data.Idtoken3,node.data.Idtoken4,node.data.Idtoken5];
              console.log(idsToDelete);
              deleteNodesById(idsToDelete);
             let element = drawtokens(node,tabstep[l][g].toString()) ;
             reseau.places[g].SetJetons(tabstep[l][g]) ;
              console.log('reseau.places',reseau.places)
             console.log('element',element) 
            // setNodes((nds) =>
               // nodes.map((node) => (node.id === element.id ? { ...node, data: { ...node.data, tokens: element.data.tokens , Idtoken1 :element.data.Idtoken1 , Idtoken2 :element.data.Idtoken2 , Idtoken3 :element.data.Idtoken3, Idtoken4 :element.data.Idtoken4 , Idtoken5 :element.data.Idtoken5} } : node))
             // );
            // const updatedNodes = nodes.map((node) =>
              //node.id === id  ? { ...node, data: { ...node.data, tokens: element.data.tokens , Idtoken1 :element.data.Idtoken1 , Idtoken2 :element.data.Idtoken2 , Idtoken3 :element.data.Idtoken3, Idtoken4 :element.data.Idtoken4 , Idtoken5 :element.data.Idtoken5} } : node
            //);
            //setNodes(updatedNodes);
            //setNodes((nodes) => nodes.map((n) =>(n.id === node.id ? element : n)));
            setNodes((prevNodes) => prevNodes.map((n) => (n.id === node.id ? element : n)));
           
        
        //     setNodes((nds) => nds.concat(element));
         
           // setNodes((nodes) => [...nodes, element]);
            console.log('nodes',nodes)
            }
           }
          // setNodes((prevNodes) => prevNodes.map((n) => (n.id === newtran.id ? trans : n)));
        
          k = incrementk(k) ;
        //}
          }else{
            // console.log('prevtrans',prevtrans) ;
            //setNodes((prevNodes) => prevNodes.map((n) => (n.id === 'T'+tabtrans[l-1] ? prevtrans : n)));
            //element = prevtrans;
            //dispatch(updateElement({type:element.type,element}))
          }
        }
        */
        const button = document.getElementById("monBouton");
        
const handlesimulationbystep = (tabstep,tabtrans,l) => {

  if(tabstep.length===0 ) {
  /*  const toast = {
      isVisible: true,
      context: 'pending',
      title: 'Important !',
     
     msg:'Sauvgarder le réseau avant la simulation pour éviter les incohérences de données'
  }
  dispatch(setToastOpt(toast))
  setTimeout(() => {
      dispatch(setToastOpt({isVisible:false}))
  }, 10000)*/
  }
  let nbplaces = reseau.NpPlaces 
  console.log('nbplaces ',nbplaces)
//for(let k= 0 ; k<tabstep.length ; k++){
  console.log('k = ',l)
  console.log('nodes inside hndlsim',nodes)
  console.log('tabtrans en simul ',tabtrans)
  if( l < tabstep.length ){ 
    if( l> 0 ){
   if( tabtrans[l] !== tabtrans[l-1]){
      console.log('prevtrans',prevtrans) ;
    setNodes((prevNodes) => prevNodes.map((n) => (n.id === 'T'+tabtrans[l-1] ? prevtrans : n)));
    let id = 'T'+tabtrans[l] ;
   let trans =  nodes.find(node => node.id === id);
   const newtran = {
    ...trans, 
   // position : position ,
    data: {
    ...trans.data,  classestyle : "centered-label-franchit",}};
    setNodes((prevNodes) => prevNodes.map((n) => (n.id === trans.id ? newtran : n)));
    prevtrans = trans ;
  }else{

  }}else{
   let id = 'T'+tabtrans[l] ;
       let trans =  nodes.find(node => node.id === id);
   const newtran = {
    ...trans, 
   // position : position ,
    data: {
    ...trans.data,  classestyle : "centered-label-franchit",}};
    setNodes((prevNodes) => prevNodes.map((n) => (n.id === trans.id ? newtran : n)));
     prevtrans = trans ;
  }
    /*let id = 'T'+tabtrans[l] ;
   let trans =  nodes.find(node => node.id === id);
   const newtran = {
    ...trans, 
   // position : position ,
    data: {
    ...trans.data,  classestyle : "centered-label-franchit",}};
    setNodes((prevNodes) => prevNodes.map((n) => (n.id === trans.id ? newtran : n)));*/

   for(let g = 0 ; g < nbplaces ; g++){
    console.log('tabstep[k][g]',tabstep[l][g])
    if(tabstep[l][g] !== -1){
      let idplace = 'P'+g ;
      console.log('idplace ',idplace)
      let node =   nodes.find(node => node.id === idplace);
      console.log('node ',node);
      const idsToDelete = [node.data.Idtoken1, node.data.Idtoken2,node.data.Idtoken3,node.data.Idtoken4,node.data.Idtoken5];
      console.log(idsToDelete);
      deleteNodesById(idsToDelete);
     let element = drawtokens(node,tabstep[l][g].toString()) ;
     reseau.places[g].SetJetons(tabstep[l][g]) ;
      console.log('reseau.places',reseau.places)
     console.log('element',element) 
    // setNodes((nds) =>
       // nodes.map((node) => (node.id === element.id ? { ...node, data: { ...node.data, tokens: element.data.tokens , Idtoken1 :element.data.Idtoken1 , Idtoken2 :element.data.Idtoken2 , Idtoken3 :element.data.Idtoken3, Idtoken4 :element.data.Idtoken4 , Idtoken5 :element.data.Idtoken5} } : node))
     // );
   /*  const updatedNodes = nodes.map((node) =>
      node.id === id  ? { ...node, data: { ...node.data, tokens: element.data.tokens , Idtoken1 :element.data.Idtoken1 , Idtoken2 :element.data.Idtoken2 , Idtoken3 :element.data.Idtoken3, Idtoken4 :element.data.Idtoken4 , Idtoken5 :element.data.Idtoken5} } : node
    );
    setNodes(updatedNodes);*/
    //setNodes((nodes) => nodes.map((n) =>(n.id === node.id ? element : n)));
    setNodes((prevNodes) => prevNodes.map((n) => (n.id === node.id ? element : n)));
    dispatch(updateElement({type:element.type,element}))

//     setNodes((nds) => nds.concat(element));
 
   // setNodes((nodes) => [...nodes, element]);
    console.log('nodes',nodes)
    }
   }
  // setNodes((prevNodes) => prevNodes.map((n) => (n.id === newtran.id ? trans : n)));

  k = incrementk(k) ;
//}
  }else{
    //console.log('prevtrans',prevtrans) ;
   // setNodes((prevNodes) => prevNodes.map((n) => (n.id === 'T'+tabtrans[l-1] ? prevtrans : n)));
  }
}
      /*  const handlesimulation = (tabstep) =>{
          while( k<tabstep.length ){
            handlesimulationbystep(tabstep,k)
            /*useRef(() => {
              if (nodes.length > 0) {
                console.log('Updated nodes:', nodes);
              }
            },[nodes]);*/
            //console.log('a real step');
          //}
          /*useEffect(() => {
            while (k < tabstep.length) {
              handlesimulationbystep(tabstep, k);
              if (nodes.length > 0) {
                console.log('Updated nodes:', nodes);
              }
              console.log('a real step');
              k++;
            }
          }, [tabstep]);*/
        
        //}

   
        
        let timeoutId ; 
        const pause = () => {
        
          pauseRequested = !pauseRequested;
          const toast2 = {
            isVisible: true,
            context: 'dark',
            title: 'Indice !',
           
           msg:'Vous ne pouvez pas changer le réseau ',
        }
        dispatch(setToastOpt(toast2))
        setTimeout(() => {
            dispatch(setToastOpt({isVisible:false}))
        }, 10000)
        };

       
async function faireUneIteration(l, maxIterations, tabstep){
  if (l < maxIterations) {
    console.log('pause in faire Iter = ', pauseRequested);
    if (!pauseRequested) {
      //await new Promise(resolve => setTimeout(resolve, 1500)); // Attendre 1.5 secondes
    console.log('tabtrans[',l,'] in faire ',tabtrans[l])
      button.click();
     // console.log('tabtrans[k-1]',tabtrans[k-1]);console.log('pravtrans inside faire ',prevtrans)
      //setNodes((prevNodes) => prevNodes.map((n) => (n.id === tabtrans[k-1] ? prevtrans : n)));
      let id = 'T'+tabtrans[l] ;
      let trans =  nodes.find(node => node.id === id);
      if(trans.data.mode === 'imediate'){
      await new Promise(resolve => {
        timeoutId = setTimeout(resolve, 1500); // Attendre 1.5 secondes
    });}else{
      let temps = 2 * (1 / parseInt(trans.data.poid));
      console.log('temps ',temps)
      await new Promise(resolve => {
        timeoutId = setTimeout(resolve, 1500 * (1+temps)); // Attendre 1.5 secondes
    }); 
    }
      console.log('nodes inside faire Iteration ', nodes);
      console.log("Iteration " + l);
      lastIteration = l; // Met à jour lastIteration avec l'itération actuelle
      return faireUneIteration(l + 1, maxIterations, tabstep); // Appel récursif avec les mêmes paramètres
    } else {
      ///// !!!!!!!!!!!!!!!!!!! important : afficher une erreur quand le nombre des appels dans pause depasse un certain nombre 
      //await new Promise(resolve => setTimeout(resolve, 1500)); // Attendre 1.5 secondes
      await new Promise(resolve => {
            timeoutId = setTimeout(resolve, 1500); // Attendre 1.5 secondes
        });
      return faireUneIteration(lastIteration, maxIterations, tabstep); // Reprendre à partir de la dernière itération où p était égal à 0
    }
  } else {
    console.log('prevtrans',prevtrans) ;
    prevtrans = nodes.find(node => node.id === 'T'+tabtrans[l-1] )
    setNodes((prevNodes) => prevNodes.map((n) => (n.id === 'T'+tabtrans[l-1] ? prevtrans : n)));
    return 0;
  }
}


        
          const handlesimulation = (tabstep) => {
          let k = 0;
          if(tabstep.length===0 || k!=0) {
           /* const toast = {
              isVisible: true,
              context: 'pending',
              title: 'Important !',
             
             msg:'Sauvgarder le réseau avant la simulation pour éviter les incohérences de données'
          }
          dispatch(setToastOpt(toast))
          setTimeout(() => {
              dispatch(setToastOpt({isVisible:false}))
          }, 10000)*/
          }
          
        else{
          //cmnt you can not change
          faireUneIteration( k,tabstep.length, tabstep);
        /*  const toast = {
            isVisible: true,
            context: 'dark',
            title: 'Indice !',
           
            msg:'Appuyez sur Réinitialiser pour changer de réseau '
        }
        dispatch(setToastOpt(toast))
        setTimeout(() => {
            dispatch(setToastOpt({isVisible:false}))
        }, 10000)*/
        }

        }


        const handleReInitialiserReseau  = () =>{

          //let placesinit = nodes.filter(node => node.type === 'place')
         // let nbplaces = ;
         // prevtrans = {} ;
         //console.log('placeinit',placesinit)
         if(marquageInit.length !== 0 ){
          for(let g = 0 ; g < marquageInit.length ; g++){
        
            if(marquageInit[g] !== -1 ){
              let idplace = 'P'+g ;
              console.log('idplace ',idplace)
              let node =   nodes.find(node => node.id === idplace);
              console.log('node ',node);
              const idsToDelete = [node.data.Idtoken1, node.data.Idtoken2,node.data.Idtoken3,node.data.Idtoken4,node.data.Idtoken5];
              console.log(idsToDelete);
              deleteNodesById(idsToDelete);
             let element = drawtokens(node, marquageInit[g].toString()) ;
             reseau.places[g].SetJetons(marquageInit[g]) ;
              console.log('reseau.places',reseau.places)
             console.log('element',element) 
            setNodes((prevNodes) => prevNodes.map((n) => (n.id === node.id ? element : n)));
            dispatch(updateElement({type:element.type,element}))
            console.log('nodes',nodes)
            }
           }}
           //setNodes((prevNodes) => prevNodes.map((n) => (n.id === 'T'+tabtrans[l-1] ? prevtrans : n)));
           for (let i = 0; i < nodes.length; i++) {
            // Vérifier si l'ID correspond
            if (nodes[i].type === 'transition') {
                // Mettre à jour le champ 'style'
                 let trans =  nodes[i];
           const newtran = {
            ...trans, 
           // position : position ,
            data: {
            ...trans.data,  classestyle : "centered-label",}};
            setNodes((prevNodes) => prevNodes.map((n) => (n.id === trans.id ? newtran : n)));
            
            }
        }
        }
        console.log(' marquageInit outside', marquageInit)

        const handlesavegraph = () => {
          k = 0 ; pauseRequested = false
          lastIteration = 0 ;
          let can = marquageallowed();
          let tab = [] ;
          let arc = [] ;
          let tab1 = [] ;  let arc1 = [] ;
        if( can === true ){
          let marquageInitiale = reseau.getmarqini() ;
          console.log('marquage initiale ')
          console.log(marquageInitiale)
         
          reseau.ConstrGraphmarq(marquageInitiale,0,tab,arc)
          console.log(' le tableau ')
          console.log(tab)
          console.log(' le tableau arc  ')
          console.log(arc)
          localStorage.setItem('listArc',JSON.stringify(arc))
          localStorage.setItem('listMarquage',JSON.stringify(tab))
           reseau.ConstrGraphmarqre(tab,arc,tab1,arc1) ;
           console.log(' le tableau reduit ')
           console.log(tab1)
           console.log(' le tableau arc  reduit')
           console.log(arc1)
           localStorage.setItem('listArcreduit',JSON.stringify(arc1))
           localStorage.setItem('listMarquagereduit',JSON.stringify(tab1))
           marquageInit = reseau.getmarqini() ;
          console.log('avant simul')
          
          tabstep = reseau.simulation(tab,arc,marquageInit,tabtrans)
          console.log('tabstep outside',tabstep)
          console.log('tabtrans',tabtrans)
        }
        
        }         



return (

  
  
    <> 
     <Errors opt={toastOpt} />
   
  
  <div  className='container '>
       <div className='inner-container'> 
    
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
      <div className="col-span-main">
    
      <MainToolbar onSaveCanvas={onSaveCanvas}  DeleteAllCanvas={DeleteAllCanvas} handleLoadGraph= {handleLoadGraph} handleSaveGraph={handleSaveGraph} undo={undo} redo={redo} handlesavegraph={handlesavegraph} handlesimulationbystep={() => handlesimulationbystep(tabstep,tabtrans, k)}  handlesimulation={() => handlesimulation(tabtrans)} handleReInitialiserReseau ={handleReInitialiserReseau} pause={pause}/>
          <ReactFlowProvider>
         
              <div id="reactFlowBackground"  style={{ height:(window.innerHeight-20-( reactFlowWrapper.current ? reactFlowWrapper.current.getBoundingClientRect().top : 0))}} ref={reactFlowWrapper}>
             

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
                     
                      onNodeContextMenu={handleNodeContextMenu}
                      onContextMenu={handleContextMenu}
                     

                      
                  >
                      <MiniMap zoomable pannable className='hidden md:block' />
                      <Controls   />
                      <Background />
                  </ReactFlow>
                  {showContextMenu && (
          <div className='copypaste' style={{ position: 'absolute', top: contextMenuPosition.y, left: contextMenuPosition.x }}>
              <div className='listcp1' onClick={copy}>Copier</div>
              <div className='listcp2' onClick={paste}><br/>Coller</div>
          </div>
        )}
              </div>
          </ReactFlowProvider   >


      </div>
  </div>
  </div>
  </div>
  
  
  </>

  
)





  
}


 