import { ENDPOINT } from "../config.js";
import Listing from "../view/Listing.js";
import MesFavoris from "./MesFavoris.js";
export default class CharacterProvider {
    // Get all
    static getCharacters = async () => {
        try {
            const response = await fetch(`${ENDPOINT}characters`);
            if (!response.ok) throw new Error("Erreur lors de la récupération des équipements");
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    };


    static getSearchCharacters = async ()=>{
        let name = document.getElementById("searchCharacters").value;
        
        document.getElementById("app").innerHTML = await Listing.render(true,name);
    };

    // static getCharactersFav = async () =>{
    //     try {
    //         // const response = await fetch(`${ENDPOINT}characters`);
    //         // if (!response.ok) throw new Error("Erreur lors de la récupération des équipements");
    //         // return await response.json();
            
    //         return [

    //             { "id": "f11", "name": "perso5", "head": 1, "torso": 7, "pants": 3, "shoes": 1 },
    //             { "id": "f12", "name": "perso6", "head": 1, "torso": 8, "pants": 2, "shoes": 1 },
    //             { "id": "f12", "name": "perso6", "head": 1, "torso": 8, "pants": 2, "shoes": 1 }
    //         ]


    //     } catch (error) {
    //         console.error(error);
    //         return null;
    //     }
    // }


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
    
            const characters = await CharacterProvider.getCharacters();
            
    
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