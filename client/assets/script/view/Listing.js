import EquipmentProvider from '../utils/EquipmentProvider.js';
import CharacterProvider from "../utils/CharacterProvider.js";
import BaseView from './BaseView.js';
import {ENDPOINT} from '../config.js'
import MesFavoris from '../utils/MesFavoris.js';
export default class Listing extends BaseView{
    static equipement = {
        heads : null,
        torso : null,
        pants : null,
        shoes : null
    };

    static async updateEquipments(heads, torso, pants, shoes){

        Listing.equipement.heads = await EquipmentProvider.getHeadsById(heads);
        Listing.equipement.torso = await EquipmentProvider.getTorsoById(torso);
        Listing.equipement.pants = await EquipmentProvider.getPantsById(pants);
        Listing.equipement.shoes = await EquipmentProvider.getShoesById(shoes);

    }


    static async render(){
        let characters = await CharacterProvider.getCharacters();
        // console.log(characters)
        let view = `<style>main{ margin-top:3rem; display: flex; justify-content: space-around; gap:10px; flex-wrap: wrap;}</style>`
        // characters.forEach(character=>{
        window.MesFavoris = MesFavoris;

        for (let character of characters) {

            await Listing.updateEquipments(character.head, character.torso, character.pants, character.shoes);
            // console.log(character)
            view += `<div class="card">
            <button id="${character.id}" class="hearts ${MesFavoris.estFavoris(character.id)}" onclick="MesFavoris.updateFavorites('${character.id}')">♥</button>
            
            <h3>${character.name}</h3>
            <div class="image">
                <div class="persoPreview">
                    <img loading="lazy" src="../assets/img/perso.png">
                    <img loading="lazy" class="imgPersoCasque" src="${ENDPOINT + Listing.equipement.heads.img}">
                    <img loading="lazy" class="imgPersoHaut" src="${ENDPOINT + Listing.equipement.torso.img}">
                    <img loading="lazy" class="imgPersoBas" src="${ENDPOINT + Listing.equipement.pants.img}">
                    <img loading="lazy" class="imgPersoBasBas" src="${ENDPOINT + Listing.equipement.shoes.img}">
                </div>
            </div>
            <div class="stats">
                <div class="stat">
                    <img loading="lazy" src="../assets/img/strength.png" class="iconCaract" alt="strength">
                    <span>${50 + Listing.equipement.heads.strength + Listing.equipement.torso.strength + Listing.equipement.pants.strength + Listing.equipement.shoes.strength}%</span>
                </div>
                <div class="stat">
                    <img loading="lazy" src="../assets/img/stamina.png" class="iconCaract" alt="stamina">
                    <span>${50 + Listing.equipement.heads.stamina + Listing.equipement.torso.stamina + Listing.equipement.pants.stamina + Listing.equipement.shoes.stamina}%</span>
                </div>
                <div class="stat">
                    <img loading="lazy" src="../assets/img/agility.png" class="iconCaract" alt="agility">
                    <span>${50 + Listing.equipement.heads.agility + Listing.equipement.torso.agility + Listing.equipement.pants.agility + Listing.equipement.shoes.agility}%</span>
                </div>
            </div>
        </div>
        `;
        // });
        }
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