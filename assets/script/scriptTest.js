// CECI EST UNE VERSION 0
// tout est dans un seul fichier pas rangé etc juste pour tester dans un premier temps et faire une V0 (un peu maquette) du site


class Equipement{
    constructor(type, name, src,force, endurance, souplaise){
        this.type = type;
        this.name = name;
        this.src = "../assets/img/" + src;
        this.force = force ?? 0;
        this.endurance = endurance ?? 0;
        this.souplaise = souplaise ?? 0;
    }
}

class Casque extends Equipement{
    constructor(name, src, force, endurance, souplaise){
        super("Casque",name, src, force, endurance, souplaise)
    }   
}


class Haut extends Equipement{
    constructor(name, src, force, endurance, souplaise){
        super("Haut", name, src, force, endurance, souplaise)
    }   
}


class Bas extends Equipement{
    constructor(name, src, force, endurance, souplaise){
        super("Bas",name, src, force, endurance, souplaise)
    }   
}


class BasBas extends Equipement{
    constructor(name, src, force, endurance, souplaise){
        super("Basbas",name, src, force, endurance, souplaise)
    }   
}


function getListeHaut(){
    let haut1 = [
        new Haut("haut1", "haut.png", 10, 0, -2),
        new Haut("haut2", "haut2.png", -3, 7, -2),
        new Haut("haut3", "haut3.png", 5, -6, 8),
        new Haut("haut4", "haut4.png", -9, 3, 10),
        new Haut("haut5", "haut5.png", 4, -8, -1),
        new Haut("haut6", "haut6.png", 7, 2, -5),
        new Haut("haut7", "haut7.png", -6, -3, 9),
        new Haut("haut8", "haut8.png", 10, -7, 0)
    ]
    
    return haut1;
}


function getListeCasque(){
    let casques = [
        new Casque("haut1", "haut.png", 10, 0, -2),
        new Casque("haut2", "haut2.png", -3, 7, -2),
        new Casque("haut3", "haut3.png", 5, -6, 8),
    ]
    return casques;
}
function getListeBas(){
    let bas = [
        new Bas("haut1", "haut.png", 10, 0, -2),
        new Bas("haut2", "haut2.png", -3, 7, -2),
        new Bas("haut3", "haut3.png", 5, -6, 8),
    ]
    return bas;
}
function getListeBasBas(){
    let basBas = [
        new BasBas("haut1", "haut.png", 10, 0, -2),
        new BasBas("haut2", "haut2.png", -3, 7, -2),
        new BasBas("haut3", "haut3.png", 5, -6, 8),
    ]
    return basBas;
}




let indexCentreCasque = 0;
let indexCentreHaut = 0;
let indexCentreBas = 0;
let indexCentreBasBas = 0;

let listeCasques = getListeCasque();
let listeHauts = getListeHaut();
let listeBas = getListeBas();
let listeBasBas = getListeBasBas();
// let monPerso = new Perso("name")

function calculCaracteristique(){
    let casque = listeCasques[indexCentreCasque];
    let haut = listeHauts[indexCentreHaut];  
    let bas = listeBas[indexCentreBas];    
    let basBas = listeBasBas[indexCentreBasBas]; 
   
    let force = 50 + casque.force + haut.force + bas.force + basBas.force;
    let endurance = 50 + casque.endurance + haut.endurance + bas.endurance + basBas.endurance;
    let souplaise = 50 + casque.souplaise + haut.souplaise + bas.souplaise + basBas.souplaise;

    majForce(force);
    majEndurance(endurance);
    majSouplaise(souplaise);
}

function majForce(force){
    let r = document.querySelector(':root');
    r.style.setProperty('--progress-force', `${force}%`);

}

function majEndurance(endurance){
    let r = document.querySelector(':root');
    r.style.setProperty('--progress-endurance', `${endurance}%`);
}

function majSouplaise(souplaise){
    let r = document.querySelector(':root');
    r.style.setProperty('--progress-souplaise', `${souplaise}%`);
}

function updateDisplay() {
    let imgGaucheHaut = document.querySelector("#gauchePreview .haut");
    let imgCentreHaut = document.getElementById("haut");
    let imgDroiteHaut = document.querySelector("#droitePreview .haut");

    let total = listeHauts.length;
    
    let indexGauche = (indexCentreHaut - 1 + total) % total;
    let indexDroite = (indexCentreHaut + 1) % total;


    calculCaracteristique();

    imgGaucheHaut.src = listeHauts[indexGauche].src;
    imgCentreHaut.src = listeHauts[indexCentreHaut].src;
    imgDroiteHaut.src = listeHauts[indexDroite].src;
}

function updatePreviewHautDroite(){
    indexCentreHaut = (indexCentreHaut + 1) % listeHauts.length;
    updateDisplay();
}

function updatePreviewHautGauche(){
    indexCentreHaut = (indexCentreHaut - 1) % listeHauts.length
    if(indexCentreHaut < 0){
        indexCentreHaut = listeHauts.length - 1
    }
    updateDisplay();
}

function init(){

    updateDisplay();

    document.querySelector("#droite").addEventListener("click", (event) => {
        if (event.target.closest(".haut")) {
            updatePreviewHautDroite();
        }
    });
    
    document.querySelector("#gauche").addEventListener("click", (event) => {
        if (event.target.closest(".haut")) {
            updatePreviewHautGauche();
        }
    });
    

}



if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
        init();
    });
} else {
    init();
}
