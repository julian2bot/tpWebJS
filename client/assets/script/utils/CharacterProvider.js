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

    static getCharactersByPseudo = async (pseudo) => {
        try {
            const response = await fetch(`${ENDPOINT}characters?creator=${pseudo}`);
            if (!response.ok) throw new Error("Erreur lors de la récupération des équipements");
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    };
}