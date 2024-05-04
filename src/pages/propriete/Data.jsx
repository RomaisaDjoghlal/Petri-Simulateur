export const props = [
    {
        type : "Bornitude",
        definition : "  Une place Pi est bornée pour un marquage initial Mo, si pour tout marquage accessible à partir de Mo, le nombre de jetons dans Pi est fini. Ainsi Un reseau de Petri est borné pour un marquage initial Mo, si toutes ses places sont bornées pour Mo.",
    },
    {
        type : "Vivacité",
        definition : "  Une transition Tj est vivante pour un marquage initial Mo, si pour tout marquage accessible, il existe une séquence de franchissement qui contienne Tj à partir de ce marquage accessible. Ainsi un reseau de Petri est vivant pour un marquage initial Mo si toutes ses transitions sont vivantes pour Mo.",
    },
    {
        type : "Réinitiabilité",
        definition : "  On dit qu'un réseau de Petri R possède un état d'accueil Mi, si Mi est accessible de tous les marquages accessibles du marquage initial Mo. Un reseau de Petri est réinitialisable pour un marquage initial Mo si Mo est un état d'accueil.",
    },
    {
        type : "Non blocage",
        definition : "  Un blocage (ou état puits) est un marquage M où aucune transition est franchissable.Un reseau de Petri est sans blocage pour un marquage initial Mo si aucun marquage accessible Mi n'est un blocage.",
    },
    {
        type : "Persistance",
        definition : "saaaluuutt",
    },
] 