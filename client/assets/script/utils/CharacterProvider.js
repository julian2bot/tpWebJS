import { ENDPOINT } from "../config.js";
import Listing from "../view/Listing.js";
import MesFavoris from "./MesFavoris.js";
import Utils from "./Utils.js";
export default class CharacterProvider {
    // Get all
    static getCharacters = async (page=0, perPage=10) => {
        try {
            const response = await fetch(`${ENDPOINT}characters?_page=${page}&_per_page=${perPage}`);
            if (!response.ok) throw new Error("Erreur lors de la récupération des équipements");
            let t =  await response.json();
            console.log(t);
            return t;  
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    static getCharactersByPseudo = async (pseudo,page=1, perPage=10) => {
        try {
            const response = await fetch(`${ENDPOINT}characters?creator=${pseudo}&_page=${page}&_per_page=${perPage}`);
            if (!response.ok) throw new Error("Erreur lors de la récupération des équipements");
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    static getCharactersByPseudoOthers = async (pseudo, characterId, page=1, perPage=10) => {
        try {
            const response = await fetch(`${ENDPOINT}characters?creator=${pseudo}&_page=${page}&_per_page=${perPage}`);
            if (!response.ok) throw new Error("Erreur lors de la récupération des équipements");
            let json = await response.json();
            const CharactersSearch = json.data.filter(char =>
                !char.id.toLowerCase().includes(characterId.toLowerCase())
            );
            return CharactersSearch;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    static getCharactersByID = async (id) => {
        try {
            const response = await fetch(`${ENDPOINT}characters/${id}`);
            if (!response.ok) throw new Error("Erreur lors de la récupération du perso");
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    static getSearchCharacters = async ()=>{
        let name = document.getElementById("searchCharacters").value;

        window.location.href = `#/listing/${Utils.updateListingId(name=name)}`
    };

    static getCharactersFav = async () => {
        try {
            const favorites = MesFavoris.getFavoris();
            if (!favorites.length) return []; 

            // get all
            const characters = await CharacterProvider.getCharacters()
            
            // chercher les favoris car json server et leurs 'OR' marche pas 
            const favoriteCharacters = characters.filter(char => favorites.includes(char.id));
    
            return favoriteCharacters;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    

    
    static getSearchCharactersbyName = async (name) => {
        try {
            if (!name) return []; 
            name = name.toString();
    
            let characters = await CharacterProvider.getCharacters();
            
            console.log(characters);
    
            const CharactersSearch = characters.filter(char => 
                char.name.toLowerCase().includes(name.toLowerCase())
            );
    
            return CharactersSearch;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    
    
    
}