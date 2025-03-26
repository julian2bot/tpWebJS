import EquipmentProvider from '../utils/EquipmentProvider.js';
import CharacterProvider from '../utils/CharacterProvider.js';
import CharacterManagement from '../utils/CharacterManagement.js';
import BaseView from './BaseView.js';
import UserManagment from '../utils/UserManagement.js';
import Utils from '../utils/Utils.js';
import { ENDPOINT } from '../config.js';
import { showPopUp } from '../utils/popUp.js';

export default class Detail extends BaseView{
    static updating = false;

    static centerIndex = {
        head: 0,
        torso: 0,
        pants: 0,
        shoes: 0 
    };

    static equipments = {
        head : [],
        torso : [],
        pants : [],
        shoes : []
    };

    static async updateEquipments(){
        let equipments = await EquipmentProvider.getEquipement();

        Detail.equipments.head = equipments.head;
        Detail.equipments.torso = equipments.torso;
        Detail.equipments.pants = equipments.pants;
        Detail.equipments.shoes = equipments.shoes;
        // console.log(Detail.equipments)
    }

    static async render(){
        if(! UserManagment.isConnected()){
            return "Veuillez vous connecter";
        }
        return `
            <style>
            main{ 
                margin-top:3rem; 
                display: flex; 
                justify-content: space-around;
            }
                
            /*
            #nameUser {
                position: absolute;
                top: 6rem;
                }
            */
            @media (max-width: 720px) {
                main{ 
                    display:block;
                }        
            }
            </style>
            <aside>
                <ul>
                    <div class="stat"><img loading="lazy" src="../assets/img/strength.png" class="iconCaract" alt="strength"> <div class="slider" id="F"><p>Force</p></div></div>
                    <div class="stat"><img loading="lazy" src="../assets/img/stamina.png" class="iconCaract" alt="stamina"> <div class="slider" id="E"><p>Endurance</p></div></div>
                    <div class="stat"><img loading="lazy" src="../assets/img/agility.png" class="iconCaract" alt="agility"> <div class="slider" id="S"><p>Agilité</p></div></div>
                </ul>

                <form id='createCharacter' action="">
                    <label for="name">Nom Perso</label>
                    <input id='inputName' class="inputRecherche" type="text" name="name" placeholder="Michel" required>
                    <input id='createCharacterButton' type="submit" value="Créer">
                </form>
            </aside>
            <section id="editPerso">
                <div  id="perso">
                    <div id="gauchePreview">
                        <img loading="lazy" class="casque" src="" alt="">
                        <img loading="lazy" class="haut" src="" alt="">
                        <img loading="lazy" class="bas" src="" alt="">
                        <img loading="lazy" class="basbas" src="" alt="">
                    </div>        
                    
                    <div id="gauche">
                        <img loading="lazy" class="casque" src="../assets/img/arrowReverse.png" alt="">
                        <img loading="lazy" class="haut" src="../assets/img/arrowReverse.png" alt="">
                        <img loading="lazy" class="bas" src="../assets/img/arrowReverse.png" alt="">
                        <img loading="lazy" class="basbas" src="../assets/img/arrowReverse.png" alt="">
                    </div>        
                    
                    <img loading="lazy" src="../assets/img/perso.png" alt="">
                    
                    <img loading="lazy" id="casque" src="" alt="">
                    <img loading="lazy" id="haut" src="" alt="">
                    <img loading="lazy" id="bas" src="" alt="">
                    <img loading="lazy" id="basbas" src="" alt="">

                    <div id="droite">
                        <img loading="lazy" class="casque" src="../assets/img/arrow.png" alt="">
                        <img loading="lazy" class="haut" src="../assets/img/arrow.png" alt="">
                        <img loading="lazy" class="bas" src="../assets/img/arrow.png" alt="">
                        <img loading="lazy" class="basbas" src="../assets/img/arrow.png" alt="">
                    </div>  

                    <div id="droitePreview">
                        <img loading="lazy" class="casque" src="" alt="">
                        <img loading="lazy" class="haut" src="" alt="">
                        <img loading="lazy" class="bas" src="" alt="">
                        <img loading="lazy" class="basbas" src="" alt="">
                    </div>        
                </div>
            </section>
`
    }

    static characteristicsCalculus(){
        let head = Detail.equipments.head[Detail.centerIndex.head];
        let torso = Detail.equipments.torso[Detail.centerIndex.torso];  
        let pants = Detail.equipments.pants[Detail.centerIndex.pants];    
        let shoes = Detail.equipments.shoes[Detail.centerIndex.shoes]; 
       
        let strength = 50 + head.strength + torso.strength + pants.strength + shoes.strength;
        let stamina = 50 + head.stamina + torso.stamina + pants.stamina + shoes.stamina;
        let agility = 50 + head.agility + torso.agility + pants.agility + shoes.agility;
    
        Detail.updateStrength(strength);
        Detail.updateStamina(stamina);
        Detail.updateAgility(agility);
        console.log(strength, stamina, agility);
    }
    
    // change la valeur de la var strength dans le css
    static updateStrength(strength){
        let r = document.querySelector(':root');
        r.style.setProperty('--progress-strength', `${strength}%`);
    }
    
    // change la valeur de la var stamina dans le css
    static updateStamina(stamina){
        let r = document.querySelector(':root');
        r.style.setProperty('--progress-stamina', `${stamina}%`);
    }
    
    // change la valeur de la var souplaise dans le css
    static updateAgility(agility){
        let r = document.querySelector(':root');
        r.style.setProperty('--progress-agility', `${agility}%`);
        console.log(r)
    }
    
    // affiche le personnage
    static updateDisplay() {
        // CASQUE
        let imgGaucheCasque = document.querySelector("#gauchePreview .casque");
        let imgCentreCasque = document.getElementById("casque");
        let imgDroiteCasque = document.querySelector("#droitePreview .casque");
        
        let totalCasque = Detail.equipments.head.length;
        
        let indexGaucheCasque = (Detail.centerIndex.head - 1 + totalCasque) % totalCasque;
        let indexDroiteCasque = (Detail.centerIndex.head + 1) % totalCasque;
        
        
        imgGaucheCasque.src = ENDPOINT+Detail.equipments.head[indexGaucheCasque].img;
        imgCentreCasque.src = ENDPOINT+Detail.equipments.head[Detail.centerIndex.head].img;
        imgDroiteCasque.src = ENDPOINT+Detail.equipments.head[indexDroiteCasque].img;
        
        
        // HAUT
        let imgGaucheHaut = document.querySelector("#gauchePreview .haut");
        let imgCentreHaut = document.getElementById("haut");
        let imgDroiteHaut = document.querySelector("#droitePreview .haut");
        
        let totalHaut = Detail.equipments.torso.length;
        
        let indexGaucheHaut = (Detail.centerIndex.torso - 1 + totalHaut) % totalHaut;
        let indexDroiteHaut = (Detail.centerIndex.torso + 1) % totalHaut;
        
        
        imgGaucheHaut.src = ENDPOINT+Detail.equipments.torso[indexGaucheHaut].img;
        imgCentreHaut.src = ENDPOINT+Detail.equipments.torso[Detail.centerIndex.torso].img;
        imgDroiteHaut.src = ENDPOINT+Detail.equipments.torso[indexDroiteHaut].img;
        
        
        
        // BAS
        let imgGaucheBas = document.querySelector("#gauchePreview .bas");
        let imgCentreBas = document.getElementById("bas");
        let imgDroiteBas = document.querySelector("#droitePreview .bas");
    
        let totalBas = Detail.equipments.pants.length;
        
        let indexGaucheBas = (Detail.centerIndex.pants - 1 + totalBas) % totalBas;
        let indexDroiteBas = (Detail.centerIndex.pants + 1) % totalBas;
    
    
        imgGaucheBas.src = ENDPOINT+Detail.equipments.pants[indexGaucheBas].img;
        imgCentreBas.src = ENDPOINT+Detail.equipments.pants[Detail.centerIndex.pants].img;
        imgDroiteBas.src = ENDPOINT+Detail.equipments.pants[indexDroiteBas].img;
    
    
        // Shoes
        let imgGaucheShoes = document.querySelector("#gauchePreview .basbas");
        let imgCentreShoes = document.getElementById("basbas");
        let imgDroiteShoes = document.querySelector("#droitePreview .basbas");
    
        let totalShoes = Detail.equipments.shoes.length;
        
        let indexGaucheShoes = (Detail.centerIndex.shoes - 1 + totalShoes) % totalShoes;
        let indexDroiteShoes = (Detail.centerIndex.shoes + 1) % totalShoes;
    
    
        imgGaucheShoes.src = ENDPOINT+Detail.equipments.shoes[indexGaucheShoes].img;
        imgCentreShoes.src = ENDPOINT+Detail.equipments.shoes[Detail.centerIndex.shoes].img;
        imgDroiteShoes.src = ENDPOINT+Detail.equipments.shoes[indexDroiteShoes].img;
    
            
        Detail.characteristicsCalculus();
    }
    
    // update au moment du clique sur le bouton
    static updatePreviewHautDroite(){
        Detail.centerIndex.torso = (Detail.centerIndex.torso + 1) % Detail.equipments.torso.length;
        Detail.updateDisplay();
    }
    
    // update au moment du clique sur le bouton
    static updatePreviewHautGauche(){
        Detail.centerIndex.torso = (Detail.centerIndex.torso - 1) % Detail.equipments.torso.length
        if(Detail.centerIndex.torso < 0){
            Detail.centerIndex.torso = Detail.equipments.torso.length - 1
        }
        Detail.updateDisplay();
    }

    // update au moment du clique sur le bouton
    static updatePreviewCasqueDroite(){
        Detail.centerIndex.head = (Detail.centerIndex.head + 1) % Detail.equipments.head.length;
        Detail.updateDisplay();
    }
    
    // update au moment du clique sur le bouton
    static updatePreviewCasqueGauche(){
        Detail.centerIndex.head = (Detail.centerIndex.head - 1) % Detail.equipments.head.length
        if(Detail.centerIndex.head < 0){
            Detail.centerIndex.head = Detail.equipments.head.length - 1
        }
        Detail.updateDisplay();
    }
    
    // update au moment du clique sur le bouton
    static updatePreviewBasDroite(){
        Detail.centerIndex.pants = (Detail.centerIndex.pants + 1) % Detail.equipments.pants.length;
        Detail.updateDisplay();
    }
    
    // update au moment du clique sur le bouton
    static updatePreviewBasGauche(){
        Detail.centerIndex.pants = (Detail.centerIndex.pants - 1) % Detail.equipments.pants.length
        if(Detail.centerIndex.pants < 0){
            Detail.centerIndex.pants = Detail.equipments.pants.length - 1
        }
        Detail.updateDisplay();
    }

    // update au moment du clique sur le bouton
    static updatePreviewShoesDroite(){
        Detail.centerIndex.shoes = (Detail.centerIndex.shoes + 1) % Detail.equipments.shoes.length;
        Detail.updateDisplay();
    }
    
    // update au moment du clique sur le bouton
    static updatePreviewShoesGauche(){
        Detail.centerIndex.shoes = (Detail.centerIndex.shoes - 1) % Detail.equipments.shoes.length
        if(Detail.centerIndex.shoes < 0){
            Detail.centerIndex.shoes = Detail.equipments.shoes.length - 1
        }
        Detail.updateDisplay();
    }


    static async init(){
        if(! UserManagment.isConnected()){
            return ;
        }
        let request = Utils.parseRequestURL();
        await Detail.updateEquipments();

        let character = null;

        try {
            if(request.id!=null){
            character = await CharacterProvider.getCharactersByID(request.id);
            console.log(character);
            // Définition du perso pris comme base
            if(character){
                let index = 0;
                for (const element in Detail.centerIndex) {
                    index = 0;
                    for(const element2 of Detail.equipments[element]){
                        if(element2.id == character[element]){
                            Detail.centerIndex[element] = index;
                            console.log(element, index)
                            break;  
                        }
                        index++;
                    }
                }

                // Modifier ou créer
                if(character.creator == UserManagment.getUsername()){
                    document.getElementById("inputName").value = character.name;
                    document.getElementById("createCharacterButton").value = 'Modifier';
                    let supp = document.createElement("button");
                    supp.textContent = "Supprimer";
                    supp.onclick = async (event)=>{
                        event.preventDefault();
                        let succes = await CharacterManagement.deleteCharacter(request.id);
                        showPopUp(succes ? "Personnage supprimé avec succès" : "Suppression impossible", succes);
                        window.location.href = "#/listing";
                    }
                    document.getElementById("createCharacter").appendChild(supp);
                    Detail.updating = true;
                }
                else{
                    Detail.updating = false;
                }
            }
            else{
                Detail.updating = false;

                Detail.centerIndex = {
                    head: 0,
                    torso: 0,
                    pants: 0,
                    shoes: 0 
                };
            }
        }

            
        } catch (error) {}

        Detail.updateDisplay();
    
        document.querySelector("#droite").addEventListener("click", (event) => {
            event.target.classList.add("arrowAnime");
            
            if (event.target.closest(".casque")) {
                Detail.updatePreviewCasqueDroite();
            }else if (event.target.closest(".haut")) {
                Detail.updatePreviewHautDroite();
            }else if(event.target.closest(".bas")){
                Detail.updatePreviewBasDroite();
            }else if(event.target.closest(".basbas")){
                Detail.updatePreviewShoesDroite();
            }
            setTimeout(() => {
                event.target.classList.remove("arrowAnime");
            }, "500");
        });
        
        document.querySelector("#gauche").addEventListener("click", (event) => {
            
            event.target.classList.add("arrowAnime");

            if(event.target.closest(".casque")){
                Detail.updatePreviewCasqueGauche();    
            }
            else if (event.target.closest(".haut")) {
                Detail.updatePreviewHautGauche();
            }else if(event.target.closest(".bas")){
                Detail.updatePreviewBasGauche();
            }else if(event.target.closest(".basbas")){
                Detail.updatePreviewShoesGauche();
            }
            setTimeout(() => {
                event.target.classList.remove("arrowAnime");
            }, "500");
              

        });

        document.getElementById("createCharacterButton").addEventListener("click", (event)=>{
            if(document.getElementById("inputName").value == ""){
                showPopUp("Veuillez donner un nom", false);
                return;
            }
            else{
                event.target.disabled = true;
                event.preventDefault();
                console.log(Detail.centerIndex)
                console.log( Detail.equipments.head[Detail.centerIndex.head].id)
                let succes = CharacterManagement.createOrUpdateCharacter(
                    document.getElementById("inputName").value,
                    Detail.equipments.head[Detail.centerIndex.head].id,
                    Detail.equipments.torso[Detail.centerIndex.torso].id,
                    Detail.equipments.pants[Detail.centerIndex.pants].id,
                    Detail.equipments.shoes[Detail.centerIndex.shoes].id,
                    UserManagment.getUsername(),
                    (character.id && character.creator == UserManagment.getUsername()) ? character.id : undefined
                )
                let message = "";
                if(succes){
                    if(character.creator == UserManagment.getUsername()){
                        message = "Personnage modifié avec succès";
                    }
                    else{
                        message = "Personnage crée avec succès";
                    }
                }
                else{
                    message = "Création impossible"
                }
                showPopUp(message, succes);
                window.location.href = "#/listing";
            }
        })
    }

}