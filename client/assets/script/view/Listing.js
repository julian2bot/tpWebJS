import CharacterProvider from "../utils/CharacterProvider.js";
import BaseView from './BaseView.js';
import {ENDPOINT} from '../config.js'

export default class Listing extends BaseView{
    static async render(){
        let characters = await CharacterProvider.getCharacters();
        let view = `<style>main{ margin-top:3rem; display: flex; justify-content: space-around; gap:10px; flex-wrap: wrap;}</style>`
        characters.forEach(character=>{
            let equipement = {
                head : { "id": 1, "name": "head1", "img": "casque.png", "strength": 10, "stamina": 0, "agility": -2 },
                torso :  { "id": 1, "name": "torso1", "img": "haut.png", "strength": 10, "stamina": 0, "agility": -2 },
                pants : { "id": 1, "name": "pants1", "img": "bas.png", "strength": -3, "stamina": 7, "agility": -2 },
                shoes : { "id": 1, "name": "shoes1", "img": "basbas.png", "strength": 10, "stamina": 0, "agility": -2 }
            };
            view += `<div class="card">
            <h3>Nom du Personnage</h3>
            <div class="image">
                <div class="persoPreview">
                    <img src="../assets/img/perso.png">
                    <img class="imgPersoCasque" src="${ENDPOINT + '/equipement/head/' + character.head}">
                    <img class="imgPersoHaut" src="${ENDPOINT + '/equipement/torso/' + character.torso}">
                    <img class="imgPersoBas" src="${ENDPOINT + '/equipement/pants/' + character.pants}">
                    <img class="imgPersoBasBas" src="${ENDPOINT + '/equipement/shoes/' + character.shoes}">
                </div>
            </div>
            <div class="stats">
                <div class="stat">
                    <img src="../assets/img/strength.png" class="iconCaract" alt="strength">
                    <span>${50 + equipement.head.strength + equipement.torso.strength + equipement.pants.strength + equipement.shoes.strength}%</span>
                </div>
                <div class="stat">
                    <img src="../assets/img/stamina.png" class="iconCaract" alt="stamina">
                    <span>${50 + equipement.head.stamina + equipement.torso.stamina + equipement.pants.stamina + equipement.shoes.stamina}%</span>
                </div>
                <div class="stat">
                    <img src="../assets/img/agility.png" class="iconCaract" alt="agility">
                    <span>${50 + equipement.head.agility + equipement.torso.agility + equipement.pants.agility + equipement.shoes.agility}%</span>
                </div>
            </div>
        </div>
        `;
        });
        return view;
    }

    // static async init(){
    //     await Character.updateEquipments();
    //     let characters = await CharacterProvider.getCharacters();

    //     // characters.forEach(character => {
    //     //     character.addCard();
    //     // });
    // }
}