export default class UserManagement{
    static isConnected(){
        console.log(localStorage.getItem("username") !== null)
        return localStorage.getItem("username") !== null;
    }

    static getUsername(){
        return localStorage.getItem("username");
    }

    static setUsername(username){
        username = username.toLowerCase();
        localStorage.setItem("username", username);
        return username;
    }

    static disconnect(){
        localStorage.removeItem("username");
    }
}