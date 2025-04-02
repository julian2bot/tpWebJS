import Detail from "../view/Detail.js";

export default class DetailUtils{
    static characteristicsCalculus(){
        let head = Detail.equipments.head[Detail.centerIndex.head];
        let torso = Detail.equipments.torso[Detail.centerIndex.torso];  
        let pants = Detail.equipments.pants[Detail.centerIndex.pants];    
        let shoes = Detail.equipments.shoes[Detail.centerIndex.shoes]; 
       
        let strength = 50 + head.strength + torso.strength + pants.strength + shoes.strength;
        let stamina = 50 + head.stamina + torso.stamina + pants.stamina + shoes.stamina;
        let agility = 50 + head.agility + torso.agility + pants.agility + shoes.agility;
    
        DetailUtils.updateStrength(strength);
        DetailUtils.updateStamina(stamina);
        DetailUtils.updateAgility(agility);
        console.log(strength, stamina, agility);
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
}