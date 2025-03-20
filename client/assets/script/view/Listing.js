import EquipmentProvider from '../utils/EquipmentProvider.js';
import CharacterProvider from "../utils/CharacterProvider.js";
import BaseView from './BaseView.js';
import UserManagement from '../utils/UserManagement.js';
import {ENDPOINT} from '../config.js'
import MesFavoris from '../utils/MesFavoris.js';
import Utils from '../utils/Utils.js';
import Note from '../utils/note.js';


export default class Listing extends BaseView{
    static page = 1;
    static maxPage = 1;
    static perPage = 10;
    static mine = false;

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
        let view = "";
        let characters = [];
        let response = null;
        let parsedId = Utils.parseListingId();
        let limitInput = document.getElementById("limitInput");

        Listing.page = parsedId.page>0 ? parsedId.page : 1;
        Listing.perPage = parsedId.perpage ?? 10;
        if(limitInput){limitInput.value = Listing.perPage;}
      
        window.CharacterProvider = CharacterProvider;
        window.MesFavoris = MesFavoris;
        
        if(!parsedId.name){
            if(Listing.mine){
                response = await CharacterProvider.getCharactersByPseudo(UserManagement.getUsername(), Listing.page, Listing.perPage);
            }
            else{
                response = await CharacterProvider.getCharacters(Listing.page, Listing.perPage);
            }
            characters = response.data;
            Listing.maxPage = response.last ?? Listing.page+4;
        }
        else{
            characters = await CharacterProvider.getSearchCharactersbyName(parsedId.name ?? "", Listing.page, Listing.perPage);
        }


        for (let character of characters) {

            await Listing.updateEquipments(character.head, character.torso, character.pants, character.shoes);

            view += `<div class="card" id=${character.id}>
            <button id="heart-${character.id}" class="hearts ${MesFavoris.estFavoris(character.id)}" onclick="MesFavoris.updateFavorites('${character.id}')">♥</button>
            <h3>${character.name}</h3>
            <h4 class="creator" ${Listing.mine ? "style='display:none;'" : ""}>By : ${character.creator}</h4>
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
        window.Utils = Utils;
        let view = `<style>main{ margin-top:6rem}</style>

            
            <div class="seachBar">
                <input type="text"  class="inputRecherche" id="searchCharacters">
                
                <button onclick="CharacterProvider.getSearchCharacters()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 21L14.9497 14.9497M14.9497 14.9497C16.2165 13.683 17 11.933 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C11.933 17 13.683 16.2165 14.9497 14.9497Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </button>
                <button onclick="const updatedId = Utils.updateListingId(name='_'); window.location.href = '#/listing/' + updatedId;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.87 10.5046L10.8204 12.4504L9.76045 13.511L6 9.75456L9.76045 5.99805L10.8204 7.05871L8.87 9.00456H18V18H11.9532V16.5H16.5V10.5046H8.87Z" fill="#1F2328"/>
                    </svg>        
                </button>
            </div>`;

        if(UserManagement.isConnected()){
            view += `<select id="selectListing" style="width:10%;">
            <option value="all">all</option>
            <option value="mine">mine</option>
        </select>`;
          
        }
        view += "<div id='content' style=' margin:2.2rem; margin-top:3rem; display: flex; justify-content: space-around; gap:40px; flex-wrap: wrap;'>";
        
        view+= await Listing.renderCharacters();
        
        view+='</div>';
        view += `<footer>
            <div id='pageSelector'>
            <div id='pagination'>
            ${Listing.renderPagination()}</div>
            <form id='limitSelector'>
                <input type="number" name="limitInput" id="limitInput" placeholder='Limite' value=${Listing.perPage} required>
                <button id='changeLimit'>Valider</button>
            </form>
        </footer>`;

        
        return view;
    }

    static renderPagination(){
        let pagination = `
            <ul class="pagination">
                <li class="page-item">
                    <button class="page-link" onclick="const updatedId = Utils.updateListingId('',${Listing.page-1}); window.location.href = '#/listing/' + updatedId;" ${Listing.page==1 ? "disabled" : ""}>&laquo;</button>
                </li>
                <li class="page-item">
                    <button class="page-link" onclick="const updatedId = Utils.updateListingId('',1); window.location.href = '#/listing/' + updatedId;" ${Listing.page==1 ? "disabled" : ""}>1</button>
                </li>
        `;

        if(Listing.page>3){
            pagination += `
                <li class="page-item">...</li>`;
        }
        
        let index = Listing.page-1;
        let cpt=0;
        while (index<Listing.maxPage && cpt<3) {
            if(index>1){
                pagination += `
                <li class="page-item">
                    <button class="page-link" onclick="const updatedId = Utils.updateListingId('',${index}); window.location.href = '#/listing/' + updatedId;" ${Listing.page==index ? "disabled" : ""}>${index}</button>
                </li>`;
            }
            cpt++;
            index++;
        }

        if(Listing.maxPage-Listing.page>2){
            pagination += `
                <li class="page-item">...</li>`;
        }

        if(Listing.maxPage>1){
            pagination += `
                <li class="page-item">
                    <button class="page-link" onclick="const updatedId = Utils.updateListingId('',${Listing.maxPage}); window.location.href = '#/listing/' + updatedId;" ${Listing.page>=Listing.maxPage ? "disabled" : ""}>${Listing.maxPage}</button>
                </li>`;
        }

        pagination +=
        `   
            <li class="page-item">
                <button class="page-link" onclick="const updatedId = Utils.updateListingId('',${Listing.page+1}); window.location.href = '#/listing/' + updatedId;" ${Listing.page>=Listing.maxPage ? "disabled" : ""}>&raquo;</button>
            </li>
        </ul>`;

        return pagination;
    }

    static renderPopUp(card) {
        console.log(card);
        let fondNoir = document.createElement("div");
        fondNoir.classList.add("fondnoir");
        

        let popUp = document.createElement("div");
        let upperPart = document.createElement("div");
        upperPart.innerHTML = card.innerHTML + `
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

    static async addListenerCard(){
        let cards = document.getElementsByClassName("card");
        for (const card of cards) {
            card.addEventListener("click",(event)=>{
                if(! event.target.id.startsWith('heart-')){
                    Listing.renderPopUp(card);

                    Note.noteStar(UserManagement.getUsername() , card.id)
                    Note.afficheNote(card.id);

                }
            });
        }
    }

    static async init(){
        let select = document.getElementById("selectListing");
        let content = document.getElementById("content");

        if(select != undefined){
            select.addEventListener("change", async (event)=>{
                Listing.mine = select.value=='mine';
                content.innerHTML = await Listing.renderCharacters();
                    
                Listing.addListenerCard();
            })
        }
        Listing.addListenerCard();

        let limitInput = document.getElementById("limitInput");
        let changeLimit = document.getElementById("changeLimit");
        changeLimit.addEventListener('click', async (event)=>{
            if(limitInput.value == ""){
                return;
            }
            else{
                event.preventDefault();
                let params = Utils.updateListingId("",1, limitInput.value);
                window.location.href = `#/listing/${params}`
            }
        })
    }
}