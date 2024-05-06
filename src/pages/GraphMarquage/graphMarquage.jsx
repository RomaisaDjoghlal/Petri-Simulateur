import React,{useCallback,useState,useRef,useMemo,memo,} from 'react'
import ReactFlow, {MiniMap,addEdge, BezierEdge,Controls, useReactFlow ,Background ,useNodesState, useEdgesState, ReactFlowProvider, MarkerType } from 'reactflow';
//import { CircleEdge } from './Components/CircleEdge.tsx'
import { CustomEdge} from './CustomEdge.tsx'
import './Graphmenu.css'
//import  from 'react-flow/edge-path';




export const GraphMarquage = ({ choix }) => { 
  let idarc = 0;// node
const getIdarc = () => {
  const newIdarc = idarc++ ;
  return `L${newIdarc}`;
}
  let id = 0;// node
  const getId = () => {
    const newId = id++ ;
    return `${newId}`;
  }
let  listarc ; let  listMarquage ; let  listMarquagesaut ;
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
    while( listMarquage[k] === -1 ){
      k++ ; getId()
    }
      
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
    if(listMarquage[k].tempo){
    if(k === 0){
      initialNodes.push(    {id: getId() , position: { x: g, y: f }, data: { label: marquage} ,style : { width: 16*s+20,height: 35 ,backgroundColor: ' #0fa9a6' ,  borderRadius: '5px', border: '3px solid #555'  }}) ;
    }else{
       initialNodes.push(    {id: getId() , position: { x: g, y: f }, data: { label: marquage} ,style : { width: 16*s+20,height: 35 ,backgroundColor: ' #f0fdfb' ,  borderRadius: '5px', border: '3px solid #555'   } } )}
    }else{
      if(k === 0){
        initialNodes.push(    {id: getId() , position: { x: g, y: f }, data: { label: marquage} ,style : { width: 16*s+20,height: 35 ,backgroundColor: ' #0fa9a6' ,  borderRadius: '5px'  }}) ;
      }else{
         initialNodes.push(    {id: getId() , position: { x: g, y: f }, data: { label: marquage} ,style : { width: 16*s+20,height: 35 ,backgroundColor: ' #f0fdfb' ,  borderRadius: '5px'} } )}
    }    
       console.log('k = ',k)
       console.log('i = ',i)
       console.log('j = ',j)
    //}else{}
    k++ ; 
    
     
  }}else{ 
    if(tabnivsaut !== 0){
      k = k + tabnivsaut[j] ;
      console.log('tabnivsaut[',j,']',tabnivsaut[j])
      for(let f=0 ; f< tabnivsaut[j] ; f++ ){ 
      getId() ;  }
    }
    }
}
let s = -1 ;

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
    s ++ ;
  let trans = 'T'
  trans = trans.concat(h.toString()) ; trans = trans.concat('|')
  trans = trans.concat(p.toString());
  console.log('trans',trans)
  let labelX =  10//initialNodes.find(element => element.id === f.toString()).position.x - 380;
  let labelY = 10//initialNodes.find(element => element.id === f.toString()).position.y - 140; 
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
     markerEndPosition : {
      x : 0,
      y:0 ,
     },
    label: trans , // Utilisez listarc[j] au lieu de listarc[0]
    source: g.toString(),
    target: f.toString(),
    //type : 'CustomEdge',
    //type : 'bezier',
    type:'straight',
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
      fill: 'gray' ,
      position: 'absolute', 

      transform:'' //`translate(${markerEndPosition.x}px, ${markerEndPosition.y}px)`,
     // left: `${initialNodes.find(element => element.id === f.toString()).position.x}px`,  // Set label's X position
      //top: `${ initialNodes.find(element => element.id === f.toString()).position.y}px`,    // Set label's Y position
    }, 
    style: {
              stroke: '' } ,
   
   // transform:{`translate(-50%, 0%) translate(${sourceX}px,${sourceY}px)`}  ,                  
                                                 
  });
 // initialedges[j].transform = `translate(-240%, -40%) translate(${initialedges[j].position+100}px,${initialedges[j].position+10}px)` ;
}else{
    const index = initialedges.indexOf(searchelement);
    let trans = searchelement.label ; trans = trans.concat('_T')
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
   //initialedges[s].labelStyle.transform =  `translate(${initialedges[s].markerEndPosition.x}px, ${initialedges[s].markerEndPosition.y}px)` 
}/*
const customArrowHead = {
  markerWidth: 10,
  markerHeight: 10,
  path: `M 0,0 L 10,5 L 0,10 z`, // Change the path to create a circle
};*/

if(initialNodes.length == 1 && initialedges.length == 1 ){
  let element = initialedges[0] ; let proba = 0 , label  ;
  let trans = ''
  for(let i = 0 ; i< listarc.length ;i++ ){
    let h = listarc[i].j1 ; // la trans franchit
  let p = listarc[i].propa 
    if( proba < 1){
    proba = listarc[i].propa + proba ; trans = trans.concat('_T')
    trans = trans.concat(h.toString()) ; trans = trans.concat('|')
    trans = trans.concat(p.toString()) ; 
    
  }
    else { break }
  }
 // listarc.slice(i);
 // let label = element.label 
  initialedges[0] = {
    id: getIdarc(),
    label: trans, // Utilisez listarc[j] au lieu de listarc[0]
    source: element.source,
    target: element.target,
   // type: 'CircleEdge',
    type : 'CustomEdge',
    //type :'step',
    //type: 'bezier',
    
    data: {
      label: trans,
    },
    markerEnd: {type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: '#118C7E' },                          
  } 
}
}

for( let i = 0 ; i< initialedges.length ; i++ ){
  let element = initialedges[i]
  let source = element.source , target = element.target , id = element.id ; ;
  for( let j = i+1 ; j< initialedges.length ; j++ ){
    let element2 = initialedges[j]
       if (element2.id !== id ){
        if(target === element2.source && source === element2.target ){
          element2.labelStyle.fill = 'gray' 
          element.labelStyle.fill = '#0eac8d'
          let space ='' 
        //  let trans = element2.label.concat(';'+element.label)   
        let trans = element.label//.concat('___________________________');
        for(let g = 0 ; g< element2.label.length ; g++ ){
          trans = trans.concat('___')
        }
        let trans2 = space.concat(element2.label);

          element2.label = trans2 
          element2.style.stroke = 'gray'
          element.style.stroke = '#0eac8d' 
          element.label =trans;
          initialedges[j] = element2 ;
          initialedges[i] = element ;
          
          
          //initialedges[j].label = <CustomLabel element={element} element2={element2} />;
          //initialedges[i].label = '';
     }
   }
  }
}

 let g = getId() , f = getId() ;
  initialNodes.push(    {id: g , position: { x: 930, y: 10 }, data: { label: 'marquage initiale'} ,style : { width: 160,height: 35 ,backgroundColor: ' #0fa9a6' ,  borderRadius: '5px'  }}) ;
  initialNodes.push(    {id: f , position: { x: 930, y: 110 }, data: { label: 'marquage accessible'} ,style : { width: 160,height: 35 ,backgroundColor: ' #f0fdfb' ,  borderRadius: '5px'} } );
  initialNodes.push(    {id: getId() , position: { x: 930, y: 160}, data: { label: 'marquage tangible'} ,style : { width: 160,height: 35 ,backgroundColor: ' #f0fdfb' ,  borderRadius: '5px', border: '3px solid #555'   } } )
  initialedges.push(    { id: getIdarc(),
    data: {
      label: 'transition Ti | sa probabilite ',
    },
    markerEnd: {type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: '#118C7E', 
     },
    label: 'transition Ti | sa probabilite ' , // Utilisez listarc[j] au lieu de listarc[0]
    source: g.toString(),
    target: f.toString(),
    //type : 'bezier',
    type:'straight',
    labelStyle: { 
      fontSize: '12px', 
      fontWeight: 'bold', 
      backgroundColor: 'transparent' ,
      color: 'red', 
      fill: 'gray' ,
      position: 'absolute', 
    }, 
    style: {
              stroke: '' } ,})

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
  onNodesChange = useCallback((e,node) => {
    let searchelement = edges.find(element => element.target === node.id ) ;
    let labelX = node.position.x , labelY = node.position.y ;
    searchelement.labelStyle.transform = `translate(${labelX}px, ${labelY}px)` ;
    
  })*/
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
        <div style={{ width: '120%', height: '100vh', position: 'relative' ,left :'10px'}}>
          {choix === 1 ? (
            <h1 className='titre-graph'>Graph Des Marquage</h1>
          ) : (
            <h1 className='titre-graph'>Graph Des Marquage Reduit</h1>
          )}
          <h1 className='guide-graph'> Guide </h1>
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
            <Background />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
      
      );
    
    }

    