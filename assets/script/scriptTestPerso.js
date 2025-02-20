
// gros copier collé car pour l'instant c'est que des tests mais faire un fichier aautre puis tout export (me demande pas pourquoi j'ai fait comme ca la mais chuut)
import { getListePerso} from "./perso.js"


function initCardPerso(){
    let listePerso = getListePerso()   

    listePerso.forEach(caractPerso => {
        caractPerso.ajouterCard();
    });
}

initCardPerso();