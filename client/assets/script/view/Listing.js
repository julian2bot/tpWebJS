import CharacterProvider from "../utils/CharacterProvider.js";
import Character from "../utils/Character.js";
import BaseView from './BaseView.js';

export default class Listing extends BaseView{
    static async render(){
        return "<style>main{ margin-top:3rem; display: flex; justify-content: space-around; gap:10px; flex-wrap: wrap;}</style>";
    }

    static async init(){
        await Character.updateEquipments();
        let characters = await CharacterProvider.getCharacters();

        characters.forEach(character => {
            character.addCard();
        });
    }
}