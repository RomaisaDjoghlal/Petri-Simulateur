// const renitiabilite = JSON.parse(localStorage.getItem('renitiabilite'));
import { useSelector } from 'react-redux';
import {setQuasivivant,getQuasivivant} from '../../ReduxSlice/EditSlice'
const preString = localStorage.getItem('renitiabilite');
console.log('ppp',preString);
let renitiabilite = JSON.parse(preString);
 console.log('reni in data ',renitiabilite);
 const reni = () =>{
 if(renitiabilite){
    return 'Oui , votre réseau est rénitialisable '
 }else{
    return 'Non , votre réseau n est pas rénitialisable '
 }}
 let Quasiviv =JSON.parse(localStorage.getItem('qasivivant'));
//let Quasiviv = false 
 //console.log('Quasiviv',Quasiviv)
 const qasivivant = () =>{
 if(Quasiviv){
    return 'Oui , votre réseau est qasivivant '
 }else{
    return 'Non , votre réseau n est pas qasivivant '
 }}
 let borne = JSON.parse(localStorage.getItem('infini'));
 const bornitude = () =>{
 if(!borne){
    return 'Oui , votre réseau est bornné '
 }else{
    return 'Non , votre réseau n est pas bornné '
 }}
 let nonbloc = JSON.parse(localStorage.getItem('nonbloc'));
 const nonbloquage = () =>{
 if(nonbloc){
    return 'Oui'
 }else{
    return 'Non'
 }}
export const props = [
    {   index : 0 ,
        type : "Bornitude",
        definition : "  Une place Pi est bornée pour un marquage initial Mo, si pour tout marquage accessible à partir de Mo, le nombre de jetons dans Pi est fini. Ainsi Un reseau de Petri est borné pour un marquage initial Mo, si toutes ses places sont bornées pour Mo.",
        value : bornitude(),
    },

    {   index : 1,
        type : "Vivacité",
        definition : "  Une transition Tj est vivante pour un marquage initial Mo, si pour tout marquage accessible, il existe une séquence de franchissement qui contienne Tj à partir de ce marquage accessible. Ainsi un reseau de Petri est vivant pour un marquage initial Mo si toutes ses transitions sont vivantes pour Mo.",
        value : qasivivant(),
    },
    {   index : 2 , 
        type : "Réinitiabilité",
        definition : "  On dit qu'un réseau de Petri R possède un état d'accueil Mi, si Mi est accessible de tous les marquages accessibles du marquage initial Mo. Un reseau de Petri est réinitialisable pour un marquage initial Mo si Mo est un état d'accueil.",
        value : reni() ,
    },
    {   index : 3,
        type : "Non blocage",
        definition : "  Un blocage (ou état puits) est un marquage M où aucune transition est franchissable.Un reseau de Petri est sans blocage pour un marquage initial Mo si aucun marquage accessible Mi n'est un blocage.",
        value : nonbloquage() ,
    },
    {   index : 4,
        type : "Persistance",
        definition : "saaaluuutt",
        value : '',
    },
]