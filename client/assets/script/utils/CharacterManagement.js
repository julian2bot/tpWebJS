import { ENDPOINT } from "../config.js";

// Gere les Personnages crea/modification ainsi que suppression 
export default class CharacterManagement{

    // Update ou creer un personnage
    static async createOrUpdateCharacter(name, idHead, idTorso, idPants, idShoes, creator, characterId=undefined){
        let url = characterId ? `${ENDPOINT}characters/${characterId}` : `${ENDPOINT}characters`;
        let method = characterId ? "PUT" : "POST";

        return fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: method,
            body: JSON.stringify(
                {
                    name:name,
                    head: idHead,
                    torso:idTorso,
                    pants:idPants,
                    shoes:idShoes,
                    creator:creator,
                })
        })
        .then(res => {
            console.log('Save Success : ', res);
            return res.ok;
        })
        .catch(res => { console.log(res); return false;});
    }

    // Supprime un personnage
    static async deleteCharacter(id){
        return fetch(`${ENDPOINT}characters/${id}`, {
            method: "DELETE",
        })
        .then(res => {
            console.log('Delete Success : ', res);
            return res.ok;
        })
        .catch(res => { console.log(res); return false;});
    }
}