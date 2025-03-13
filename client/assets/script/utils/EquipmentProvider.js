export default class EquipmentProvider{
    static async getHeads() {
        return [
            { "id": 1, "name": "head1", "img": "casque.png", "strength": 10, "stamina": 0, "agility": -2 }
        ];
    }

    static async getTorso() {
        return [
            { "id": 1, "name": "torso1", "img": "../assets/img/haut.png", "strength": 10, "stamina": 0, "agility": -2 },
            { "id": 1, "name": "torso1", "img": "../assets/img/haut2.png", "strength": 10, "stamina": 0, "agility": -2 },
            { "id": 1, "name": "torso1", "img": "../assets/img/haut3.png", "strength": 10, "stamina": 0, "agility": -2 },
            { "id": 1, "name": "torso1", "img": "../assets/img/haut4.png", "strength": 10, "stamina": 0, "agility": -2 },
            { "id": 1, "name": "torso1", "img": "../assets/img/haut5.png", "strength": 10, "stamina": 0, "agility": -2 },
            { "id": 1, "name": "torso1", "img": "../assets/img/haut6.png", "strength": 10, "stamina": 0, "agility": -2 },
            { "id": 1, "name": "torso1", "img": "../assets/img/haut7.png", "strength": 10, "stamina": 0, "agility": -2 }
        ];
    }

    static async getPants() {
        return [
            { "id": 1, "name": "pants1", "img": "../assets/img/bas.png", "strength": -3, "stamina": -7, "agility": -2 },
            { "id": 1, "name": "pants1", "img": "../assets/img/bas2.png", "strength": 20, "stamina": 12, "agility": -2 },
            { "id": 1, "name": "pants1", "img": "../assets/img/bas3.png", "strength": 8, "stamina": 20, "agility": -2 },
            { "id": 1, "name": "pants1", "img": "../assets/img/bas4.png", "strength": 12, "stamina": 10, "agility": -2 },
            { "id": 1, "name": "pants1", "img": "../assets/img/bas5.png", "strength": 3, "stamina": -10, "agility": -2 }

        ];
    }

    static async getShoes() {
        return [
            { "id": 1, "name": "shoes1", "img": "../assets/img/basbas.png", "strength": 10, "stamina": 0, "agility": -2 }
        ];
    }
}