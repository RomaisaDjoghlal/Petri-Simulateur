

// const renitiabilite = JSON.parse(localStorage.getItem('renitiabilite'));
const preString = localStorage.getItem('renitiabilite');
console.log('ppp',preString);
let renitiabilite = JSON.parse(preString);
 console.log('reni in data ',renitiabilite);

 const reni = () =>{
 if(renitiabilite){
    return 'Oui'//'Le réseau de Petri que vous venez de créer est réinitiabilisable '
 }else{
    return 'Non'//Le réseau de petri que vous venez de créer n est pas réinitiabilisable '
 }}

 let Quasiviv = JSON.parse(localStorage.getItem('qasivivant'));
 console.log('Quasiviv',Quasiviv)

 const qasivivant = () =>{
 if(Quasiviv){
    return 'Oui'//'Le réseau de Petri que vous venez de créer est Quasi-vivant'
 }else{
    return 'Non'//, votre réseau n est pas qasivivant '
 }}
 let borne = JSON.parse(localStorage.getItem('infini'));

 const bornitude = () =>{
 if(!borne){
    return 'Oui'//'Oui , votre réseau est bornné '
 }else{
    return 'Non' //'Non , votre réseau n est pas bornné '
 }}

 let nonbloc = JSON.parse(localStorage.getItem('nonbloc'));
 let viv = JSON.parse(localStorage.getItem('vivacite'));
 console.log('viv',viv);

 const nonbloquage = () =>{
 if(nonbloc){
    return 'Oui'
 }else{
    return 'Non'
 }}

 const vavacite= () =>{
   if(viv){
      return 'Oui'
   }else{
      return 'Non'
   }}

 console.log('nonbloc',nonbloc)
 let per = JSON.parse(localStorage.getItem('persistance'));
let tab2 = JSON.parse(localStorage.getItem('conflittab'));

 const persistance = () =>{
   let conflits = '' ;
 if(per){
   /* tab2.forEach(element => {
      conflist = conflits.concat(element.)
    });*/
    return 'Oui'
 }else{
    return 'Non'
 }}
 
export const props = [
    {
        type : "Bornitude",
        definition : "  Une place Pi est bornée pour un marquage initial Mo, si pour tout marquage accessible à partir de Mo, le nombre de jetons dans Pi est fini. Ainsi Un reseau de Petri est borné pour un marquage initial Mo, si toutes ses places sont bornées pour Mo.",
        value : bornitude(),
       
    },
    {
      type : "Quasi-vivacité",
        definition : " Une transition t est quasi-vivante pour un marquage initial M0, si elle est franchissable au moins une fois à partir d'un marquage accessible de M0. Un reseau est quasi-vivant si toutes ses transitions le sont .",
        value : qasivivant(),
      
    },
    {
        type : "Vivacité",
        definition : "  Une transition Tj est vivante pour un marquage initial Mo, si pour tout marquage accessible, il existe une séquence de franchissement qui contienne Tj à partir de ce marquage accessible. Ainsi un reseau de Petri est vivant pour un marquage initial Mo si toutes ses transitions sont vivantes pour Mo.",
        value : vavacite(),
      
    },
    {
        type : "Réinitiabilité",
        definition : "  On dit qu'un réseau de Petri R possède un état d'accueil Mi, si Mi est accessible de tous les marquages accessibles du marquage initial Mo. Un reseau de Petri est réinitialisable pour un marquage initial Mo si Mo est un état d'accueil.",
        value : reni() ,
      
    },
    {
        type : "Non blocage",
        definition : "  Un blocage (ou état puits) est un marquage M où aucune transition est franchissable.Un reseau de Petri est sans blocage pour un marquage initial Mo si aucun marquage accessible Mi n'est un blocage.",
        value : nonbloquage() ,
       
    },
    {
        type : "Persistance",
        definition : "Un RdP est dit persistant pour un marquage initial Mo si pour tout marquage Mi accessible à partir de Mo, si deux transitions tj et tk sont franchissables alors tj tk et tk tj sont des séquences de franchissement à partir de Mi. Lors d'un conflit effectif dans un réseau de Petri persistant, il n'est pas nécessaire de faire le choix de la transition à franchir car l'ordre n'est pas important.",
        value : persistance(),
      
    },
    
] 