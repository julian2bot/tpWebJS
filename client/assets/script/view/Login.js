import BaseView from './BaseView.js';
import UserManagment from '../utils/UserManagement.js';

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
        if(UserManagment.isConnected()){
            UserManagment.disconnect();
            let link = document.getElementById("login-link");
            link.textContent = "Login / Sign in";
            let textUserCo = document.getElementById("nameUser");
            textUserCo.textContent = "";
            let link_create = document.getElementById("creation-link");
            link_create.style.display = "none";
        }
        let co = document.getElementById("connect");
        if(co != undefined){
            co.addEventListener("click", function(e){
                Login.connect();
            })
        }
    }

    

    static connect(){
        let username = document.getElementById("username");
        if(username != undefined && username.value != ""){
            UserManagment.setUsername(username.value);

            let link = document.getElementById("login-link");
            let textUserCo = document.getElementById("nameUser");
            let link_create = document.getElementById("creation-link");
            
            if(UserManagment.isConnected()){
                link.textContent = "Sign out";
                textUserCo.textContent ="User : "+UserManagment.getUsername();
                link_create.style.display = "initial";
            }else{
                textUserCo.textContent =""
                link_create.style.display = "none";
            }
        }
    }

    
}