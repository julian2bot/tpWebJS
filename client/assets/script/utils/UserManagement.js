// Class gérant la connexion et la déconnxion d'un utilisateur
export default class UserManagement{
    // Renvoie un booléens pour savoir si un utilisateur est connecté
    static isConnected(){
        console.log(localStorage.getItem("username") !== null)
        return localStorage.getItem("username") !== null;
    }

    // Renvoie le nom de l'user connecté (Local Storage)
    static getUsername(){
        return localStorage.getItem("username");
    }

    // Set le nom de l'user connecté (Local Storage)
    static setUsername(username){
        username = username.toLowerCase();
        localStorage.setItem("username", username);
        return username;
    }

    // Déconnecte un user (enlève l'item du Local Storage)
    static disconnect(){
        localStorage.removeItem("username");
    }

    // Connecte un utilisateur via un nom d'utilisateur
    static connect(username){
        if(username != undefined && username != ""){
            UserManagement.setUsername(username);

            let link = document.getElementById("login-link");
            let textUserCo = document.getElementById("nameUser");
            let link_create = document.getElementById("creation-link");
            
            if(UserManagement.isConnected()){
                link.textContent = "Déconnexion";
                textUserCo.textContent ="Utilisateur : "+ UserManagement.getUsername();
                link_create.style.display = "initial";
            }else{
                textUserCo.textContent =""
                link_create.style.display = "none";
            }
        }
    }
}