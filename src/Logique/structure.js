export class Place {

    constructor(IdP , nbj){
       this.IdP = IdP ;
       this.nbjetons = nbj;
       this.psup = false; 
    }
    GetPlaceId(){
        return this.IdP ;
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
        return this.IdT ;
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
        this.Poid = je ; 
    }
    GetTranssup(){
        return this.tsup ;
    }
    SetTranssup(supp){
        this.tsup = supp;
    }
    
    }
    class marqsomm {
        constructor(id, tab = []) {
            this.id = id;
            this.tab = tab;
        }
    
        // Getter pour récupérer le tableau
        getTab() {
            return this.tab;
        }
    
        // Setter pour définir le tableau
        setTab(newTab) {
            this.tab = newTab;
        }
    
        // méthode pour ajouter un élément au tableau
        addToTab(item) {
            this.tab.push(item);
        }
    
        // méthode pour supprimer un élément du tableau par index
        removeFromTab(index) {
            if (index >= 0 && index < this.tab.length) {
                this.tab.splice(index, 1);
            } else {
                console.error("Index out of range.");
            }
        }
    
        // Getter pour récupérer l'ID
        getId() {
            return this.id;
        }
    
        // Setter pour définir l'ID
        setId(newId) {
            this.id = newId;
        }
    }
   
export class Reseau{
    constructor(poid = 0, type = 0){
       this.NpPlacesexist = 0;
       this.NpTransexist = 0;
       this.NpPlaces = 0 ;
       this.places = [];
       this.NpTrans = 0 ;
       this.Transitions = [];
       this.Pre = [[{poid,type}]];
       this.Post = [[{poid,type}]];
       this.marq=[];
       this.nbmarq=0;
       this.marqarc=[];
       this.nbarcs=0;
    }
    
    AddPlace(newplace) {
        this.places.push(newplace);
        this.NpPlaces++;
        this.NpPlacesexist++;
        let poid = 0 , type = 0 ;
        console.log('nbplace',this.NpPlaces)
        if ((this.NpPlaces)>1){
        // Vérifie si this.Pre contient des lignes avant de déterminer la longueur des colonnes
        const cols = this.Pre.length > 0 ? this.Pre[0].length : 1;

    
        // Création d'une nouvelle ligne remplie de zéros
        const nouvelleLigne = Array(cols).fill({poid , type});
    
        // Ajout de la nouvelle ligne à la fin du tableau existant
        this.Pre.push(nouvelleLigne);
        //meme traitement pour post
        
     const colsp = this.Pre.length > 0 ? this.Post[0].length : 1;
    const nouvelleLignep = Array(colsp).fill({poid , type});
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
        let poid = 0 , type = 0 ;
        if((this.NpTrans)>1){
        // Ajouter une seule colonne remplie de zéros à chaque ligne
        const nouvelleColonne = {poid , type};
        this.Pre.forEach(ligne => ligne.push(nouvelleColonne));
       //POST
       const nouvelleColonnep = {poid , type};
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
        this.places[Idplace].SetJetons(-1);
        this.NpPlacesexist = this.NpPlacesexist - 1 ;
        let poid = 0 , type = 0 ;
        for (let i = 0; i < this.Transitions.length; i++) {

        this.Pre[Idplace][i] = {poid , type};
        this.Post[Idplace][i] = {poid , type};
        }
    }
    SuppTrans(Idtrans){
        this.Transitions[Idtrans].SetTranssup(true);
        this.NpTransexist = this.NpTransexist - 1 ;
        let poid = 0 , type = 0 ;
        for (let i = 0; i < this.places.length; i++) {
        this.Pre[i][Idtrans] = {poid , type};
      }
      for (let j = 0; j < this.places.length; j++) {
        this.Post[j][Idtrans] = {poid , type};
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

    DelteReseau(){
        let poid=0;
        let type=0;
        this.NpPlacesexist = 0;
        this.NpTransexist = 0;
        this.NpPlaces = 0 ;
        this.places=[];     
        this.NpTrans = 0 ;
      
       this.Transitions=[];
        this.Pre = [[{poid,type}]];
        this.Post = [[{poid,type}]];
    }

    Calculerproba(){
    
    } 
    CreerGraphmarquage(){
       let marquage = [] ;
       
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
    AfficherPre(){
        console.log('matrice pre');
//Nombre de colonnes (longueur d'une ligne)
/*
const colonnesp = this.Pre[0].length; // Supposant que toutes les lignes ont la même longueur
const lignesp = this.Pre.length;
// Affichage des dimensions

console.log("Nombre de lignes :", lignesp);
console.log("Nombre de colonnes :", colonnesp);
for (let k = 0; k < this.Pre.length; k++) {
    for (let l = 0; l < this.Pre[k].length; l++) {
        // Afficher chaque élément du tableau
        console.log("la ligne [ " + k +"] a " + this.Pre[k].length + "elements");
        console.log("tableau[" + k + "][" + l + "] =", this.Pre[k][l]);
    }
}*/ console.log(this.Pre)
    }
    Afficherplaces(){
        console.log('places');
        console.log(this.places);
    }
    Affichertrans(){
        console.log('transitions');
        console.log(this.Transitions);
    }
    getmarqini() {
        const marqini = [];
        this.places.forEach(place => {
            marqini.push(place.nbjetons);
        });
        return marqini;
    }
    canfire(id,marq)
    {
        if (id < 0 || id >= this.Transitions.length) {
            console.error("ID de transition invalide.");
            return false;
        }
        if (this.Transitions[id].tsup) {
            console.error("La transition est déjà supprime .");
            return false;
        }
        let poid=0;
        let type=0;
        let k=true;
        for (let i=0;i<this.NpPlaces;i++)
        {
            poid=this.Pre[i][id].poid; console.log('poid',poid)
            type=this.Pre[i][id].type;
             if (type===false && poid > 0)
             {
               if(poid>marq[i])
               {
                return false;
               }
             }
             if (type===true && poid > 0)
             {

                if(poid<=marq[i] && marq[i]>=0)
                {
                    return false;
                }
             }
            /* */
        }
      let lie = false;
        for(let i = 0 ; i< this.NpPlaces ;i++){
        if(  this.Pre[i][id].poid > 0 || this.Post[i][id].poid > 0 ){  // add this !!!!!!!!!!!!!!!!!!!!!!!!
            console.log('ffffffffffffffff')
            lie = true; 
         }   }
         k=lie;
        return k;

    }
     // Fonction utilitaire pour vérifier l'égalité de deux marquages
     aremarkingsEqual(mark1, mark2) {
        if (mark1.length !== mark2.length) {
            return false;
        }
    
        for (let i = 0; i < mark1.length; i++) {
            if (mark1[i] !== mark2[i]) {
                return false;
            }
        }
    
        return true;
    }
    /*existemarquage(tab, m) {
        for (let i = 0; i < tab.length; i++) {
            let k = tab[i].mar;
            let stop = true; // On initialise stop à true pour chaque élément de tab
    
            // Vérifier si la longueur des deux tableaux est la même
            if (k.length !== m.length) {
                continue; // Passer à l'élément suivant de tab
            }
    
            // Vérifier chaque élément des tableaux k et m
            for (let j = 0; j < k.length; j++) {
                if ((k[j] !== m[j]) && (stop === true)) {
                    stop = false;
                    // Sortir de la boucle dès qu'une différence est détectée
                }
            }
    
            // Si stop est true à la fin de la boucle interne, cela signifie que les deux tableaux sont identiques
            if (stop) {
                return true; // On a trouvé un élément correspondant, donc on retourne true
            }
        }
    
        // Si aucun élément correspondant n'a été trouvé après avoir parcouru tous les éléments de tab, on retourne false
        return false;
    }*/
    getNextState(idt,m)
     {          

        let mf=[];  
        if(idt <0 || idt>=this.NpTrans || this.Transitions[idt].tsup===true )
        {
            console.log("la transition n'existe pas ")
            return -1;
        }
          let je=0;
          let js=0;
          let jf=0;
          for (let i = 0; i < m.length; i++) 
        {   
            if(m[i] === -1){
                jf = -1 ;
            }else{
           je=parseInt(this.Pre[i][idt].poid);
           js=parseInt(this.Post[i][idt].poid);
           console.log('je = ',je)
           console.log('js = ',js)
           jf=m[i]-je+js;
          /* mf.push(jf);*/
           if(jf < 0){
            jf = 0 ;
           }
            }
           mf[i] = jf ;  
        }
        console.log('marquage getnextstate ',mf)

        /*
        console.log(mf);
        */
        return mf;
     }   
     
 /*   
ConstrGraphmarq(m,idm,tab) {
    let i;
    let m1;
    let j;
    let j1;
    let tr;
    let fr;
    let lv;
    let l;
    let mar;
    let kse;
    let tabi=[];
    let tabt=[];
    for(i=0;i<this.NpTransexist;i++)
    {
        if (this.canfire(i, m)) 
        {
            tabi[i]=1;
            tabt[i]=0;
       }
       else{tabi[i]=-1;tabt[i]=-1;}
       
    }
    mar=m;
    fr=tabi;
    tr=tabt;
    lv=idm;
    if(!this.existemarquage(tab,m) && tab.length<30)
    {   
    kse= {fr,tr,mar,lv};
    tab.push(kse);
    }
    let stop=false;
    j=0;
    let k=0;
    while (stop===false && j<tab.length)
    {
      while (stop===false && k< tab[j].fr.length)
      {
        if (tab[j].fr[k]===1 && tab[j].tr[k]===0)
        {
          stop=true;
          tab[j].tr[k]=1;
          m=tab[j].mar;
           j1=k;
           l=tab[j].lv;
          break;
        }
        else {k++;}
      }
      j++;
      k=0;
    }
    if(stop===true)
    {  
    l++;  
    m1 = this.getNextState(j1 , m);
    console.log(this.existemarquage(tab,m1));
    console.log(m1);
    this.ConstrGraphmarq(m1,l,tab);
    }  
}
*/
existemarquage(tab, m) {
    for (let i = 0; i < tab.length; i++) {
        let k = tab[i].mar;
        let stop = true; // On initialise stop à true pour chaque élément de tab

        // Vérifier si la longueur des deux tableaux est la même
        if (k.length !== m.length) {
            continue; // Passer à l'élément suivant de tab
        }

        // Vérifier chaque élément des tableaux k et m
        for (let j = 0; j < k.length; j++) {
            if (k[j] !== m[j]) {
                stop = false;
                break; // Sortir de la boucle dès qu'une différence est détectée
            }
        }

        // Si stop est true à la fin de la boucle interne, cela signifie que les deux tableaux sont identiques
        if (stop) {
            return i; // On a trouvé un élément correspondant, donc on retourne true
        }
    }
// Si aucun élément correspondant n'a été trouvé après avoir parcouru tous les éléments de tab, on retourne false
    return -1;

}

/*
ConstrGraphmarq(m,idm,tab,arc) {
    let i;
    let m1;
    let j;
    let j1;
    let tr;
    let fr;
    let lv;
    let l;
    let ji;
    let jf;
    let mar;
    let kse;
    let kse1;
    let tabi=[];
    let tabt=[];
    for(i=0;i<this.NpTransexist;i++)
    {
        if (this.canfire(i, m)) 
        {
            tabi[i]=1;
            tabt[i]=0;
       }
       else{tabi[i]=-1;tabt[i]=-1;}
       
    }
    mar=m;
    fr=tabi;
    tr=tabt;
    lv=idm;
    if(this.existemarquage(tab,m)===-1 && tab.length<30)
    {   
    kse= {fr,tr,mar,lv};
    tab.push(kse);
    }
    let stop=false;
    j=0;
    let k=0;
    while (stop===false && j<tab.length)
    {
       
      while (stop===false && k< tab[j].fr.length)
      {
        if (tab[j].fr[k]===1 && tab[j].tr[k]===0)
        {
          stop=true;
          tab[j].tr[k]=1;
          m=tab[j].mar;
           j1=k;
           l=tab[j].lv;
           ji=j;
          break;
        }
        else {k++;}
      }
      j++;
      k=0;
    }
    if(stop===true)
    {  
    l++;
    m1 = this.getNextState(j1 , m);
  if (this.existemarquage(tab,m1)===-1)
  {
    jf=tab.length;
  
  }
  else
  {
  jf=this.existemarquage(tab,m1);
  }
  kse1={ji,jf,j1}
  arc.push(kse1);

    console.log(m1);
    this.ConstrGraphmarq(m1,l,tab,arc);
    }  
}*/
ConstrGraphmarq(m,idm,tab,arc) {
    let i;
    let m1;
    let j;
    let j1;
    let tr;
    let fr;
    let lv;
    let l;
    let ji;
    let jf;
    let mar;
    let kse;
    let kse1;
    let tabi=[];
    let tabt=[];
    let extime=0;
    let eximm=0;
    let poidt=0;
    let temt=0;
    let w;
    let propa;
    let tempo;
    for(i=0;i<this.NpTrans;i++)
    {
        if (this.canfire(i, m)) 
        {
            tabi[i]=1;
            tabt[i]=0;
            j=this.Transitions[i].Type;
            if (this.Transitions[i].Type===true)
            {
                extime=1;
                temt=temt+this.Transitions[i].Poid;
            }
            else
            {
                eximm=1;
                poidt=poidt+this.Transitions[i].Poid;
            }         
       }
       else{tabi[i]=-1;tabt[i]=-1;}
       
    }
    if(eximm===1 && extime===1)
    {
        tempo=false;
        for(i=0;i<tabi.length;i++)
        {
            if(this.Transitions[i].Type===true)
            {
                tabi[i]=-1;
                tabt[i]=-1;
            }
        }
    }
    if ((eximm===1 && extime===1) || (eximm===1 && extime===0))
    {
        w=poidt;
        tempo=false;
    }
    else if(eximm===0 && extime===1)
    {
        w=temt;
        tempo=true;
    }
    else
    {
        w=-1;
        tempo=true;
    }
    mar=m;
    fr=tabi;
    tr=tabt;
    lv=idm;
    if(this.existemarquage(tab,m)===-1 && tab.length<50)
    {   
    kse= {fr,tr,mar,lv,w,tempo};
    tab.push(kse);
    }
    let stop=false;
    j=0;
    let k=0;
    while (stop===false && j<tab.length)
    {
       
      while (stop===false && k< tab[j].fr.length)
      {
        if (tab[j].fr[k]===1 && tab[j].tr[k]===0)
        {
          stop=true;
          tab[j].tr[k]=1;
           m=tab[j].mar;
           j1=k;
           l=tab[j].lv;
           ji=j;
          break;
        }
        else {k++;}
      }
      j++;
      k=0;
    }
    if(stop===true)
    {  
    l++;
    m1 = this.getNextState(j1 , m);
  if (this.existemarquage(tab,m1)===-1)
  {
    jf=tab.length;
  
  }
  else
  {
  jf=this.existemarquage(tab,m1);
  }
  propa=this.Transitions[j1].Poid/tab[ji].w;
  kse1={ji,jf,j1,propa}
  arc.push(kse1);

    console.log(m1);
    this.ConstrGraphmarq(m1,l,tab,arc);
    }  
}
ConstrGraphmarqre(tab,arc,tab1,arc1)
    {
        let i;
        let t=[];
        let t1=[];
        let kse;
        let j1;
        let ji;
        let jf;
        let propa;
        let j;
        let r;
        
         for(i=0;i<tab.length;i++)
        {
           if(tab[i].tempo===true)
           {
            tab1.push(tab[i]);
           }
           else
           {
             tab1.push(-1);
           }
        }
        for(i=0;i<tab.length;i++)
        {
            t=[];
            t1=[];
            if(tab[i].tempo===false)
            {
                let visited = new Array(tab.length).fill(false);
                this.trouva(i,arc,tab,t,visited,1);
                this.trouvb(i,arc,tab,t1,visited,1);
                for(j=0;j<t1.length;j++)
                {
                    for(r=0;r<t.length;r++)
                    {
                       ji=t1[j].k;
                       jf=t[r].k
                       j1=t1[j].j1;
                       propa=t1[j].propa*t[r].propa;
                       kse={ji,jf,j1,propa};
                       arc1.push(kse);
                    }

                }
            }
        }
        for(i=0;i<arc.length;i++)
        {
            if(tab[arc[i].ji].tempo===true && tab[arc[i].jf].tempo===true)
            {
                arc1.push(arc[i]);
            }
        }
    }
    /*trouvb(i,arc,tab,tib,visited)
    {
        let i1;
        let k;
        let propa;
        let kse;
        let j1;
        visited[i] = true;
        if (visited.every(v => v)) {
            return; 
        }
        for(i1=0;i1<arc.length;i1++)
        {
            k=arc[i1].ji;
            if(arc[i1].jf===i && k<tab.length )
            {
                if( tab[k].tempo===true)
                {
                    j1=arc[i1].j1;
                    propa=arc[i1].propa;
                    kse={k,propa,j1};
                    tib.push(kse);
                }
                else if (!visited[k])
                {
                    this.trouvb(k,arc,tab,tib,visited);
                }
            }

        }

    }
    trouva(i,arc,tab,tub,visited)
    {
        let i1;
        let k;
        let propa;
        let kse;
        visited[i] = true;
        if (visited.every(v => v)) {
            return; 
        }
        for(i1=0;i1<arc.length;i1++)
        {
            k=arc[i1].jf;
            if(arc[i1].ji===i && k<tab.length )
            {
                if(tab[k].tempo===true)
                {
                    
                    propa=arc[i1].propa;
                    kse={k,propa};
                    tub.push(kse);
                }
                else if (!visited[k])
                {
                    this.trouva(k,arc,tab,tub,visited);
                }
            }
        }

    }*/

trouvb(i,arc,tab,tib,visited,propa)
    {
        let i1;
        let k;
        //let propa = 1;
        let kse;
        let j1;
        let propa1 ;
        visited[i] = true;
        if (visited.every(v => v)) {
            return; 
        }
        for(i1=0;i1<arc.length;i1++)
        {
            k=arc[i1].ji;
            if(arc[i1].jf===i && k<tab.length )
            {
                if( tab[k].tempo===true)
                {
                    j1=arc[i1].j1;
                    propa=arc[i1].propa*propa;
                    kse={k,propa,j1};
                    tib.push(kse);
                    propa = propa/arc[i1].propa
                }
                else if (!visited[k])
                {
                    propa= arc[i1].propa*propa ;
                    propa1= arc[i1].propa ;
                    this.trouvb(k,arc,tab,tib,visited);
                    propa=propa/propa1 ;
                }
            }

        }

    }
    trouva(i,arc,tab,tub,visited,propa)
    {
        let i1;
        let k;
       // let propa = 1;
        let kse;
        let j1;
        visited[i] = true;
        let propa1 ;
        if (visited.every(v => v)) {
            return; 
        }
        for(i1=0;i1<arc.length;i1++)
        {
            k=arc[i1].jf;
            if(arc[i1].ji===i && k<tab.length )
            {
                if(tab[k].tempo===true)
                {
                    j1=arc[i1].j1; 
                    propa=arc[i1].propa;
                    kse={k,propa};
                    tub.push(kse);
                    propa = propa/arc[i1].propa
                }
                else if (!visited[k])
                {   
                    propa= arc[i1].propa*propa ;
                    propa1= arc[i1].propa ;
                    this.trouva(k,arc,tab,tub,visited);
                    propa=propa/propa1 ;
                }
            }
        }

    }

/*
ConstrGraphmarqre(tab,arc,tab1,arc1)
{
    let i;
    let t=[];
    let t1=[];
    let kse;
    let j1;
    let ji;
    let jf;
    let propa;
    let j;
    let r;
     for(i=0;i<tab.length;i++)
    {
       if(tab[i].tempo===true)
       {
        tab1.push(tab[i]);
       }
       else
       {
         tab1.push(-1);
       }
    }
    for(i=0;i<tab.length;i++)
    {
        t=[];
        t1=[];
        if(tab[i].tempo===false)
        {
            this.trouva(i,arc,tab,t);
            this.trouvb(i,arc,tab,t1);
            for(j=0;j<t1.length;j++)
            {
                for(r=0;r<t.length;r++)
                {
                   ji=t1[j].k;
                   jf=t[r].k
                   j1=t1[j].j1;
                   propa=t1[j].propa*t[r].propa;
                   kse={ji,jf,j1,propa};
                   arc1.push(kse);
                }

            }
        }
    }
    for(i=0;i<arc.length;i++)
    {
        if(tab[arc[i].ji].tempo===true && tab[arc[i].jf].tempo===true)
        {
            arc1.push(arc[i]);
        }
    }
}
trouvb(i,arc,tab,tib)
{
    let i1;
    let k;
    let propa;
    let kse;
    let j1;
    for(i1=0;i1<arc.length;i1++)
    {
        k=arc[i1].ji;
        if(arc[i1].jf===i)
        {
            if( tab[k].tempo===true)
            {
                j1=arc[i1].j1;
                propa=arc[i1].propa;
                kse={k,propa,j1};
                if (!tib.includes(kse)) {
                    tib.push(kse);
                  }
            }
            else 
            {
                this.trouvb(k,arc,tab,tib);
            }
        }

    }

}
trouva(i,arc,tab,tub)
{
    let i1;
    let k;
    let propa;
    let kse;
    for(i1=0;i1<arc.length;i1++)
    {
        k=arc[i1].jf;
        if(arc[i1].ji===i)
        {
            if(tab[k].tempo===true)
            {
                
                propa=arc[i1].propa;
                kse={k,propa};
                if (!tub.includes(kse)) {
                tub.push(kse);
                }
            }
            else
            {
                this.trouva(k,arc,tab,tub);
            }
        }
    }

}
*/
simulation(tab,arc,marquageinit,tabtrans){
    console.log('arcsim ',arc)
    console.log('tabsim',tab)
    const tabniveau = () =>{
        let l = marquageinit ;
        let trans = -1 , proba = 0 , marsuiv = []
        let tabniv = [] ;
        console.log('l == ' ,l)
        let k = 0 , m= 0 , n=0 ;
        tabniv.push([{trans,proba,marsuiv}]);
       while( k < arc.length ) {
       if(arc[k].jf < tab.length){
        console.log('k = ',k)
        console.log('arc[k].ji',arc[k].ji) ; console.log('tab[arc[k].ji].mar',tab[arc[k].ji].mar)
            if (tab[arc[k].ji].mar.every((element, index) => element === l[index])){
               //tabniv.push([]);
               //if()
               tabniv[m][n] = {trans : arc[k].j1 , proba:arc[k].propa,marsuiv: tab[arc[k].jf].mar} ;  
               console.log('tabniv[',m,'][',n,']',tabniv[m][n])  
               k++; n++    
            }else{
                m ++ ; n= 0 ;
               if(m < tab.length){ 
               l= tab[m].mar ; 
               tabniv.push([]);
               console.log('tab[',m,'] =',l)
             }else{ k = arc.length}             
            }}else{k = arc.length}
        }
        return tabniv ;
      } 
      console.log('Transitions in calcproba ',this.Transitions)
    let trans = this.Transitions ;
    function choisirTransAvecProbabilite(elementsProbabilites){
       let sommepoid = 0 ;
       console.log('Trans ',trans)

        for (let k = 0 ; k < elementsProbabilites.length; k++) {
            console.log('elementsProbabilites[k].trans',elementsProbabilites[k].trans)
            if (elementsProbabilites[k].trans !== -1){
           sommepoid = sommepoid + trans[elementsProbabilites[k].trans].Poid ;}
        }
        console.log('sommepoid',sommepoid);
        let rand = Math.floor(Math.random() * (sommepoid - 0 ) + 0);
        //rand = rand % sommepoid ;
        console.log('rand',rand);
        let rendemtab = [] ; let i = 0;
        for (let k = 0; k < elementsProbabilites.length; k++) {
            if (elementsProbabilites[k].trans !== -1){
            for(let j= 0 ; j< trans[elementsProbabilites[k].trans].Poid ; j++ ){
                rendemtab[i] = elementsProbabilites[k].trans ;
                i++ ;
            }
          }   
         }
         console.log('rendmtab',rendemtab)
        let idtransfracnchit = elementsProbabilites.findIndex(element => element.trans === rendemtab[rand]);
        console.log('idtransfracnchit',idtransfracnchit)
         return idtransfracnchit ;
        //return rand ;
       /* while ( i < sommepoid) {
            for(let j= 0 ; j< this.Transitions[elementsProbabilites[k].trans].poid ; j++ ){
                rendemtab[i] = elementsProbabilites[j].trans ;
                i++ ;
            }
           
        }*/
        /*   
        let rand = Math.random() * (100 - 0) + 0;
        console.log('rand',rand);
        let cumulativeProbability = 0;
        console.log('elementsProbabilites',elementsProbabilites)
        for (let i = 0; i < elementsProbabilites.length; i++) {
            cumulativeProbability += elementsProbabilites[i].proba;  // je dois faire un .proba
            rand = rand / 100 ;
            if (rand <= cumulativeProbability) {
                return i; // Retourner l'indice de l'élément choisi
            }
        } // Dans le cas improbable où rien n'a été choisi, retourner null
        return i;*/
    }
      let tabniv = tabniveau();
      console.log('tabniv',tabniv)
        let i = 0 , indice = -1 , j = 0 ,transfranchit = 0;
        let tabstep = [] ; 
        console.log('nivlong ',tabniv.length)
      while( i < tabniv.length){
        if( tabniv[i].length !== 0 && tabniv[0][0].trans !== -1){
        indice =  choisirTransAvecProbabilite(tabniv[i]);
        console.log('indice',indice);
        transfranchit = tabniv[i][indice].trans ; // je peut l'afficher après dans la séquence des transition franchit 
        tabtrans[j] =   transfranchit 
        console.log('transfranchit',transfranchit)
        tabstep[j] = tabniv[i][indice].marsuiv
        console.log('hi ',tab.findIndex(element => element.mar === tabstep[j]))
        if(tab.findIndex(element => element.mar === tabstep[j] ) !== -1){
            i = tab.findIndex(element => element.mar === tabstep[j]) ;
            //if(i === 0){ i = 1}
            console.log('i = ',i)
        }
        //if(tabstep[j] === tabniv[i] ){i=tabniv.length}
      // 
        //else{  }
    }else { i=tabniv.length }
         console.log('tabstep[',j,']',tabstep[j]); console.log('i after  = ',i)
        j++ ; 
        if( j === 30){ i= tabniv.length}  ///// C'est içi qu'on doit changer le nombre d'hteration dans la simulation 
    }
      console.log('tabstep',tabstep)
      return tabstep ;
} 

quasiVivante(Idtrans, arc) {
    let    quasi = false; 
       for (let i = 0; i < arc.length; i++) {
           const transition = arc[i].j1;
               console.log(transition) ; 
              
           if ( transition === Idtrans) {
              quasi = true; 
           }
       }
       
       return quasi ;
   }
 Reseauquasivivant(liste_trans,arc)
{
   
   let Qvivant = true ;
  for(let i=0;i<liste_trans.length;i++)
  {
     if(liste_trans[i].tsup === false){
    if(this.quasiVivante(liste_trans[i].IdT,arc)==false)
    {
       
       Qvivant = false ; 
       break ;
    } 
    
  }
}
  return Qvivant ; 
}/*
TransitionVivante(Idtrans, arc){
   let   vivante  = true; 
   for (let i = 0; i < arc.length; i++) {
       const transition = arc[i].j1;
       // Vérifier si transition est null avant d'accéder à sa propriété IdT
       if (transition.IdT !== Idtrans) {
          vivante = false; 
          break;
       }
   }
   
   return vivante ;

}
 Reseauivivant(liste_trans,arc)
{

   let reseauvivant = true ;
  for(let i=0;i<liste_trans.length;i++)
  { 
    if(this.TransitionVivante(liste_trans[i].IdT,arc)==false)
    {
        reseauvivant = false ; 
       break ;
    }  
  }
 
  
  return reseauvivant ; 
} 
  compareTableaux(tab1, tab2) {
   if (tab1.length !== tab2.length) {
       return false;
   }

   for (let i = 0; i < tab1.length; i++) {
       if (tab1[i] !== tab2[i]) {
           return false;
       }
   }

   return true;
}*/
Renitiable(arc,tab){
   let R=false ;
  // let tabf = []
   let tabf = new Array(tab.length).fill(-1);
  // let m = 0 , n = 0  , cpt = 0 ;
   for( let m = 0 ; m< arc.length ; m++   ){
    console.log('holla')
    if ( tabf[arc[m].ji] === -1  ){
        tabf[arc[m].ji] = [];
        tabf[arc[m].ji].push(arc[m].jf) ; 
       // console.log('tabf inside ',tabf);
    }else{ 
        //console.log('tabf[arc[',m,'].ji]',tabf[arc[m].ji])
        if(! tabf[arc[m].ji].includes(arc[m].jf) ){
        tabf[arc[m].ji].push(arc[m].jf) ; }
   }}
   console.log('tabf',tabf) ;
   let trouv = false , m = 0 ;  let tab0 = []
   while(  m< tabf.length    ){
    let element = tabf[m] ;
    console.log('element',element)
    if(element === -1){
        R = false ;  
        trouv = true ;
    }else if ( element.includes(0)){
        tab0.push(m); // les element qui ont des marquages fils = 0  
        R = true ;
        trouv = true ;
    } 
    m++ ;
   }

   if (trouv === true ){
     if( R === false){
    return false ;
   }else{ // le traitement du tabf 
      tab0.forEach(element1 =>{
        arc.forEach(element2 =>{
            if(element2.jf === element1 ){
                if( !tab0.includes(element2.jf)){
                tab0.push(element2.jf)}
            }
        })
      })
      console.log('tab0',tab0);
      tab.forEach( element3 =>{
        if (!tab0.includes(tab.indexOf(element3))){
               return false 
        }
      })
      return true ; 
   }
   }else{
    return false ;
   }
}



///////INFINI////////
/// FRANCHISSABLE 
Franchissable (M,Idtrans) {
    let franch = true ;
    let i = 0;
    while(franch===true && i < this.NpPlaces){
    let element = this.Pre[i][Idtrans];
    if (element !== 0){
        //LE CAS D UN ARC INHIBITEUR
        if(element.type === true){
            if (M[i] >= element.poid){
                franch=false;
            }
        }
        else {
           if (M[i] < element.poid) {
            franch = false;
           } 
        }
    }
    i++;
    }
   
    return franch;
    }
     inhibReseau() {
        let inhib = false;
        let i =0;
        for (let i = 0; i < this.Pre.length; i++) {
        for (let j = 0; j < this.Pre[i].length; j++) {
           if (this.Pre[i][j].type === true){return true}
        }
    }
    return false;
    }
    InibPure(){
        let i = 0;
        let PlaceExclude = [] ;
        while (i < this.NpPlaces){
            let j = 0;
            let kifkif = true;
        while ((j < this.NpTrans)&&(kifkif)) {
           if ((this.Pre[i][j].type===false)){
            kifkif=false}
            j++;
        }
        if (kifkif===true){ PlaceExclude.push(i)}
        i++
    }
    for (let k = 0; k < this.NpPlaces; k++){
        if (this.places[k].psup===true){
            if (!PlaceExclude.includes(k)){
                PlaceExclude.push(k) }  
        }
    }
    
    return PlaceExclude;
    }
    
    
    rep(M,listM){
        let i = 0;
        let trouv=false;
        let kifkif=true;
        while( (i < listM.length) && (!trouv)) {
            let j = 0; 
            let kifkif=true;
        while ( j < this.NpPlaces) {
           if (listM[i][j]!=M[j]){kifkif=false}
           j++;
        }
        if (kifkif===true){trouv=true}
        i++;
    }
    return trouv;
    }
    inihbTrans(transi){
        let ind = transi.GetTransId();
        for (let i = 0; i < this.Pre.length; i++) {
        if((this.Pre[i][ind]).type===true){return true}; 
    }
    return false;
    }
    getMarc(t,N){
    let ind=t.GetTransId();
    let M = [];
                for (let i = 0; i < this.NpPlaces; i++) {
                     M[i] = N[i] -this.Pre[i][t.GetTransId()].poid + this.Post[i][t.GetTransId()].poid;
                     if (M[i]<0){ M[i]=0;}
                }
    return M;
    
    } 
    ////EQUALS
     tabEqual(arr1, arr2) {
        // Check if arrays have the same length
        if (arr1.length !== arr2.length) {
            return false;
        }
    
        // Check if each corresponding element is equal
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
    
        // If all elements are equal, arrays are equal
        return true;
    }
    
    
    
    
     infini(M, listM, cpt, archs,k,tran,viv) {
        let couverture = false; // Declare couverture outside the if statement
        let exclude = [];
        let egal = false;
          exclude = this.InibPure();
          if (!(this.inhibReseau())) {
            let k = cpt;
            let i = archs.length;
            console.log('iii');
            console.log(i);
            let Ma = [];
            while ((!egal)&&(!couverture) && (i >= 0)) {
                Ma = listM[k];
                if(this.tabEqual(Ma,M)){egal=true}
                console.log('here is M');
                console.log(M);
                console.log('here is Ma');
                console.log(Ma);
                console.log('egal',egal);
               
                let couverture1 = true;
                let h = 0;
                while ((h < this.NpPlaces) && (couverture1)) {
                    if (exclude.includes(h)) {
                         h++;
                          continue;
                       }
                       else{
                    if (M[h] < Ma[h]) {
                        couverture1 = false;
                    }
                    h++;}
                }
                if (couverture1) {
                    couverture = false;
                    let j = 0;
                    while ((!couverture) && (j < this.NpPlaces)) {
                        if (exclude.includes(j)) {
                         j++;
                          continue;
                       }
                       else{
                        if (Ma[j] < M[j]) {
                            couverture = true;
                        }
                        j++;}
                    }
                }
                if((!couverture)&&(!egal)) {
                    i--; console.log('dagi');
                    console.log('here in infini');
                    let trouv = false;
                    let mytransition;
                    while ((!trouv) && (i >= 0)) {
                        if (archs[i].des === k) {
                           
                            mytransition=archs[i].t;
                            console.log('mytransition');
                            console.log(mytransition);
                            if (!viv.includes(mytransition)) {
                                viv.push(mytransition);
                               }
                            k = archs[i].src;
                            trouv = true;
                            i++;
                        }
                        i--;
                    }
                }
            }
        }
        else {
            
            let k = cpt;
            let i = archs.length;
            let Ma = [];
            let pile = [];
            let couverture2 = false;
            let egal=false;
            if (exclude.length===this.NpPlaces){couverture2=true}
            else{
            while ((!egal)(!couverture2) && (i >= 0)) {
                Ma = listM[k];
                if(this.tabEqual(Ma,M)){egal=true}
                console.log('here is M');
                console.log(M);
                console.log('here is Ma');
                console.log(Ma);
                console.log('egal',egal);
    
                let couverture1 = true;
                let h = 0;
                while ((h < this.NpPlaces) && (couverture1)) {
                    if (exclude.includes(h)) {
                         h++;
                          continue;
                       }
                    else{
                    if (M[h] < Ma[h]) {
                        couverture1 = false;
                    }
                    h++;}
                }
                if (couverture1) {
                    couverture2 = false;
                    let j = 0;
                    while ((!couverture2) && (j < this.NpPlaces)) {
                        if (exclude.includes(j)) {
                         j++;
                          continue;
                       }
                       else{
                        if (Ma[j] < M[j]) {
                            couverture2 = true;
                        }
                        j++;}
                    }
                }
                if ((!couverture2)&&(!egal)) {
                    i--;
                    console.log('here in infini');
                    let trouv = false;
                    let mytransition;
                    while ((!trouv) && (i >= 0)) {
                        if (archs[i].des === k) {
                            mytransition=archs[i].t;
                            if (!viv.includes(mytransition)) {
                                viv.push(mytransition);
                               }
                            k = archs[i].src;
                            trouv = true;
                            pile.push(i);
                            i++;
                        }
                       i--;
                    }
                }
            }
        }
         if (!couverture2){ couverture = couverture2}
         else {
           let N=M;
           let stop=false;
           let fin= false;
          
            if(pile.lenght>0) {let s=pile.pop();}
           else {
            console.log('trans');
            console.log(tran);
            let lastinib=this.inihbTrans(tran);
                    if (lastinib){
                       let  lastfranc=this.Franchissable(N,tran.GetTransId());
                        if (!lastfranc){stop=true; }
                        else{N=this.getMarc(tran,N); fin=true}
                     }
                     else{N=this.getMarc(tran,N);
                        ///PEUT VERIFIER SI LE NOUVEAU MARQUAGE EST M
                        fin=true;
                }
    
           }
    
           while((!stop)&&(!fin)){
            console.log('s');
            console.log(s);
            let tra=archs[s].t;
            console.log(idtran);
            console.log(tra);
    
             let  inhib=this.inihbTrans(tra);
              if (inhib){
               let  franc=this.Franchissable(N,archs[s].t.GetTransId());
                if (!franc){ stop = true;}
                else{N=this.getMarc(archs[s].t,N);}
              }
              else{
                N=this.getMarc(archs[s].t,N);
              }
              if ((!stop)&&(pile.lenght>0)){
                s=pile.pop();
              }
              else{
                if ((!stop)&&(pile.lenght===0)){
                    let lastinib=this.inihbTrans(tran);
                    if (lastinib){
                        let lastfranc=this.Franchissable(N,tran.GetTransId());
                        if (!lastfranc){stop=true; }
                        else{N=this.getMarc(tran,N); fin=true}
                     }
                     else{N=this.getMarc(tran,N);
                        ///PEUT VERIFIER SI LE NOUVEAU MARQUAGE EST M
                        fin=true;
                }
                }
              }
    
           }
           couverture=fin;
         }
        }
        return { infin:couverture, var2:viv,kif:egal };
    }
    
    
    
    
    marquageTillInfini(M0){
    
        //don t forget le traitement des places supprimme dans les marquages
        let viv = [];
        let cpt=0;
        let k=1;
        let N = [];
        N=M0;
        let listM = [];
        let archs = [];
        let { infin = false, var2 = [],kif=false } = {};
    
        console.log('di la pricipal lenght ines');
        console.log(archs.length);
         listM.push(M0);
        
          let repe = false ;
         while ((cpt<listM.length)&& (!infin) && (!repe)){
             N = listM[cpt];
             console.log('la mere');
             console.log(N);
            let index = 0; 
            let stop=false;
             while ((index<this.NpTrans)&& (!infin) && (!repe)&&(!stop) ){
               if ((!(this.Transitions[index].tsup)) && (this.Franchissable(N,this.Transitions[index].IdT)) &&(!stop))  {
                console.log('franchi');
                console.log(this.Transitions[index].GetTransId());
                let M = [];          
               for (let i = 0; i < this.NpPlaces; i++) {
                   M[i] = N[i] -this.Pre[i][this.Transitions[index].GetTransId()].poid + this.Post[i][this.Transitions[index].GetTransId()].poid;
                   if (M[i]<0){ M[i]=0;}
                }
                console.log('HERE IS M');
                console.log(M);
                let tran= this.Transitions[index]; 
                viv.push(tran);
               ({ infin , var2,kif } = this.infini(M,listM,cpt,archs,k,tran,viv));
                repe=this.rep(M,listM);
                console.log('infin');
                console.log(infin);
                console.log('repe');
                console.log(repe);
                if ((!infin) && (!repe)){
                  listM.push(M) ;
                  console.log('ListM');
                  console.log(listM);
                  archs.push({src:cpt,des:k,t:this.Transitions[index]}) ;
                  k++;
                }
                else{stop = true;}
               }
              index++;
             }
             console.log('cpt');
            console.log(cpt);
            cpt++;
         }
         return infin ;
    }
    
    transnonsup(){
        let nonsup= [] ; 
        for (let i = 0; i < this.Transitions.length; i++) {
          if (this.Transitions[i].GetTranssup()===false){nonsup.push(this.Transitions[i])} ;
    }
    return nonsup;
    }
    //BLOQUAGE
   nonbloc(M0){
    //don t forget le traitement des places supprimme dans les marquages
    let cpt=0;
    let k=1;
    let N = [];
    N=M0;
    let listM = [];
    let archs = [];
     listM.push(M0);
     let vivacite = true;
    
      let repe = false ;
      let nonBloquage= true;
      let viv = [];
      let { infin = false, var2 = [] ,kif=false } = {};
    
     while ((cpt<listM.length)&& (nonBloquage)){
         N = listM[cpt];
         console.log('la mere');
         console.log(N);
        let index = 0;
        nonBloquage=false;
         while (index<this.NpTrans){
           if ((!(this.Transitions[index].tsup)) && (this.Franchissable(N,this.Transitions[index].IdT)))  {
            nonBloquage=true;
            console.log('nonbloc');
            console.log(nonBloquage);
            console.log('franchi');
            console.log(this.Transitions[index].GetTransId());
            let M = [];          
           for (let i = 0; i < this.NpPlaces; i++) {
               M[i] = N[i] -this.Pre[i][this.Transitions[index].GetTransId()].poid + this.Post[i][this.Transitions[index].GetTransId()].poid;
               if (M[i]<0){ M[i]=0;}
            }
           // console.log('HERE IS M');
            //console.log(M);
            let tran= this.Transitions[index];
            viv = [];
            viv.push(tran);
            console.log('viv',viv);
            ({ infin , var2,kif } =this.infini(M,listM,cpt,archs,k,tran,viv));
          console.log('var2',var2);
            //TRAITEMENT DE VIVACITE
            console.log('kif',kif);
            if ((vivacite)&&((infin)||(kif))){
            let vivOfIds = var2.map(obj => obj.IdT);
            let trannonsu =this.transnonsup();
            let trOfIds= trannonsu.map(obj => obj.IdT);
            let egal=this.arraysEqual(trOfIds,vivOfIds);
            if (!egal){vivacite=false}}
            ////////////////////////////////
            repe=this.rep(M,listM);
            console.log('infin');
            console.log(infin);
            console.log('repe');
            console.log(repe);
            if ((!infin) && (!repe)){
              listM.push(M) ;
              console.log('ListM');
              console.log(listM);
              archs.push({src:cpt,des:k,t:this.Transitions[index]}) ;
              k++;
            }
           
           }
          index++;
         }
         console.log('cpt');
        console.log(cpt);
        cpt++;
     }
     if(!nonBloquage){vivacite=false;}
     return {var3:nonBloquage,var4:vivacite}
    }
    arraysEqual(arr1, arr2) {
        // Check if arrays have the same length
        if (arr1.length !== arr2.length) {
            return false;
        }
        arr1.sort();
        arr2.sort();
    
        // Compare sorted arrays element by element
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
    
        // If all elements match, arrays are equal
        return true;
    }
/*
    per(tab,tab2)
{
  let i;
  let ex;
  let j;
  let k=0;
  let mir;
  let per=true;
  for(i=0;i<tab.length;i++)
  {
      ex=0;
      for(j=0;j<this.Transitions.length;j++)
      {
         if(tab[i].fr[j]===1 && this.Transitions[j].tsup!==true )
         {
             ex++;
         }
      }
      if(ex>1)
      {
          tab2.push(tab[i]);
      }
  }
  for(i=0;i<tab2.length;i++)
  {
      k=0;
      for(j=0;j<this.Transitions.length;j++)
      {
          if(k===0 && tab2[i].fr[j]===1)
          {
              mir=this.getNextState(j,tab2[i].mar);
              k++;
              console.log('mir',mir)
          }
          else if(tab2[i].fr[j]===1 && k>0)
          {
              if(this.getNextState(j,tab2[i].mar)!=mir)
              {
                 per=false;
              }
          }
      }
  }
  return per;
}*/

per(tab,arc){ // my old one 
    let i;
    let ex;
    let j;
    let tab2 = [] ;
    for(i=0;i<tab.length;i++)
    {
        ex=0;
        for(j=0;j<this.Transitions.length;j++)
        {
           if(tab[i].fr[j]===1 && this.Transitions[j].tsup!==true )
           {
               ex++;
           }
        }
        if(ex>1)
        {
            tab2.push(tab[i]); // les marquages qui ont des transitions franchissables bloqué 
        }
    } 
    console.log(" arc in per ",arc)
    console.log('tab2 in persistance ',tab2,'tab2.lenght',tab2.length);
    let tabtransfr = []; let tabt = [];   i = 0; 
    let persistance = true ; let tabw = [] ;
    while( i<tab2.length && persistance === true ){
        console.log('hereee');
        console.log('tab2[i].fr',tab2[i].fr) ;let k = 0;
       for(let l =0 ; l< tab2[i].fr.length ; l++ ){
        let element = tab2[i].fr[l] ;let id ; console.log('element',element)
            if(element ===1){
                console.log('here')
                id = l ;
            tabtransfr[k] = id;
           tabt[k]=0;
              k ++ ;
        }} 
       //tabtransetat = new Array(tabtransfr.length).fill(0);
        // le tableau des transition franchit appartir de ce marquage
            let m = 0 ;
            console.log('tabtransfr start ',tabtransfr);console.log('tabtransetat start ',tabt);
     while( m < tabtransfr.length && persistance === true ){ 
       let t = tabtransfr[m] ;console.log("t ="+t,"tab.indexOf(tab2[i])",tab.indexOf(tab2[i]));
       let index = arc.findIndex(element => (element.ji === tab.indexOf(tab2[i]) && element.j1 === t));
    console.log('m = ',m)
    //tabtransetat.splice(m,0,1) ;
     console.log('index',index,"elemnt index ",tab[arc[index].jf]);
    tabt[m] = 1 ;
    console.log('tabt ',tabt);

    
      // while(index !== -1 && stopit === false ) { 
        //let  filtertab =  tabtransfr.filter(element => tab[arc[index].jf].fr.includes(element));// l'intersection entre l'etat suivant des trans franchissable et l'etat precedent 
        let filtertab = [] ;
        tabtransfr.forEach(element =>{
            if(tab[arc[index].jf].fr[element] !== -1){
                console.log("i am in //////// element ",element)
                filtertab.push(element)
            }
        })
        console.log('filtertab',filtertab,'tabtransfr[',m,']',tabtransfr[m] ) ; 
        if(filtertab.length !== 0){
            for(let j = 0 ; j< tabtransfr.length ; j ++ ){ console.log('tabt[',j,']',tabt[j],'filtertab.includes(tabtransfr[j])',filtertab.includes(tabtransfr[j]))
            // if(tabw[findIndex(element => ( element.ji=== tab.indexOf(tab2[i]) ))]] filtertab[j].idt)
                if((tabt[j] === 0) && (filtertab.includes(tabtransfr[j]) === false)){
                    persistance = false; 
                    console.log('condition vérifié ')
                }}
            
        }else{
            persistance = false; 
        }
        tabt[m] = 0 ;
   // }          
    m ++ }  i++   }   
    return persistance;          
 }

}