import React,{useCallback,useState,useRef,useMemo,memo,} from 'react'
import ReactFlow, {MiniMap,addEdge, BezierEdge,Controls, useReactFlow ,Background ,useNodesState, useEdgesState, ReactFlowProvider, MarkerType } from 'reactflow';
import { CustomEdge} from './CustomEdge.tsx'
import './Graphmenu.css'


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
 listMarquage = JSON.parse(preString);
 const presautString = localStorage.getItem('listMarquage');
 listMarquagesaut = JSON.parse(presautString);

}

console.log('listmarquage',listMarquage);
console.log('listarc',listarc);

const edgeTypes = useMemo(() => ({
  CustomEdge : CustomEdge 
}), []);

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
let listbloc = [] , renitialtab = [];
let find = false ;
for(let  i =0 ; i< listMarquage.length ; i++){
  find = false ;
  console.log("i = ",i)
  for(let  j = 0 ; j< listarc.length ; j++){
    console.log("listarc[",j,']',listarc[j])
  if(listarc[j].ji === i  || listarc[j].jf === i ){
   find = true ;   
   // break 
  } if (listarc[j].ji === i  && listarc[j].jf === i){
    console.log('bonjour')
    renitialtab.push({id : i ,p:listarc[j].propa,T:listarc[j].j1}) ;
  }
} if(find === false && listMarquage[i] !== -1 ){
  listbloc.push(i);
}
}
console.log('renitialtab',renitialtab)
listbloc.forEach(element =>{  // les element bloquée + inifi
  initialedges.push({
  id: getIdarc(),
  label: 'T|1', // Utilisez listarc[j] au lieu de listarc[0]
  source: element.toString(),
  target: element.toString(),
 // type: 'CircleEdge',
  type : 'CustomEdge',
  data: {
    label: 'T|1', position : 25
  },
  labelStyle: { 
    fontSize: '12px', 
    fontWeight: 'bold', backgroundColor: 'transparent' , color: 'red', fill: 'gray' ,position: 'absolute', 
  }, style: { stroke: '' } , 
  markerEnd: {type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
    color: '#118C7E' },  })
})
find = false ;
listMarquage.forEach(element =>{
if(element !== -1){
  find = true ;
}
})
if(find === false){
         initialNodes.push(    {id: getId() , position: { x: 290, y: 200 }, data: { label: 'Le graphe des marquages de votre réseau n\'admet pas un graphe des marquages réduit'} ,style : { width: 300,height: 80,backgroundColor: ' #f0fdfb' ,  borderRadius: '5px'   } } )

}

renitialtab.forEach(element =>{  // les element renitialisable qui ont plusieur arc 
  let trans = 'T';trans = trans.concat(element.T.toString()) ; trans = trans.concat('|')
  let pr = element.p.toFixed(2) ; 
  trans = trans.concat(pr.toString()); 
  initialedges.push({
  id: getIdarc(),
  label: trans, // Utilisez listarc[j] au lieu de listarc[0]
  source: element.id.toString(),
  target: element.id.toString(),
 // type: 'CircleEdge',
  type : 'CustomEdge',
  data: {
    label: trans, position : 25
  },
  labelStyle: { 
    fontSize: '12px', 
    fontWeight: 'bold', backgroundColor: 'transparent' , color: 'red', fill: 'gray' ,position: 'absolute', 
  }, style: { stroke: '' } , 
  markerEnd: {type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
    color: '#118C7E' },  })
})

let k = 0 ;
let l = 0 ;
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
      
    let marquage = '[' ;
    let s = listMarquage[k].mar.length ;
    for(let g = 0 ; g < s ;  g++){
    let ch1 = listMarquage[k].mar[g].toString();
      marquage = marquage.concat(ch1) ; marquage = marquage.concat(',')
    }
    marquage = marquage.slice(0,-1) ; marquage = marquage.concat(']')
    console.log('marquage',marquage)
    let f = 70*l+70 ;    
    let g = 150*i-75*(l+s)+640
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
    
     
  } l ++ ;}else{ 
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
  let g = listarc[j].ji; 
  let f = listarc[j].jf; 
  let h = listarc[j].j1 ; // la trans franchit
  let p = listarc[j].propa ; // la proba de franchissement 
  p = p.toFixed(2);
  console.log('p = ',p);
  if(g !== f){
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
    type:'straight',
    labelStyle: { 
      fontSize: '12px', 
      fontWeight: 'bold', 
      backgroundColor: 'transparent' ,
      color: 'red', 
      fill: 'gray' ,
      position: 'absolute', 
    }, 
    style: { stroke: '' } ,                                                
  });
}else{
    const index = initialedges.indexOf(searchelement);
    let trans = searchelement.label ; 
    let combine = false ;
    let parties = trans.split('_');let i = 0 ;let newparte = ''
    console.log('parties',parties)
    while(  i< parties.length && combine === false ){
    let transpartie = parties[i].substring(i,parties[i].indexOf('|'))
    let trans1 = 'T' ; trans1 = trans1.concat(h.toString()) ;
    if(trans1 === transpartie){
      console.log('holla')
      combine = true 
      let probapartie = parties[i].substring(parties[i].indexOf('|')+1,parties[i].length);
       let  prob = parseFloat(probapartie) +parseFloat(p) ; console.log('prob',prob,' parseInt(probapartie)', parseFloat(probapartie));
       if(prob <= 1){
       prob = prob.toString();
       newparte = newparte.concat(transpartie) ;newparte= newparte.concat('|');
      newparte= newparte.concat(prob);
    }else{
     // newparte = '' ;
     break 
    }
      console.log('newparte',newparte)
    }
    i++
  }
  if(combine === false ){
    trans = trans.concat('_T')
    trans = trans.concat(h.toString()) ; trans = trans.concat('|')
    trans = trans.concat(p.toString()); 
  }else{
    trans = trans.concat(newparte) ;
     trans = trans.replace(parties[i-1], "");console.log(' trans replace', trans)
    
  }
  console.log('trans 2',trans)

  if( index !== -1 ){
    initialedges[index].label = trans ; 
    initialedges[index].data.label = trans ; 
    }else{console.log('element n existe pas ')}
  console.log('g = ',g.toString())
  console.log('f = ',f.toString())
  }}}
 
if(initialNodes.length == 1 && initialedges.length == 1 ){ // pour le cas d'un element infini 
  let element = initialedges[0] ; 
  let trans =  element.label ;   
  initialedges[0] = {
    id: getIdarc(),
    label: trans, // Utilisez listarc[j] au lieu de listarc[0]
    source: element.source,
    target: element.target,
   // type: 'CircleEdge',
    type : 'CustomEdge',
    data: {
      label: trans, position : 27
    },
    markerEnd: {type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: '#118C7E' },                          
  } 
}

console.log("initialedges befor for ",initialedges)
for( let i = 0 ; i< initialedges.length ; i++ ){  // les arcs croiss
  let element = initialedges[i]
  let source = element.source , target = element.target , id = element.id ; ;
  for( let j = i+1 ; j< initialedges.length ; j++ ){
    let element2 = initialedges[j]
       if (element2.id !== id ){
        if(target === element2.source && source === element2.target ){
          element2.labelStyle.fill = 'gray' 
          element.labelStyle.fill = '#0eac8d'
          let space =''  
        let trans = element.label//.concat('___________________________');
        for(let g = 0 ; g< element2.label.length ; g++ ){
          trans = trans.concat('____')
          console.log('hello') ;
        }
        let trans2 = space.concat(element2.label);

          element2.label = trans2 
          element2.style.stroke = 'gray'
          element.style.stroke = '#0eac8d' 
          element.label =trans;
          initialedges[j] = element2 ;
          initialedges[i] = element ;
          console.log('element.label',element.label,'element1.id',element.id)
     }
   }
  }
}}

 let g = getId() ; g = getId() ; let  f = getId() ;
  initialNodes.push(    {id: g , position: { x: 930, y: 10 }, data: { label: 'marquage initiale'} ,style : { width: 160,height: 35 ,backgroundColor: ' #0fa9a6' ,  borderRadius: '5px'  }}) ;
  initialNodes.push(    {id: f , position: { x: 930, y: 110 }, data: { label: 'marquage accessible'} ,style : { width: 160,height: 35 ,backgroundColor: ' #f0fdfb' ,  borderRadius: '5px'} } );
  initialNodes.push(    {id: getId() , position: { x: 930, y: 160}, data: { label: 'marquage tangible'} ,style : { width: 160,height: 35 ,backgroundColor: ' #f0fdfb' ,  borderRadius: '5px', border: '3px solid #555'   } } )
  let l = getId() ;
  initialNodes.push(    {id: l , position: { x: 930, y: 250}, data: { label: 'marquage bloqué'} ,style : { width: 160,height: 35 ,backgroundColor: ' #f0fdfb' ,  borderRadius: '5px', border: '3px solid #555'   } } )
  initialedges.push(    { id: getIdarc(),
    data: {
      label: 'transition Ti | sa probabilite ', },
    markerEnd: {type: MarkerType.ArrowClosed,
      width: 20,height: 20,color: '#118C7E',  },
    label: 'transition Ti | sa probabilite ' , // Utilisez listarc[j] au lieu de listarc[0]
    source: g.toString(),
    target: f.toString(),
    //type : 'bezier',
    type:'straight',
    labelStyle: { 
      fontSize: '12px', fontWeight: 'bold', backgroundColor: 'transparent' ,color: 'red', fill: 'gray' ,position: 'absolute', }, 
    style: {
              stroke: '' } ,})
     initialedges.push(    { id: getIdarc(),
    data: {
      label: 'transition T | probabilite = 1 ', position : 80},
    markerEnd: {type: MarkerType.ArrowClosed,
      width: 20,height: 20,color: '#118C7E',  },
    label: 'transition T | probabilite = 1 ' , // Utilisez listarc[j] au lieu de listarc[0]
    source: l,
    target: l,
    //type : 'bezier',
    type:'CustomEdge',
    labelStyle: { 
      fontSize: '12px', fontWeight: 'bold', backgroundColor: 'transparent' ,color: 'red', fill: 'gray' ,position: 'absolute', }, 
    style: {
              stroke: '' } ,})
                     

console.log('initialnodes',initialNodes)
console.log('initialedges',initialedges)

const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialedges)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)

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

    