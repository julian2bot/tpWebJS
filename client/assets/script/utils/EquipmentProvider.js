import { Torso, Head, Pants, Shoes } from "./Equipments.js";
import { ENDPOINT   } from "../config.js";

export default class EquipmentProvider{
    
    // static async getHeads() {
    //     return [
    //         new Head("haut1", "casque.png", 10, 0, -2),
    //         new Head("haut2", "casque2.png", -3, 7, -2),
    //         new Head("haut3", "casque3.png", 5, -6, 8),
    //     ];
    // }

    static async getTorso() {
        return [
            new Torso("haut1", "haut.png", 10, 0, -2),
            new Torso("haut2", "haut2.png", -3, 7, -2),
            new Torso("haut3", "haut3.png", 5, -6, 8),
            new Torso("haut4", "haut4.png", -9, 3, 10),
            new Torso("haut5", "haut5.png", 4, -8, -1),
            new Torso("haut6", "haut6.png", 7, 2, -5),
            new Torso("haut7", "haut7.png", -6, -3, 9),
            new Torso("haut8", "haut8.png", 10, -7, 0)
        ];
    }

    static async getPants() {
        return [
            new Pants("bas1", "bas.png", -3, 7, -2),
            new Pants("bas2", "bas2.png", -9, 3, 10),
            new Pants("bas3", "bas3.png", 7, 2, -5),
            new Pants("bas4", "bas4.png", 4, -8, -1),
            new Pants("bas5", "bas5.png", 10, -7, 0),

        ];
    }

    static async getShoes() {
        return [
            new Shoes("haut1", "basbas.png", 10, 0, -2),
            new Shoes("haut2", "haut2.png", -3, 7, -2),
            new Shoes("haut3", "haut3.png", 5, -6, 8),
        ];
    }


    static getEquipement = async () => {
        console.log(`${ENDPOINT}equipement`);
        try {
            const response = await fetch(`${ENDPOINT}equipement`);
            if (!response.ok) throw new Error("Erreur lors de la récupération des équipements");
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    };
}