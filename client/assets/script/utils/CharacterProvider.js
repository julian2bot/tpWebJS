import Character from "./Character";

export default class CharacterProvider {
    static async getCharacters(){
        return [
            new Character("perso1", 0, 0,1,0),
            new Character("perso2", 0, 1,1,0),
            new Character("perso3", 0, 0,0,0),
            new Character("perso3", 0, 3,3,0),
            new Character("perso3", 0, 2,2,0),
            new Character("perso3", 0, 1,0,0)
        ];
    }
}