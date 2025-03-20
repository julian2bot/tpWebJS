import EquipmentProvider from '../utils/EquipmentProvider.js';
import CharacterProvider from '../utils/CharacterProvider.js';
import CharacterManagement from '../utils/CharacterManagement.js';
import BaseView from './BaseView.js';
import UserManagment from '../utils/UserManagement.js';
import Utils from '../utils/Utils.js';
import { ENDPOINT } from '../config.js';

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
            <style>main{ margin-top:3rem; display: flex; justify-content: space-around;}</style>
            <aside>
                <ul>
                    <div class="stat"><img loading="lazy" src="../assets/img/strength.png" class="iconCaract" alt="strength"> <div class="slider" id="F"><p>Strength</p></div></div>
                    <div class="stat"><img loading="lazy" src="../assets/img/stamina.png" class="iconCaract" alt="stamina"> <div class="slider" id="E"><p>Stamina</p></div></div>
                    <div class="stat"><img loading="lazy" src="../assets/img/agility.png" class="iconCaract" alt="agility"> <div class="slider" id="S"><p>Agility</p></div></div>
                </ul>
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
            <aside>
                <form id='createCharacter' action="">
                    <label for="name">Nom Perso</label>
                    <input id='inputName' type="text" name="name" placeholder="Michel">
                    <input id='createCharacterButton' type="submit" value="Créer">
                </form>
            </aside>`
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
        // console.log(strength, stamina, agility);
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
        r.style.setProperty('--progress-souplaise', `${agility}%`);
    }
    
    // affiche le personnage
    static updateDisplay() {
        let imgGaucheHaut = document.querySelector("#gauchePreview .haut");
        let imgCentreHaut = document.getElementById("haut");
        let imgDroiteHaut = document.querySelector("#droitePreview .haut");
    
        let totalHaut = Detail.equipments.torso.length;
        
        let indexGaucheHaut = (Detail.centerIndex.torso - 1 + totalHaut) % totalHaut;
        let indexDroiteHaut = (Detail.centerIndex.torso + 1) % totalHaut;
    
        
        imgGaucheHaut.src = ENDPOINT+Detail.equipments.torso[indexGaucheHaut].img;
        imgCentreHaut.src = ENDPOINT+Detail.equipments.torso[Detail.centerIndex.torso].img;
        imgDroiteHaut.src = ENDPOINT+Detail.equipments.torso[indexDroiteHaut].img;
        
        
        
        let imgGaucheBas = document.querySelector("#gauchePreview .bas");
        let imgCentreBas = document.getElementById("bas");
        let imgDroiteBas = document.querySelector("#droitePreview .bas");
    
        let totalBas = Detail.equipments.pants.length;
        
        let indexGaucheBas = (Detail.centerIndex.pants - 1 + totalBas) % totalBas;
        let indexDroiteBas = (Detail.centerIndex.pants + 1) % totalBas;
    
    
        imgGaucheBas.src = ENDPOINT+Detail.equipments.pants[indexGaucheBas].img;
        imgCentreBas.src = ENDPOINT+Detail.equipments.pants[Detail.centerIndex.pants].img;
        imgDroiteBas.src = ENDPOINT+Detail.equipments.pants[indexDroiteBas].img;
    
    
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
            if (event.target.closest(".haut")) {
                Detail.updatePreviewHautDroite();
            }else if(event.target.closest(".bas")){
                Detail.updatePreviewBasDroite();
            }
        });
        
        document.querySelector("#gauche").addEventListener("click", (event) => {
            if (event.target.closest(".haut")) {
                Detail.updatePreviewHautGauche();
            }else if(event.target.closest(".bas")){
                Detail.updatePreviewBasGauche();
                
            }
        });

        document.getElementById("createCharacterButton").addEventListener("click", (event)=>{
            event.preventDefault();
            console.log(Detail.centerIndex)
            CharacterManagement.createOrUpdateCharacter(
                document.getElementById("inputName").value,
                Detail.equipments.head[Detail.centerIndex.head].id,
                Detail.equipments.torso[Detail.centerIndex.torso].id,
                Detail.equipments.pants[Detail.centerIndex.pants].id,
                Detail.equipments.shoes[Detail.centerIndex.shoes].id,
                UserManagment.getUsername(),
                character ? character.id : undefined
            )
        })
    }

}