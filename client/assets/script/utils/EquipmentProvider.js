import { ENDPOINT } from "../config.js";
export default class EquipmentProvider{
    
    // Get ALL
    static getEquipement = async () => {
        // console.log(`${ENDPOINT}equipement`);
        try {
            const response = await fetch(`${ENDPOINT}equipement`);
            if (!response.ok) throw new Error("Erreur lors de la récupération des équipements");
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    };


    // Get by id
    static getHeadsById = async (id) => {
        const equipement = await EquipmentProvider.getEquipement();
    
        // console.log( equipement.head.find(head => head.id === id));
        return equipement.head.find(head => head.id === id);
    };        

    
    static getTorsoById = async (id) => {
        const equipement = await EquipmentProvider.getEquipement();
    
        return equipement.torso.find(head => head.id === id);
    };      
    
    static getPantsById = async (id) => {
        const equipement = await EquipmentProvider.getEquipement();
    
        return equipement.pants.find(head => head.id === id);
    };      
    
    static getShoesById = async (id) => {
        const equipement = await EquipmentProvider.getEquipement();
    
        return equipement.shoes.find(head => head.id === id);
    };      
}