import BaseView from './BaseView.js';
import UserManagement from '../utils/UserManagement.js';

// Class pour afficher le login
export default class Login extends BaseView{
    static async render(){
        let view = '<style>main{display: flex; justify-content: center;}</style>';

        view += `
        <div id="login">
            <h2>Connexion</h2>
            <form action="#/listing">
                <input id="username" type="text" placeholder="Michel" required>
                <button class="button" id="connect">Se connecter</button>
            </form>
        </div>
        `;
        return view;
    }

    static async init(){
        if(UserManagement.isConnected()){
            UserManagement.disconnect();
            let link = document.getElementById("login-link");
            link.textContent = "Connexion";
            let textUserCo = document.getElementById("nameUser");
            textUserCo.textContent = "";
            let link_create = document.getElementById("creation-link");
            link_create.style.display = "none";
        }
        let co = document.getElementById("connect");
        if(co != undefined){
            co.addEventListener("click", function(e){
                let input = document.getElementById("username");
                if(input!=undefined && input.value!="")
                    UserManagement.connect(input.value);
            })
        }
    }
}