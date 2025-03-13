import CharacterProvider from "../utils/CharacterProvider.js";
import Character from "../utils/Character.js";
import BaseView from './BaseView.js';
import ENDPOINT from '../config.js'

export default class Listing extends BaseView{
    static async render(){
        let characters = await CharacterProvider.getCharacters();
        return `<style>main{ margin-top:3rem; display: flex; justify-content: space-around; gap:10px; flex-wrap: wrap;}</style>
        ${characters.map(character=>
            `<div class="card">
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
                    <span>75%</span>
                </div>
                <div class="stat">
                    <img src="../assets/img/stamina.png" class="iconCaract" alt="stamina">
                    <span>60%</span>
                </div>
                <div class="stat">
                    <img src="../assets/img/agility.png" class="iconCaract" alt="agility">
                    <span>85%</span>
                </div>
            </div>
        </div>
        `
        ).join("\n")}
        `;
    }

    static async init(){
        await Character.updateEquipments();
        let characters = await CharacterProvider.getCharacters();

        // characters.forEach(character => {
        //     character.addCard();
        // });
    }
}