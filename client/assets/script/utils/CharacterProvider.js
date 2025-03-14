import { ENDPOINT } from "../config.js";
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



    static getCharactersFav = async () =>{
        try {
            // const response = await fetch(`${ENDPOINT}characters`);
            // if (!response.ok) throw new Error("Erreur lors de la récupération des équipements");
            // return await response.json();
            
            return [

                { "id": 11, "name": "perso5", "head": 1, "torso": 7, "pants": 3, "shoes": 1 },
                { "id": 12, "name": "perso6", "head": 1, "torso": 8, "pants": 2, "shoes": 1 },
                { "id": 12, "name": "perso6", "head": 1, "torso": 8, "pants": 2, "shoes": 1 }
            ]


        } catch (error) {
            console.error(error);
            return null;
        }
    }
}