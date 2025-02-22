// CECI EST UNE VERSION 0
// tout est dans un seul fichier pas rangé etc juste pour tester dans un premier temps et faire une V0 (un peu maquette) du site

import {indicesCentre, listeCasques, listeHauts, listeBas, listeBasBas} from "./perso.js"


// let monPerso = new Perso("name")

// calcul des caracteristiques du personnage quand il y a un changement
function calculCaracteristique(){
    let casque = listeCasques[indicesCentre.indexCentreCasque];
    let haut = listeHauts[indicesCentre.indexCentreHaut];  
    let bas = listeBas[indicesCentre.indexCentreBas];    
    let basBas = listeBasBas[indicesCentre.indexCentreBasBas]; 
   
    let force = 50 + casque.force + haut.force + bas.force + basBas.force;
    let endurance = 50 + casque.endurance + haut.endurance + bas.endurance + basBas.endurance;
    let souplaise = 50 + casque.souplaise + haut.souplaise + bas.souplaise + basBas.souplaise;

    majForce(force);
    majEndurance(endurance);
    majSouplaise(souplaise);
}

// change la valeur de la var force dans le css
function majForce(force){
    let r = document.querySelector(':root');
    r.style.setProperty('--progress-force', `${force}%`);
}

// change la valeur de la var endurance dans le css
function majEndurance(endurance){
    let r = document.querySelector(':root');
    r.style.setProperty('--progress-endurance', `${endurance}%`);
}

// change la valeur de la var souplaise dans le css
function majSouplaise(souplaise){
    let r = document.querySelector(':root');
    r.style.setProperty('--progress-souplaise', `${souplaise}%`);
}

// affiche le personnage
function updateDisplay() {
    let imgGaucheHaut = document.querySelector("#gauchePreview .haut");
    let imgCentreHaut = document.getElementById("haut");
    let imgDroiteHaut = document.querySelector("#droitePreview .haut");

    let totalHaut = listeHauts.length;
    
    let indexGaucheHaut = (indicesCentre.indexCentreHaut - 1 + totalHaut) % totalHaut;
    let indexDroiteHaut = (indicesCentre.indexCentreHaut + 1) % totalHaut;

    
    imgGaucheHaut.src = listeHauts[indexGaucheHaut].src;
    imgCentreHaut.src = listeHauts[indicesCentre.indexCentreHaut].src;
    imgDroiteHaut.src = listeHauts[indexDroiteHaut].src;
    
    
    
    let imgGaucheBas = document.querySelector("#gauchePreview .bas");
    let imgCentreBas = document.getElementById("bas");
    let imgDroiteBas = document.querySelector("#droitePreview .bas");

    let totalBas = listeBas.length;
    
    let indexGaucheBas = (indicesCentre.indexCentreBas - 1 + totalBas) % totalBas;
    let indexDroiteBas = (indicesCentre.indexCentreBas + 1) % totalBas;


    imgGaucheBas.src = listeBas[indexGaucheBas].src;
    imgCentreBas.src = listeBas[indicesCentre.indexCentreBas].src;
    imgDroiteBas.src = listeBas[indexDroiteBas].src;


    calculCaracteristique();
}

// update au moment du clique sur le bouton
function updatePreviewHautDroite(){
    indicesCentre.indexCentreHaut = (indicesCentre.indexCentreHaut + 1) % listeHauts.length;
    updateDisplay();
}

// update au moment du clique sur le bouton
function updatePreviewHautGauche(){
    indicesCentre.indexCentreHaut = (indicesCentre.indexCentreHaut - 1) % listeHauts.length
    if(indicesCentre.indexCentreHaut < 0){
        indicesCentre.indexCentreHaut = listeHauts.length - 1
    }
    updateDisplay();
}

// update au moment du clique sur le bouton
function updatePreviewBasDroite(){
    indicesCentre.indexCentreBas = (indicesCentre.indexCentreBas + 1) % listeBas.length;
    updateDisplay();
}

// update au moment du clique sur le bouton
function updatePreviewBasGauche(){
    indicesCentre.indexCentreBas = (indicesCentre.indexCentreBas - 1) % listeBas.length
    if(indicesCentre.indexCentreBas < 0){
        indicesCentre.indexCentreBas = listeBas.length - 1
    }
    updateDisplay();
}

// initialise les boutons et l'affichage
function init(){

    updateDisplay();

    document.querySelector("#droite").addEventListener("click", (event) => {
        if (event.target.closest(".haut")) {
            updatePreviewHautDroite();
        }else if(event.target.closest(".bas")){
            updatePreviewBasDroite();
            
        }
    });
    
    document.querySelector("#gauche").addEventListener("click", (event) => {
        if (event.target.closest(".haut")) {
            updatePreviewHautGauche();
        }else if(event.target.closest(".bas")){
            updatePreviewBasGauche();
            
        }
    });
    

}


// init l'affichage
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
        init();
    });
} else {
    init();
}
