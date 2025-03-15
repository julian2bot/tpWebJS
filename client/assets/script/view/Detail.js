import EquipmentProvider from '../utils/EquipmentProvider.js';
import BaseView from './BaseView.js';
import { ENDPOINT } from '../config.js';

export default class Detail extends BaseView{
    static centerIndex = {
        indexHead: 0,
        indexTorso: 0,
        indexPants: 0,
        indexShoes: 0
    };

    static equipments = {
        heads : [],
        torso : [],
        pants : [],
        shoes : []
    };

    static async updateEquipments(){
        let equipments = await EquipmentProvider.getEquipement();
        // console.log(equipments);
        Detail.equipments.heads = equipments.head;
        Detail.equipments.torso = equipments.torso;
        Detail.equipments.pants = equipments.pants;
        Detail.equipments.shoes = equipments.shoes;
        // console.log(Detail.equipments)
    }

    static async render(){
        return `
            <aside>
                <ul>
                    <div class="stat"><img src="../assets/img/strength.png" class="iconCaract" alt="strength"> <div class="slider" id="F"><p>Strength</p></div></div>
                    <div class="stat"><img src="../assets/img/stamina.png" class="iconCaract" alt="stamina"> <div class="slider" id="E"><p>Stamina</p></div></div>
                    <div class="stat"><img src="../assets/img/agility.png" class="iconCaract" alt="agility"> <div class="slider" id="S"><p>Agility</p></div></div>
                </ul>
            </aside>
            <section id="editPerso">
                <div  id="perso">
                    <div id="gauchePreview">
                        <img class="casque" src="" alt="">
                        <img class="haut" src="" alt="">
                        <img class="bas" src="" alt="">
                        <img class="basbas" src="" alt="">
                    </div>        
                    
                    <div id="gauche">
                        <img class="casque" src="../assets/img/arrowReverse.png" alt="">
                        <img class="haut" src="../assets/img/arrowReverse.png" alt="">
                        <img class="bas" src="../assets/img/arrowReverse.png" alt="">
                        <img class="basbas" src="../assets/img/arrowReverse.png" alt="">
                    </div>        
                    
                    <img src="../assets/img/perso.png" alt="">
                    
                    <img id="casque" src="" alt="">
                    <img id="haut" src="" alt="">
                    <img id="bas" src="" alt="">
                    <img id="basbas" src="" alt="">


                    <div id="droite">
                        <img class="casque" src="../assets/img/arrow.png" alt="">
                        <img class="haut" src="../assets/img/arrow.png" alt="">
                        <img class="bas" src="../assets/img/arrow.png" alt="">
                        <img class="basbas" src="../assets/img/arrow.png" alt="">
                    </div>  

                    <div id="droitePreview">
                        <img class="casque" src="" alt="">
                        <img class="haut" src="" alt="">
                        <img class="bas" src="" alt="">
                        <img class="basbas" src="" alt="">
                    </div>        
                </div>
            </section>`
    }

    static characteristicsCalculus(){
        let head = Detail.equipments.heads[Detail.centerIndex.indexHead];
        let torso = Detail.equipments.torso[Detail.centerIndex.indexTorso];  
        let pants = Detail.equipments.pants[Detail.centerIndex.indexPants];    
        let shoes = Detail.equipments.shoes[Detail.centerIndex.indexShoes]; 
       
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
        
        let indexGaucheHaut = (Detail.centerIndex.indexTorso - 1 + totalHaut) % totalHaut;
        let indexDroiteHaut = (Detail.centerIndex.indexTorso + 1) % totalHaut;
    
        
        imgGaucheHaut.src = ENDPOINT+Detail.equipments.torso[indexGaucheHaut].img;
        imgCentreHaut.src = ENDPOINT+Detail.equipments.torso[Detail.centerIndex.indexTorso].img;
        imgDroiteHaut.src = ENDPOINT+Detail.equipments.torso[indexDroiteHaut].img;
        
        
        
        let imgGaucheBas = document.querySelector("#gauchePreview .bas");
        let imgCentreBas = document.getElementById("bas");
        let imgDroiteBas = document.querySelector("#droitePreview .bas");
    
        let totalBas = Detail.equipments.pants.length;
        
        let indexGaucheBas = (Detail.centerIndex.indexPants - 1 + totalBas) % totalBas;
        let indexDroiteBas = (Detail.centerIndex.indexPants + 1) % totalBas;
    
    
        imgGaucheBas.src = ENDPOINT+Detail.equipments.pants[indexGaucheBas].img;
        imgCentreBas.src = ENDPOINT+Detail.equipments.pants[Detail.centerIndex.indexPants].img;
        imgDroiteBas.src = ENDPOINT+Detail.equipments.pants[indexDroiteBas].img;
    
    
        Detail.characteristicsCalculus();
    }
    
    // update au moment du clique sur le bouton
    static updatePreviewHautDroite(){
        Detail.centerIndex.indexTorso = (Detail.centerIndex.indexTorso + 1) % Detail.equipments.torso.length;
        Detail.updateDisplay();
    }
    
    // update au moment du clique sur le bouton
    static updatePreviewHautGauche(){
        Detail.centerIndex.indexTorso = (Detail.centerIndex.indexTorso - 1) % Detail.equipments.torso.length
        if(Detail.centerIndex.indexTorso < 0){
            Detail.centerIndex.indexTorso = Detail.equipments.torso.length - 1
        }
        Detail.updateDisplay();
    }
    
    // update au moment du clique sur le bouton
    static updatePreviewBasDroite(){
        Detail.centerIndex.indexPants = (Detail.centerIndex.indexPants + 1) % Detail.equipments.pants.length;
        Detail.updateDisplay();
    }
    
    // update au moment du clique sur le bouton
    static updatePreviewBasGauche(){
        Detail.centerIndex.indexPants = (Detail.centerIndex.indexPants - 1) % Detail.equipments.pants.length
        if(Detail.centerIndex.indexPants < 0){
            Detail.centerIndex.indexPants = Detail.equipments.pants.length - 1
        }
        Detail.updateDisplay();
    }
    
    // initialise les boutons et l'affichage
    static async init(){
        await Detail.updateEquipments();

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
    }
}