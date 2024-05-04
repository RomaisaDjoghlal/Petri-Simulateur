import React,{useState,useRef,useMemo,memo,} from 'react'
import ReactFlow, {MiniMap,addEdge, BezierEdge,Controls, useReactFlow ,Background ,useNodesState, useEdgesState, ReactFlowProvider, MarkerType } from 'reactflow';
//import { CircleEdge } from './Components/CircleEdge.tsx'
import { CustomEdge} from './CustomEdgeLabel.tsx'

//import  from 'react-flow/edge-path';


let idarc = 0;// node
const getIdarc = () => {
  const newIdarc = idarc++ ;
  return `L${newIdarc}`;
}
export const GraphMarquage = () => { 
let choix = 0;
let  listarc ; let  listMarquage ; let tabsaut , listMarquagesaut ;
if(choix === 1){
const arcString = localStorage.getItem('listArc');
console.log(arcString);
 listarc = JSON.parse(arcString);
const preString = localStorage.getItem('listMarquage');
  listMarquage = JSON.parse(preString);
  listMarquagesaut = 0 ;
}else{
const arcString = localStorage.getItem('listArcreduit');
console.log(arcString);
  listarc = JSON.parse(arcString);
const preString = localStorage.getItem('listMarquagereduit');
//const preString = localStorage.getItem('listMarquage');
 listMarquage = JSON.parse(preString);
 const presautString = localStorage.getItem('listMarquage');
 listMarquagesaut = JSON.parse(presautString);

}

console.log('listmarquage',listMarquage);
console.log('listarc',listarc);
//console.log('listarc.j1',listarc.length);
//console.log(listMarquage[0].mar)
/*
const MemoizedarcNode = memo(CircleEdge);


const edgeTypes = useMemo(
() => ({
  CircleEdge : MemoizedarcNode 
}),
[]
);*/
const edgeTypes = useMemo(() => ({
  //CircleEdge: CircleEdge,
  CustomEdge : CustomEdge 
}), []);
/*
const tabString = localStorage.getItem('longeur');
let  longeur = JSON.parse(tabString);
console.log('a = ',longeur) */
let initialedges = [];
let initialNodes = [];
if(listMarquage !== null){
let long = listMarquage.length ;
console.log('longeur',long)

const tabniveau = () =>{
  let l = 0 ;
  let tabniv = [] ;
  tabniv[0] = 0 ;
  let k = 0;
 while( k < long ) {
  console.log("k = ",k)
  if(listMarquage[k] !== -1){
      if (listMarquage[k].lv === l){
         tabniv[l] = tabniv[l] + 1 ;    
         k++;     
      }else{
         l ++ ;
         tabniv[l] = 0 ;
      }
  }else{ k ++ }
}
  return tabniv ;
}
const tabniveausaut = () =>{
  let l = 0 ;
  let tabnivsaut = [] ;
  tabnivsaut [0] = 0 ;
  
  let k = 0;
  if(listMarquagesaut !== 0){
   
 while( k < long ) {
  console.log("k = ",k)
  if(listMarquagesaut[k] !== -1){
      if (listMarquagesaut[k].lv === l){
        tabnivsaut [l] = tabnivsaut [l] + 1 ;    
         k++;     
      }else{
         l ++ ;
         tabnivsaut [l] = 0 ;
      }
  }else{ k ++ }
}
  }else{   tabnivsaut = 0 ;}
  return tabnivsaut  ;
}
const tabniv = tabniveau()
const tabnivsaut  = tabniveausaut();
console.log('tabnivsaut = ',tabnivsaut)
let maxniveau = tabniv.length;
console.log(tabniv)
let id = 0;// node
const getId = () => {
  const newId = id++ ;
  return `${newId}`;
}


let k = 0 ;
//const s = listMarquage[0].mar.length
const plusGrand = Math.max(...tabniv);
console.log("grand ",plusGrand)
for (let j = 0; j <  tabniv.length ; j++) {
  console.log('tabniv[',j,']',tabniv[j])
  if (tabniv[j] > 0 ){ 
  for (let i = 0; i < tabniv[j]; i++) {
    console.log('k !!!!!!!!!!!!!!!!!=',k)
   // if (listMarquage[k] !== -1 ){
      
    //console.log('listMarquage[0].mar[0]',listMarquage[0].mar[0])
    let marquage = '[' ;
    let s = listMarquage[k].mar.length ;
    for(let g = 0 ; g < s ;  g++){
    let ch1 = listMarquage[k].mar[g].toString();
      marquage = marquage.concat(ch1) ; marquage = marquage.concat(',')
    }
    marquage = marquage.slice(0,-1) ; marquage = marquage.concat(']')
    console.log('marquage',marquage)
    let f = 70*j+70 ;    
    let g = 150*i-75*(j+s)+640
    if ( j === 0 ){ g = 200*i-40*(plusGrand/2)+350+50*s}
    if(k === 0){
      initialNodes.push(    {id: getId() , position: { x: g, y: f }, data: { label: marquage} ,style : { width: 16*s+20,height: 35 ,backgroundColor: ' #0fa9a6' ,  borderRadius: '5px',
    }}) ;
    }else{
       initialNodes.push(    {id: getId() , position: { x: g, y: f }, data: { label: marquage} ,style : { width: 16*s+20,height: 35 ,backgroundColor: ' #f0fdfb' ,  borderRadius: '5px',
    //  sourcePosition: Position.Right,
    //targetPosition: Position.Left,
      } } )}
       console.log('k = ',k)
       console.log('i = ',i)
       console.log('j = ',j)
    //}else{}
    k++ ; 
    if(tabnivsaut !== 0){ 
    }
     
  }}else{ 
    if(tabnivsaut !== 0){
      k = k + tabnivsaut[j] ;
      console.log('tabnivsaut[',j,']',tabnivsaut[j])
      for(let f=0 ; f< tabnivsaut[j] ; f++ ){ 
      getId() ;  }
    }
    }
}


for (let j = 0 ; j < listarc.length ; j++) {
  let g = listarc[j].ji; // Utilisez listarc[j] au lieu de listarc[0]
  let f = listarc[j].jf; // Utilisez listarc[j] au lieu de listarc[0]
  let h = listarc[j].j1 ; // la trans franchit
  let p = listarc[j].propa ; // la proba de franchissement 
  p = p.toFixed(2);
  console.log('p = ',p);
  let searchelement = initialedges.find(element => element.source === g.toString() && element.target === f.toString()) ;
  console.log('searchelement',searchelement);
  if(searchelement === undefined){
  let trans = 'T'
  trans = trans.concat(h.toString()) ; trans = trans.concat('|')
  trans = trans.concat(p.toString());
  console.log('trans',trans)
  let labelX = initialNodes.find(element => element.id === f.toString()).position.x //- 340;
  let  labelY = initialNodes.find(element => element.id === f.toString()).position.y //- 170; 
  console.log('labelbefor',initialNodes.find(element => element.id === f.toString())) ;

  initialedges.push({
    id: getIdarc(),
    data: {
      label: trans,
    },
    markerEnd: {type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: '#118C7E', 
     },
    label: trans , // Utilisez listarc[j] au lieu de listarc[0]
    source: g.toString(),
    target: f.toString(),
    //type : 'CustomEdge',
    type : 'straight',
    //labelStyle: { fontSize: '12px', fontWeight: 'bold', color: 'red', position: 'relative', left: '100%' , },
    /*labelStyle: { 
      fontSize: '12px', 
      fontWeight: 'bold', 
      backgroundColor: 'transparent' ,
      color: 'red', 
      position: 'absolute', 
      left: '100%',  // Adjust this value to position the label horizontally
      top: '50%',    // Adjust this value to position the label vertically
      transform: 'translate(-0%, -0%)' // Adjust this value to fine-tune the label position
    },*/
    labelStyle: { 
      fontSize: '12px', 
      fontWeight: 'bold', 
      backgroundColor: 'transparent' ,
      color: 'red', 
      position: 'absolute', 
      //transform: `translate(${labelX}px, ${labelY}px)`,
     // left: `${initialNodes.find(element => element.id === f.toString()).position.x}px`,  // Set label's X position
      //top: `${ initialNodes.find(element => element.id === f.toString()).position.y}px`,    // Set label's Y position
    }, 
  

   
   // transform:{`translate(-50%, 0%) translate(${sourceX}px,${sourceY}px)`}  ,                  
                                                 
  });
 // initialedges[j].transform = `translate(-240%, -40%) translate(${initialedges[j].position+100}px,${initialedges[j].position+10}px)` ;
}else{
    const index = initialedges.indexOf(searchelement);
    let trans = searchelement.label ; trans = trans.concat(';T')
    trans = trans.concat(h.toString()) ; trans = trans.concat('|')
    trans = trans.concat(p.toString()); 
    console.log('trans 2',trans)
     if( index !== -1 ){
         initialedges[index].label = trans ; 
         initialedges[index].data.label = trans ; 
     }else{console.log('element n existe pas ')}
  }
  console.log('g = ',g.toString())
  console.log('f = ',f.toString())

}/*
const customArrowHead = {
  markerWidth: 10,
  markerHeight: 10,
  path: `M 0,0 L 10,5 L 0,10 z`, // Change the path to create a circle
};*/
/*
if(initialNodes.length == 1 && initialedges.length == 1 ){
  let element = initialedges[0] ;
  initialedges[0] = {
    id: getIdarc(),
    label: element.label , // Utilisez listarc[j] au lieu de listarc[0]
    source: element.source,
    target: element.target,
    type: 'CircleEdge',
    //type :'step',
    /*
    curveStyle: {
      fill: 'none',
      stroke: 'black',
      strokeWidth: 2,
      strokeLinecap: 'round',
    },
    animated: true,
    sourceX: initialNodes[0].position.x,
    sourceY: initialNodes[0].position.x,
    targetX: initialNodes[0].position.y,
    targetY: initialNodes[0].position.y,*/
   /* curve: 'arc', // This will create a circular arc
  arc: {
    radius: 100, // Adjust the radius to your liking
  },
  path: {
    sourceX: 250,
    sourceY: 50,
    targetX: 250,
    targetY: 50,
    curvature: 0.5,
  },
    markerEnd: {type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: '#118C7E' },
    
                          
  }

  
}*/
}
console.log('initialnodes',initialNodes)
console.log('initialedges',initialedges)
/*const initialNodes = [
    {id: '0', position: { x: 0, y: 0 }, data: { label: listMarquage[0].mar} }
];*/
const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialedges)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
/*
//let i1 = getId1() ;
      const element = {
          id:1 ,
          data: { label: 'N1' },
      }
      setNodes((nds) => nds.concat(element))
  */ 
      return (
      
        <ReactFlowProvider>
        <div style={{width: '100%', height: '100vh', position: 'relative' , left: '240px'  }}>
        <h1>Graph Des Marquage </h1>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            snapToGrid={true}
            edgeTypes={edgeTypes}
          >
            <Controls />
         <MiniMap />
        <Background/>
      </ReactFlow>
      
        </div>
        </ReactFlowProvider>
      );
    
    }