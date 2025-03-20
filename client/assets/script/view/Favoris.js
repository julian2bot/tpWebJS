import EquipmentProvider from '../utils/EquipmentProvider.js';
import CharacterProvider from "../utils/CharacterProvider.js";
import BaseView from './BaseView.js';
import {ENDPOINT} from '../config.js'
import MesFavoris from '../utils/MesFavoris.js';

export default class Favoris extends BaseView{
    static equipement = {
        heads : null,
        torso : null,
        pants : null,
        shoes : null
    };

    static async updateEquipments(heads, torso, pants, shoes){

        Favoris.equipement.heads = await EquipmentProvider.getHeadsById(heads);
        Favoris.equipement.torso = await EquipmentProvider.getTorsoById(torso);
        Favoris.equipement.pants = await EquipmentProvider.getPantsById(pants);
        Favoris.equipement.shoes = await EquipmentProvider.getShoesById(shoes);

    }


    static async render(){
        let characters = await CharacterProvider.getCharactersFav();
        // console.log(characters)
        let view = `<style>main{margin:2.2rem;  margin-top:3rem; display: flex; justify-content: space-around; gap:10px; flex-wrap: wrap;}</style>`
        // characters.forEach(character=>{
        window.MesFavoris = MesFavoris;

        for (let character of characters) {

            await Favoris.updateEquipments(character.head, character.torso, character.pants, character.shoes);
            // console.log(character.id)
            view += `<div class="card">

            <button id="${character.id}" class="hearts ${MesFavoris.estFavoris(character.id)}" onclick="MesFavoris.updateFavorites('${character.id}', true)">♥</button>
            
            <h3>${character.name}</h3>
            <div class="image">
                <div class="persoPreview">
                    <img loading="lazy" src="../assets/img/perso.png">
                    <img loading="lazy" class="imgPersoCasque" src="${ENDPOINT + Favoris.equipement.heads.img}">
                    <img loading="lazy" class="imgPersoHaut" src="${ENDPOINT + Favoris.equipement.torso.img}">
                    <img loading="lazy" class="imgPersoBas" src="${ENDPOINT + Favoris.equipement.pants.img}">
                    <img loading="lazy" class="imgPersoBasBas" src="${ENDPOINT + Favoris.equipement.shoes.img}">
                </div>
            </div>
            <div class="stats">
                <div class="stat">
                    <img loading="lazy" src="../assets/img/strength.png" class="iconCaract" alt="strength">
                    <span>${50 + Favoris.equipement.heads.strength + Favoris.equipement.torso.strength + Favoris.equipement.pants.strength + Favoris.equipement.shoes.strength}%</span>
                </div>
                <div class="stat">
                    <img loading="lazy" src="../assets/img/stamina.png" class="iconCaract" alt="stamina">
                    <span>${50 + Favoris.equipement.heads.stamina + Favoris.equipement.torso.stamina + Favoris.equipement.pants.stamina + Favoris.equipement.shoes.stamina}%</span>
                </div>
                <div class="stat">
                    <img loading="lazy" src="../assets/img/agility.png" class="iconCaract" alt="agility">
                    <span>${50 + Favoris.equipement.heads.agility + Favoris.equipement.torso.agility + Favoris.equipement.pants.agility + Favoris.equipement.shoes.agility}%</span>
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