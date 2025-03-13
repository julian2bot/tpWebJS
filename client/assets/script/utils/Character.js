import EquipmentProvider from '../utils/EquipmentProvider.js';

export default class Character{
    static equipments = {
            heads : [],
            torso : [],
            pants : [],
            shoes : []
        };
    
    static async updateEquipments(){
        let equipments = await EquipmentProvider.getEquipement();
        console.log(equipments);
        Character.equipments.heads = equipments.head;
        Character.equipments.torso = equipments.torso;
        Character.equipments.pants = equipments.pants;
        Character.equipments.shoes = equipments.shoes;
    }

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

        imgPersoCasque.src = Character.equipments.heads[this.indexCasque].img;
        imgPersoHaut.src = Character.equipments.torso[this.indexHaut].img;  
        imgPersoBas.src = Character.equipments.pants[this.indexBas].img;    
        imgPersoBasBas.src = Character.equipments.shoes[this.indexBasbas].img;
        

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
            { src: "../assets/img/strength.png", alt: "strength", value: this.valCaract.forceValue },
            { src: "../assets/img/stamina.png", alt: "stamina", value: this.valCaract.enduranceValue },
            { src: "../assets/img/agility.png", alt: "agility", value: this.valCaract.souplaiseValue }
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
        let casque = Character.equipments.heads[this.indexCasque];
        let haut = Character.equipments.torso[this.indexHaut];  
        let bas = Character.equipments.pants[this.indexBas];    
        let basBas = Character.equipments.shoes[this.indexBasbas]; 
       
        let strength = 50 + casque.strength + haut.strength + bas.strength + basBas.strength;
        let stamina = 50 + casque.stamina + haut.stamina + bas.stamina + basBas.stamina;
        let agility = 50 + casque.agility + haut.agility + bas.agility + basBas.agility;
        
        this.valCaract = {
            forceValue: strength,
            enduranceValue: stamina,
            souplaiseValue: agility,
        };
    }
}
