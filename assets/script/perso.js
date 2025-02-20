
export class Equipement{
    constructor(type, name, src,force, endurance, souplaise){
        this.type = type;
        this.name = name;
        this.src = "../assets/img/" + src;
        this.force = force ?? 0;
        this.endurance = endurance ?? 0;
        this.souplaise = souplaise ?? 0;
    }
}

export class Casque extends Equipement{
    constructor(name, src, force, endurance, souplaise){
        super("Casque",name, src, force, endurance, souplaise)
    }   
}


export class Haut extends Equipement{
    constructor(name, src, force, endurance, souplaise){
        super("Haut", name, src, force, endurance, souplaise)
    }   
}


export class Bas extends Equipement{
    constructor(name, src, force, endurance, souplaise){
        super("Bas",name, src, force, endurance, souplaise)
    }   
}


export class BasBas extends Equipement{
    constructor(name, src, force, endurance, souplaise){
        super("Basbas",name, src, force, endurance, souplaise)
    }   
}



export function getListeHaut(){
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


export function getListeCasque(){
    let casques = [
        new Casque("haut1", "haut.png", 10, 0, -2),
        new Casque("haut2", "haut2.png", -3, 7, -2),
        new Casque("haut3", "haut3.png", 5, -6, 8),
    ]
    return casques;
}
export function getListeBas(){
    let bas = [
        new Bas("bas1", "bas.png", -3, 7, -2),
        new Bas("bas2", "bas2.png", -9, 3, 10),
        new Bas("bas3", "bas3.png", 7, 2, -5),
        new Bas("bas4", "bas4.png",  4, -8, -1),
        new Bas("bas5", "bas5.png", 10, -7, 0),

    ]
    return bas;
}
export function getListeBasBas(){
    let basBas = [
        new BasBas("haut1", "haut.png", 10, 0, -2),
        new BasBas("haut2", "haut2.png", -3, 7, -2),
        new BasBas("haut3", "haut3.png", 5, -6, 8),
    ]
    return basBas;
}


export class Perso{
    constructor(name, indexCasque, indexHaut, indexBas, indexBasbas){
        this.name = name;
        this.indexCasque = indexCasque;
        this.indexHaut = indexHaut;
        this.indexBas = indexBas;
        this.indexBasbas = indexBasbas;
        this.valCaract = {}
    }


    creerCartePerso() {
        let divCarte = document.createElement("div");
        divCarte.classList.add("card");
    
        let h3 = document.createElement("h3");
        h3.textContent = this.name;
    
        let divImage = document.createElement("div");
        divImage.classList.add("image");
    
        let divStats = document.createElement("div");
        divStats.classList.add("stats");
    
        this.calculCaracteristique();
    
        const statsList = [
            { src: "../assets/img/force.png", alt: "force", value: this.valCaract.forceValue },
            { src: "../assets/img/endurance.png", alt: "endurance", value: this.valCaract.enduranceValue },
            { src: "../assets/img/souplesse.png", alt: "souplesse", value: this.valCaract.souplaiseValue }
        ];
    
        statsList.forEach(stat => {
            let divStat = document.createElement("div");
            divStat.classList.add("stat");
    
            let imgStat = document.createElement("img");
            imgStat.src = stat.src;
            imgStat.classList.add("iconCaract");
            imgStat.alt = stat.alt;
    
            let spanValue = document.createElement("span");
            spanValue.textContent = `${stat.value}%`;
    
            divStat.appendChild(imgStat);
            divStat.appendChild(spanValue);
            divStats.appendChild(divStat);
        });
    
        divCarte.appendChild(h3);
        divCarte.appendChild(divImage);
        divCarte.appendChild(divStats);
    
        return divCarte;
    }
    
    ajouterCard(){
        document.getElementById("app").appendChild(this.creerCartePerso());
    }

    calculCaracteristique(){
        let casque = listeCasques[this.indexCasque];
        let haut = listeHauts[this.indexHaut];  
        let bas = listeBas[this.indexBas];    
        let basBas = listeBasBas[this.indexBasbas]; 
       
        let force = 50 + casque.force + haut.force + bas.force + basBas.force;
        let endurance = 50 + casque.endurance + haut.endurance + bas.endurance + basBas.endurance;
        let souplaise = 50 + casque.souplaise + haut.souplaise + bas.souplaise + basBas.souplaise;
        
        this.valCaract = {
            forceValue: force,
            enduranceValue: endurance,
            souplaiseValue: souplaise,
        };
    }
}



export function getListePerso(){
    let Persos = [
        new Perso("perso1", 0, 0,1,0),
        new Perso("perso2", 0, 1,1,0),
        new Perso("perso3", 0, 0,0,0),
        new Perso("perso3", 0, 3,3,0),
        new Perso("perso3", 0, 2,2,0),
        new Perso("perso3", 0, 1,0,0)
    ]
    return Persos;
}




// export let indexCentreCasque = 0;
// export let indexCentreHaut = 0;
// export let indexCentreBas = 0;
// export let indexCentreBasBas = 0;

export let listeCasques = getListeCasque();
export let listeHauts = getListeHaut();
export let listeBas = getListeBas();
export let listeBasBas = getListeBasBas();


export const indicesCentre = {
    indexCentreCasque: 0,
    indexCentreHaut: 0,
    indexCentreBas: 0,
    indexCentreBasBas: 0
};
