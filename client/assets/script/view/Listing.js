import CharacterProvider from "../utils/CharacterProvider.js";
import BaseView from './BaseView.js';
import UserManagement from '../utils/UserManagement.js';
import MesFavoris from '../utils/MesFavoris.js';
import Utils from '../utils/Utils.js';
import Character from './Character.js';

// Page de base permettant de lister plusieurs personnages
export default class Listing extends BaseView{
    static page = 1;
    static maxPage = 1;
    static perPage = 10;
    static mine = false;

    // Render les personnages sur le milieux de la page en fonction des paramètres static et de l'url
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
            characters = await CharacterProvider.getSearchCharactersbyName(parsedId.name ?? "", Listing.mine);
        }


        for (let character of characters) {
            view+= await Character.renderCharacter(character, Listing.mine);
        }
        return view;
    }

    static async render(){
        window.Utils = Utils;
        window.Listing = Listing;
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

        // Afficher la combobox si on est connecté
        if(UserManagement.isConnected()){
            view += `<select id="selectListing" style="width:10%;">
            <option value="all" >Tous</option>
            <option value="mine" ${Listing.mine ? "selected" : ""}>Les miens</option>
        </select>`;
          
        }
        view += "<div id='content' style=' margin:2.2rem; margin-top:8rem; display: flex; justify-content: space-around; gap:40px; flex-wrap: wrap;'>";
        
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

    // Render le footer de la page
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

    static async init(){
        let select = document.getElementById("selectListing");
        let content = document.getElementById("content");

        if(select != undefined){
            select.addEventListener("change", async (event)=>{
                Listing.mine = select.value=='mine';
                content.innerHTML = await Listing.renderCharacters();
                    
                Character.addListenerCard();
            })
        }
        Character.addListenerCard();

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