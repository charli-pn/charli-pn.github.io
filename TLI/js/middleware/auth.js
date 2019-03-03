import {User} from "../models/user.js";

function main(){
    console.log('test')
    var loggedUser = User.getLoggedUser();
    if(loggedUser== null) location.href = "connexion.html";

    var champUsername = document.getElementById("champUsername");
    champUsername.innerText = loggedUser.username;

    document.getElementById("logout").onclick = () => {
        User.setLoggedUser(null);
        location.href = "connexion.html";
    }

}

window.addEventListener("load", main);