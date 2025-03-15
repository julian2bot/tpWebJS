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


    static async render(search = false, name = ""){
        let characters= [];

         if(!search){
            characters = await CharacterProvider.getCharacters();
        }
        else{
            characters = await CharacterProvider.getSearchCharactersbyName(name);
        }

        window.CharacterProvider = CharacterProvider;
        window.MesFavoris = MesFavoris;


        let view = `
            <style>main{ margin-top:6rem; display: flex; justify-content: space-around; gap:10px; flex-wrap: wrap;}</style>

            
            <div class="seachBar">
                <input type="text" id="searchCharacters">
                
                <button onclick="CharacterProvider.getSearchCharacters()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 21L14.9497 14.9497M14.9497 14.9497C16.2165 13.683 17 11.933 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C11.933 17 13.683 16.2165 14.9497 14.9497Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </button>
                <button onclick="window.location.reload()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.87 10.5046L10.8204 12.4504L9.76045 13.511L6 9.75456L9.76045 5.99805L10.8204 7.05871L8.87 9.00456H18V18H11.9532V16.5H16.5V10.5046H8.87Z" fill="#1F2328"/>
                    </svg>        
                </button>

            </div>`;

        for (let character of characters) {


            await Listing.updateEquipments(character.head, character.torso, character.pants, character.shoes);

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