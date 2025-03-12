export class Character{
    /**
     * un personnage avec son equipements et un nom
     * 
     * @param {string} name 
     * @param {int} indexCasque 
     * @param {int} indexHaut 
     * @param {int} indexBas 
     * @param {int} indexBasbas 
     */
    constructor(name, indexCasque, indexHaut, indexBas, indexBasbas){
        this.name = name;
        this.indexCasque = indexCasque;
        this.indexHaut = indexHaut;
        this.indexBas = indexBas;
        this.indexBasbas = indexBasbas;
        this.valCaract = {}
    }

    // creer une carte avec les informations du perso
    createCard() {
        let divCarte = document.createElement("div");
        divCarte.classList.add("card");
    
        let h3 = document.createElement("h3");
        h3.textContent = this.name;
    
        let divImage = document.createElement("div");
        divImage.classList.add("image");

        let divPerso = document.createElement("div");
        divPerso.classList.add("persoPreview");

        let imgDuPerso = document.createElement("img");
        imgDuPerso.src = "../assets/img/perso.png";
        
        
        let imgPersoCasque = document.createElement("img");
        imgPersoCasque.classList.add("imgPersoCasque");
        let imgPersoHaut = document.createElement("img");
        imgPersoHaut.classList.add("imgPersoHaut");
        let imgPersoBas = document.createElement("img");
        imgPersoBas.classList.add("imgPersoBas");
        let imgPersoBasBas = document.createElement("img");
        imgPersoBasBas.classList.add("imgPersoBasBas");

        imgPersoCasque.src = listeCasques[this.indexCasque].src;
        imgPersoHaut.src = listeHauts[this.indexHaut].src;  
        imgPersoBas.src = listeBas[this.indexBas].src;    
        imgPersoBasBas.src = listeBasBas[this.indexBasbas].src;
        

        divPerso.appendChild(imgDuPerso);
        
        divPerso.appendChild(imgPersoCasque);
        divPerso.appendChild(imgPersoHaut);
        divPerso.appendChild(imgPersoBas);
        divPerso.appendChild(imgPersoBasBas);
        divImage.appendChild(divPerso);

        let divStats = document.createElement("div");
        divStats.classList.add("stats");
    
        this.characteristicsCalculus();
    
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
    
    // ajouter une carte sur la page
    addCard(){
        document.getElementById("app").appendChild(this.createCard());
    }

    // calcul du % de chaque caracteristique
    characteristicsCalculus(){
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
