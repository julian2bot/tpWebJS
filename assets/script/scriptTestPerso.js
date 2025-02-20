
import { getListePerso} from "./perso.js"
console.log("scriptTest OK")

// affiche toutes les cartes de perso
function initCardPerso(){
    let listePerso = getListePerso()   

    listePerso.forEach(caractPerso => {
        caractPerso.ajouterCard();
    });
}

initCardPerso();