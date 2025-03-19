import EquipmentProvider from '../utils/EquipmentProvider.js';
import CharacterProvider from "../utils/CharacterProvider.js";
import BaseView from './BaseView.js';
import UserManagement from '../utils/UserManagement.js';
import {ENDPOINT} from '../config.js'

export default class Listing extends BaseView{
    static equipement = {
        heads : null,
        torso : null,
        pants : null,
        shoes : null
    };

    static async updateEquipments(heads, torso, pants, shoes){
        Listing.equipement.heads = await EquipmentProvider.getHeadsById(heads);
        Listing.equipement.torso = await EquipmentProvider.getTorsoById(torso);
        Listing.equipement.pants = await EquipmentProvider.getPantsById(pants);
        Listing.equipement.shoes = await EquipmentProvider.getShoesById(shoes);
    }

    static async renderCharacters(){
        let characters = await CharacterProvider.getCharacters();
        let view = "";
        for (let character of characters) {

            await Listing.updateEquipments(character.head, character.torso, character.pants, character.shoes);

            view += `<div class="card" id=${character.id}>
            <h3>${character.name}</h3>
            <h4 class="creator">By : ${character.creator}</h4>
            <div class="image">
                <div class="persoPreview">
                    <img src="../assets/img/perso.png">
                    <img class="imgPersoCasque" src="${ENDPOINT + Listing.equipement.heads.img}">
                    <img class="imgPersoHaut" src="${ENDPOINT + Listing.equipement.torso.img}">
                    <img class="imgPersoBas" src="${ENDPOINT + Listing.equipement.pants.img}">
                    <img class="imgPersoBasBas" src="${ENDPOINT + Listing.equipement.shoes.img}">
                </div>
            </div>
            <div class="stats">
                <div class="stat">
                    <img src="../assets/img/strength.png" class="iconCaract" alt="strength">
                    <span>${50 + Listing.equipement.heads.strength + Listing.equipement.torso.strength + Listing.equipement.pants.strength + Listing.equipement.shoes.strength}%</span>
                </div>
                <div class="stat">
                    <img src="../assets/img/stamina.png" class="iconCaract" alt="stamina">
                    <span>${50 + Listing.equipement.heads.stamina + Listing.equipement.torso.stamina + Listing.equipement.pants.stamina + Listing.equipement.shoes.stamina}%</span>
                </div>
                <div class="stat">
                    <img src="../assets/img/agility.png" class="iconCaract" alt="agility">
                    <span>${50 + Listing.equipement.heads.agility + Listing.equipement.torso.agility + Listing.equipement.pants.agility + Listing.equipement.shoes.agility}%</span>
                </div>
            </div>
        </div>
        `;
        }
        return view;
    }

    static async renderMyCharacters(){
        let characters = await CharacterProvider.getCharactersByPseudo(UserManagement.getUsername());
        let view = "";
        for (let character of characters) {

            await Listing.updateEquipments(character.head, character.torso, character.pants, character.shoes);

            view += `<div class="card cardSelf" id=${character.id}>
            <h3>${character.name}</h3>
            <h4 class="creator" style='display:none;'>By : ${character.creator}</h4>
            <div class="image">
                <div class="persoPreview">
                    <img src="../assets/img/perso.png">
                    <img class="imgPersoCasque" src="${ENDPOINT + Listing.equipement.heads.img}">
                    <img class="imgPersoHaut" src="${ENDPOINT + Listing.equipement.torso.img}">
                    <img class="imgPersoBas" src="${ENDPOINT + Listing.equipement.pants.img}">
                    <img class="imgPersoBasBas" src="${ENDPOINT + Listing.equipement.shoes.img}">
                </div>
            </div>
            <div class="stats">
                <div class="stat">
                    <img src="../assets/img/strength.png" class="iconCaract" alt="strength">
                    <span>${50 + Listing.equipement.heads.strength + Listing.equipement.torso.strength + Listing.equipement.pants.strength + Listing.equipement.shoes.strength}%</span>
                </div>
                <div class="stat">
                    <img src="../assets/img/stamina.png" class="iconCaract" alt="stamina">
                    <span>${50 + Listing.equipement.heads.stamina + Listing.equipement.torso.stamina + Listing.equipement.pants.stamina + Listing.equipement.shoes.stamina}%</span>
                </div>
                <div class="stat">
                    <img src="../assets/img/agility.png" class="iconCaract" alt="agility">
                    <span>${50 + Listing.equipement.heads.agility + Listing.equipement.torso.agility + Listing.equipement.pants.agility + Listing.equipement.shoes.agility}%</span>
                </div>
            </div>
        </div>
        `;
        }
        return view;
    }


    static async render(){
        let view = `<style>main{ margin-top:3rem; display:flex; flex-direction:column; justify-content:center; align-items:center;}</style>`
        if(UserManagement.isConnected()){
            view += `<select id="selectListing" style="width:10%;">
            <option value="all">all</option>
            <option value="mine">mine</option>
        </select>`;
        }
        view += "<div id='content' style=' margin-top:3rem; display: flex; justify-content: space-around; gap:40px; flex-wrap: wrap;'>";
        
        view+= await Listing.renderCharacters();
        
        view+'</div>';
        return view;
    }

    static renderPopUp(card) {
        console.log(card);
        let fondNoir = document.createElement("div");
        fondNoir.classList.add("fondnoir");
        

        let popUp = document.createElement("div");
        let upperPart = document.createElement("div");
        upperPart.innerHTML = card.innerHTML;
        popUp.appendChild(upperPart);
        popUp.classList.add("pop-up-listing");

        let boutons = document.createElement("div");
        let boutonQuit = document.createElement("button");
        boutonQuit.textContent="Quit";
        boutons.appendChild(boutonQuit);
        boutons.classList.add("boutonsPopUp");

        if(UserManagement.isConnected()){
            let boutonModif = document.createElement("button");

            if(card.getElementsByClassName("creator")[0].textContent.split(" : ")[1] == UserManagement.getUsername()){
                boutonModif.textContent="Modifier";
            }
            else{
                boutonModif.textContent="Copier (Oh le plagiat)";
            }

            boutonModif.onclick = ()=>{
                window.location.href = `/#/detail/${card.id}`;
            }
            
            boutons.appendChild(boutonModif);
        }


        


        popUp.appendChild(boutons);

        document.getElementById("app").appendChild(fondNoir);
        document.getElementById("app").appendChild(popUp);

        boutonQuit.onclick = ()=>{
            document.getElementById("app").removeChild(fondNoir);
            document.getElementById("app").removeChild(popUp);
        }
    }

    static addListenerCard(){
        let cards = document.getElementsByClassName("card");
        for (const card of cards) {
            card.addEventListener("click",(event)=>{
                Listing.renderPopUp(card);
            });
        }

    }

    static async init(){
        let select = document.getElementById("selectListing");
        if(select != undefined){
            let content = document.getElementById("content");
            select.addEventListener("change", async (event)=>{
                switch(select.value){
                    case 'mine':
                        content.innerHTML = await Listing.renderMyCharacters();
                        break;
                    
                    default: // all
                        content.innerHTML = await Listing.renderCharacters();
                        break;
                }
                Listing.addListenerCard();
            })
        }
        Listing.addListenerCard();
    }
}