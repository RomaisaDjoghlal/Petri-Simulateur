export class Place {

    constructor(IdP , nbj){
       this.IdP = IdP ;
       this.nbjetons = nbj;
       this.psup = false; 
    }
    GetPlaceId(){
        return this.Id ;
    }
    SetPlaceId(IdP){
        this.Id = IdP ;
    }
    GetJetons(){
        return this.nbjetons; 
    }
    SetJetons(je){
        this.nbjetons = je ; 
    }
    GetPlacesup(){
        return this.psup ;
    }
    SetPlacesup(supp){
        this.psup = supp  ;
    }
    
    }
    
 export class Transition {
    
    constructor(Idt,type,poid){
       this.IdT = Idt ;
       this.Type = type;// le type peut etre 'timed' ou 'imediate'
       this.Poid = poid ;
       this.tsup = false;
       this.listplaces = []; 
    }
    GetTransId(){
        return this.Id ;
    }
    SetTransId(IdP){
        this.Id = IdP ;
    }
    GetType(){
        return this.Type; 
    }
    SetType(je){
        this.Type = je ; 
    }
    GetPoids(){
        return this.Poid; 
    }
    SetPoids(je){
        this.Poids = je ; 
    }
    GetTranssup(){
        return this.tsup ;
    }
    SetTranssup(supp){
        this.tsup = supp;
    }
    
    }
 export class Reseau{
    constructor(){
        this.NpPlacesexist = 0;
        this.NpTransexist = 0;
       this.NpPlaces = 0 ;
       this.places = [];
       this.NpTrans = 0 ;
       this.Transitions = [];
       this.Pre = [[0]];
       this.Post = [[0]];
    }
    
    AddPlace(newplace) {
        this.places.push(newplace);
        this.NpPlaces++;
        this.NpPlacesexist++;
        if ((this.NpPlaces)>1){
        // Vérifie si this.Pre contient des lignes avant de déterminer la longueur des colonnes
        const cols = this.Pre.length > 0 ? this.Pre[0].length : 1;
    
        // Création d'une nouvelle ligne remplie de zéros
        const nouvelleLigne = Array(cols).fill(0);
    
        // Ajout de la nouvelle ligne à la fin du tableau existant
        this.Pre.push(nouvelleLigne);
        //meme traitement pour post
        
     const colsp = this.Pre.length > 0 ? this.Post[0].length : 1;
    const nouvelleLignep = Array(colsp).fill(0);
    this.Post.push(nouvelleLignep);
    }
    
       
    }
    creeplace(){
        const place= new Place(this.NpPlaces,0);
        this.AddPlace(place);
     
    }
    
    AddTrans(newtrans) {
        this.NpTransexist++;
        this.Transitions.push(newtrans);
        this.NpTrans++;
        if((this.NpTrans)>1){
        // Ajouter une seule colonne remplie de zéros à chaque ligne
        const nouvelleColonne = 0;
        this.Pre.forEach(ligne => ligne.push(nouvelleColonne));
       //POST
       const nouvelleColonnep = 0;
        this.Post.forEach(ligne => ligne.push(nouvelleColonnep));
    }
    }
    
    creetrans(){
        const trans= new Transition(this.NpTrans,false,1);
        this.AddTrans(trans);
    }
    creetransTimed(){
        const trans= new Transition(this.NpTrans,true,1);
        this.AddTrans(trans);
    }
    SuppPlace(Idplace){  // on doit entrer Id de cette place a supprimer du list 
        this.places[Idplace].SetPlacesup(true);
        this.NpPlacesexist = this.NpPlacesexist - 1 ;
        this.Pre[Idplace] = 0;
        this.Post[Idplace] = 0;
    }
    SuppTrans(Idtrans){
        this.Transitions[Idtrans].SetTranssup(true);
        this.NpTransexist = this.NpTransexist - 1 ;
        for (let i = 0; i < this.places.length; i++) {
        this.Pre[i][Idtrans] = 0;
      }
      for (let j = 0; j < this.places.length; j++) {
        this.Post[j][Idtrans] = 0;
      }
    }
    Sauvgarder(){
        // on fait le sauvgarde des deux listes + autres 
    }
    Addpre(Idplace,Idtrans,poid,type){ // le type temporise ou imediate 
       
        this.Pre[Idplace][Idtrans] = {poid , type }
    }
    Addpost(Idplace,Idtrans,poid,type){ // le type temporise ou imediate 
       
        this.Post[Idplace][Idtrans] = {poid , type }
    }
    Calculerproba(){
    
    } 
    CreerGraphMarquage(){
       let Marquage = [] ;
       
    }
    AfficherPost(){
        console.log('matrice ');
//Nombre de colonnes (longueur d'une ligne)
const colonnesp = this.Post[0].length; // Supposant que toutes les lignes ont la même longueur
const lignesp = this.Post.length;
// Affichage des dimensions

console.log("Nombre de lignes :", lignesp);
console.log("Nombre de colonnes :", colonnesp);
for (let k = 0; k < this.Post.length; k++) {
    for (let l = 0; l < this.Post[k].length; l++) {
        // Afficher chaque élément du tableau
        console.log("la ligne [ " + k +"] a " + this.Post[k].length + "elements");
        console.log("tableau[" + k + "][" + l + "] =", this.Post[k][l]);
    }
}
    }
    Afficherplaces(){
        console.log('places');
        console.log(this.places);
    }
    Affichertrans(){
        console.log('transitions');
        console.log(this.Transitions);
    }
    }