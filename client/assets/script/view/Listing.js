import CharacterProvider from "../utils/CharacterProvider.js";

export default class Listing{
    static async render(){
        let characters = await CharacterProvider.getCharacters();

        characters.forEach(character => {
            character.addCard();
        });
    }
}