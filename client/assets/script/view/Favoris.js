import EquipmentProvider from '../utils/EquipmentProvider.js';
import CharacterProvider from "../utils/CharacterProvider.js";
import BaseView from './BaseView.js';
import {ENDPOINT} from '../config.js'
import MesFavoris from '../utils/MesFavoris.js';
import Character from './Character.js';

// Class pour render les favoris de l'utilisateur (Local storage)
export default class Favoris extends BaseView{

    static async render(){
        let characters = await CharacterProvider.getCharactersFav();
        let view = `<style>
            main{
                margin:2.2rem;  
                margin-top:3rem; 
                display: flex; 
                justify-content: 
                space-around; 
                gap:10px; 
                flex-wrap: wrap;
            }

        </style>`
        window.MesFavoris = MesFavoris;

        for (let character of characters) {
            view += await Character.renderCharacter(character, false, true);
        }
        return view;
    }
}