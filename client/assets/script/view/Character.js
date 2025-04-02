import CharacterManagement from '../utils/CharacterManagement.js';
import UserManagement from '../utils/UserManagement.js';
import MesFavoris from '../utils/MesFavoris.js';
import EquipmentProvider from '../utils/EquipmentProvider.js';
import Note from '../utils/note.js';
import { ENDPOINT } from '../config.js';

// Class permetant les différents affichages de personnages
export default class Character{
    static equipement = {
        heads : null,
        torso : null,
        pants : null,
        shoes : null
    };

    // Met a jout les équipements en fonction des ids
    static async updateEquipments(heads, torso, pants, shoes){
        Character.equipement.heads = await EquipmentProvider.getHeadsById(heads);
        Character.equipement.torso = await EquipmentProvider.getTorsoById(torso);
        Character.equipement.pants = await EquipmentProvider.getPantsById(pants);
        Character.equipement.shoes = await EquipmentProvider.getShoesById(shoes);
    }

    // Render une Pop Up via la carte d'un personnage
    static async renderPopUp(card, mine=false){
        console.log(card);
        let fondNoir = document.createElement("div");
        fondNoir.classList.add("fondnoir");
    
        let popUp = document.createElement("div");
        let upperPart = document.createElement("div");
        upperPart.innerHTML = card.innerHTML + `
            <style>body{overflow:hidden;}</style>
            <div class="containerStar">
                <div>
                    <h2 class="noteMoyenne">Note Moyenne</h2>
                    <p class="noteMoyenne" id="characterNote-${card.id}" >../4</p>
                    
                </div>
                <h2 class="noteMoyenne">Ma Note</h2>
                <div class="stars" id="character-${card.id}">
                    <input type="hidden" name="nbEtoile" value='-1'>
                    
                    <a href="#lanote=5" class="star stargrey" ><i data-index="5">★</i></a>
                    <a href="#lanote=4" class="star stargrey" ><i data-index="4">★</i></a>
                    <a href="#lanote=3" class="star stargrey" ><i data-index="3">★</i></a>
                    <a href="#lanote=2" class="star stargrey" ><i data-index="2">★</i></a>
                    <a href="#lanote=1" class="star stargrey" ><i data-index="1">★</i></a>
                </div>
            </div>`;
    
        popUp.appendChild(upperPart);
        popUp.classList.add("pop-up-listing");
    
        let boutons = document.createElement("div");
        let boutonQuit = document.createElement("button");
        boutonQuit.textContent="Quitter";
        boutons.appendChild(boutonQuit);
        boutons.classList.add("boutonsPopUp");
    
        if(UserManagement.isConnected()){
            let boutonModif = document.createElement("button");
    
            if(card.getElementsByClassName("creator")[0].textContent.split(" : ")[1] == UserManagement.getUsername()){
                boutonModif.textContent="Modifier";
                boutons.appendChild(boutonModif);
                let boutonSupp = document.createElement("button");
                boutonSupp.textContent = "Supprimer";
                boutonSupp.classList.add("buttonSupp");
                boutonSupp.addEventListener('click', async (event)=>{
                    let succes = await CharacterManagement.deleteCharacter(card.id);
                    console.log(succes);
                    if(succes){
                        document.getElementById("app").removeChild(fondNoir);
                        document.getElementById("app").removeChild(popUp);
                        card.remove();
                    }
                    showPopUp(succes ? "Personnage supprimé avec succès" : "Suppression impossible", succes);
                })
                boutons.appendChild(boutonSupp);
            }
            else{
                boutonModif.textContent="Copier (Oh le plagiat)";
                boutons.appendChild(boutonModif);
            }
    
            boutonModif.onclick = ()=>{
                window.location.href = `/#/detail/${card.id}`;
            }
            
        }
    
        popUp.appendChild(boutons);
    
        document.getElementById("app").appendChild(fondNoir);
        document.getElementById("app").appendChild(popUp);
    
        boutonQuit.onclick = ()=>{
            document.getElementById("app").removeChild(fondNoir);
            document.getElementById("app").removeChild(popUp);
        }
    
        let divContainer =  document.createElement("div");
        let d = document.createElement("div");
        d.innerHTML = await Character.renderOtherCharacters(card.getElementsByClassName("creator")[0].textContent.split(" : ")[1], card.id, mine);
        d.id = "otherCharacters";
        for (const element of d.children) {
            element.addEventListener("click", (event)=>{
                document.getElementById("app").removeChild(fondNoir);
                document.getElementById("app").removeChild(popUp);
                Character.renderPopUp(element.getElementsByClassName("card")[0]);
            });
        }
        let texte = document.createElement("h4");
        texte.textContent = `Personnage aussi fait par : ${card.getElementsByClassName("creator")[0].textContent.split(" : ")[1]}`;
        divContainer.appendChild(texte);
        divContainer.style.height = "70vh";
        divContainer.appendChild(d);
        document.getElementsByClassName("containerStar")[0].appendChild(divContainer);
    }

    // Render une carte de personnage
    static async renderCharacter(character, mine=false, estFavoris=false){
        await Character.updateEquipments(character.head, character.torso, character.pants, character.shoes);

        return `
        <div class="card" id=${character.id}>
            <button id="heart-${character.id}" class="hearts ${MesFavoris.estFavoris(character.id)}" onclick="MesFavoris.updateFavorites('${character.id}', ${estFavoris})">♥</button>
            <h3>${character.name}</h3>
            <h4 class="creator" ${mine ? "style='display:none;'" : ""}>Par : ${character.creator}</h4>
            <div class="image">
                <div class="persoPreview">
                    <img src="../assets/img/perso.png">
                    <img class="imgPersoCasque" src="${ENDPOINT + Character.equipement.heads.img}">
                    <img class="imgPersoHaut" src="${ENDPOINT + Character.equipement.torso.img}">
                    <img class="imgPersoBas" src="${ENDPOINT + Character.equipement.pants.img}">
                    <img class="imgPersoBasBas" src="${ENDPOINT + Character.equipement.shoes.img}">
                </div>
            </div>
            <div class="stats">
                <div class="stat">
                    <img src="../assets/img/strength.png" class="iconCaract" alt="strength">
                    <span>${50 + Character.equipement.heads.strength + Character.equipement.torso.strength + Character.equipement.pants.strength + Character.equipement.shoes.strength}%</span>
                </div>
                <div class="stat">
                    <img src="../assets/img/stamina.png" class="iconCaract" alt="stamina">
                    <span>${50 + Character.equipement.heads.stamina + Character.equipement.torso.stamina + Character.equipement.pants.stamina + Character.equipement.shoes.stamina}%</span>
                </div>
                <div class="stat">
                    <img src="../assets/img/agility.png" class="iconCaract" alt="agility">
                    <span>${50 + Character.equipement.heads.agility + Character.equipement.torso.agility + Character.equipement.pants.agility + Character.equipement.shoes.agility}%</span>
                </div>
            </div>
        </div>`;
    }

    // Render une carte de personnage (version petite, sans les détails)
    static async renderLittleCharacter(character, mine=false){
        await Character.updateEquipments(character.head, character.torso, character.pants, character.shoes);
        return `
                <div class="littleCard">
                    <div class="card" id=${character.id}>
                        <button id="heart-${character.id}" class="hearts ${MesFavoris.estFavoris(character.id)}" onclick="MesFavoris.updateFavorites('${character.id}')">♥</button>
                        <h3>${character.name}</h3>
                        <h4 class="creator" ${mine ? "style='display:none;'" : ""}>Par : ${character.creator}</h4>
                        <div class="image">
                            <div class="persoPreview">
                                <img src="../assets/img/perso.png">
                                <img class="imgPersoCasque" src="${ENDPOINT + Character.equipement.heads.img}">
                                <img class="imgPersoHaut" src="${ENDPOINT + Character.equipement.torso.img}">
                                <img class="imgPersoBas" src="${ENDPOINT + Character.equipement.pants.img}">
                                <img class="imgPersoBasBas" src="${ENDPOINT + Character.equipement.shoes.img}">
                            </div>
                        </div>
                        <div class="stats">
                            <div class="stat">
                                <img src="../assets/img/strength.png" class="iconCaract" alt="strength">
                                <span>${50 + Character.equipement.heads.strength + Character.equipement.torso.strength + Character.equipement.pants.strength + Character.equipement.shoes.strength}%</span>
                            </div>
                            <div class="stat">
                                <img src="../assets/img/stamina.png" class="iconCaract" alt="stamina">
                                <span>${50 + Character.equipement.heads.stamina + Character.equipement.torso.stamina + Character.equipement.pants.stamina + Character.equipement.shoes.stamina}%</span>
                            </div>
                            <div class="stat">
                                <img src="../assets/img/agility.png" class="iconCaract" alt="agility">
                                <span>${50 + Character.equipement.heads.agility + Character.equipement.torso.agility + Character.equipement.pants.agility + Character.equipement.shoes.agility}%</span>
                            </div>
                        </div>
                    </div>
                    <h3>${character.name}</h3>
                    <div class="imageLittle">
                        <div class="persoPreview">
                            <img src="../assets/img/perso.png">
                            <img class="imgPersoCasque" src="${ENDPOINT + Character.equipement.heads.img}">
                            <img class="imgPersoHaut" src="${ENDPOINT + Character.equipement.torso.img}">
                            <img class="imgPersoBas" src="${ENDPOINT + Character.equipement.pants.img}">
                            <img class="imgPersoBasBas" src="${ENDPOINT + Character.equipement.shoes.img}">
                        </div>
                    </div>
                </div>`;
    }

    // Render une liste de petites cartes via le pseudo du createur et l'id du personnage a ne pas afficher (Utilisé dans la pop up)
    static async renderOtherCharacters(username, charid, mine=false){
            let characters = await CharacterProvider.getCharactersByPseudoOthers(username, charid);
            let view = "";
            for(let character of characters){
                view += await Character.renderLittleCharacter(character, mine);
            }
            return view;
    }

    // Ajoute un listenner aux cartes de perso permettant d'afficher une pop up
    static async addListenerCard(){
        let cards = document.getElementsByClassName("card");
        for (const card of cards) {
            card.addEventListener("click",(event)=>{
                if(! event.target.id.startsWith('heart-')){
                    Character.renderPopUp(card, Listing.mine);
                    Note.noteStar(UserManagement.getUsername() , card.id)
                    Note.afficheNote(card.id);
                }
            });
        }
    }
}

