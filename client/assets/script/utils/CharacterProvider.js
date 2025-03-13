export default class CharacterProvider {
    static async getCharacters(){
        return [
            { "name": "perso1", "head": 0, "torso": 0, "pants": 1, "shoes": 0 },
            { "name": "perso2", "head": 0, "torso": 1, "pants": 1, "shoes": 0 },
            { "name": "perso3", "head": 0, "torso": 0, "pants": 0, "shoes": 0 },
        ];
    }
}