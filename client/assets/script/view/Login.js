import BaseView from './BaseView.js';

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
        if(Login.isConnected()){
            Login.disconnect();
            let link = document.getElementById("login-link");
            link.textContent = "Login / Sign in";
            let textUserCo = document.getElementById("nameUser");
            textUserCo.textContent = "";
        }
        let co = document.getElementById("connect");
        if(co != undefined){
            co.addEventListener("click", function(e){
                Login.connect();
            })
        }
    }

    static disconnect(){
        localStorage.removeItem("username");
    }

    static connect(){
        let username = document.getElementById("username");
        if(username != undefined && username.value != ""){
            localStorage.setItem("username",username.value);
            let link = document.getElementById("login-link");
            let textUserCo = document.getElementById("nameUser");
            if(Login.isConnected()){
                link.textContent = "Sign out";
                textUserCo.textContent ="User : "+Login.getUsername();
            }else{
                textUserCo.textContent =""
            }
        }
    }

    static isConnected(){
        console.log(localStorage.getItem("username") !== null)
        return localStorage.getItem("username") !== null;
    }

    static getUsername(){
        return localStorage.getItem("username");
    }
}