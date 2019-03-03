import { User } from './models/user.js';

function main() {
    console.log(User.getUsers());
    (User.getUsers().length === 0) ? User.setMocksUser() : "";
    var connexionButton = document.getElementById("submit");
    connexionButton.onclick = connexion;
}

function connexion() {
    let UserArray = User.getUsers();
    let reconnu = false;
    let valide = false;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let user;

    UserArray.forEach(function (element) {
        if (username === element.username) {
            reconnu = true;
            if (password === element.password) {
                valide = true;
                user = element;
            }
        }
    });

    if (!reconnu) {
        document.getElementById("info").textContent = "Identifiants inconnus";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        return;
    }

    if (!valide) {
        document.getElementById("info").textContent = "Mauvais mot de passe";
        document.getElementById("password").value = "";
        return;
    }

    document.getElementById("info").textContent = "Vous êtes identifié";
    User.setLoggedUser(user);
    document.location.href = "index.html";

}

function mainInscription() {
    var inscriptionButton = document.getElementById("submit");
    inscriptionButton.onclick = inscription;
}

function inscription() {
    let UserArray = User.getUsers();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirm = document.getElementById("password-confirm").value;
    let reconnu = false;
    let valide = false;

    UserArray.forEach(function (element) {
        if (username === element.username) {
            reconnu = true;
        }
    });

    if (password === confirm){
        valide = true;
    }

    if (reconnu) {
        document.getElementById("info").textContent = "Veuillez choisir un autre identifiant";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        document.getElementById("password-confirm").value = "";
        return;
    }

    if (!valide){
        document.getElementById("info").textContent = "Les deux mots de passes sont différents";
        document.getElementById("password").value = "";
        return;
    }

    let inscrit = new User(username, password);
    User.addUser(inscrit);
    document.getElementById("info").textContent = "Vous êtes bien inscrit et identifié";
    User.setLoggedUser(inscrit);
    document.location.href = "index.html";
}


window.onload = function () {
    if (window.document.title === "Connexion") main();
    else if (window.document.title === "Inscription") {
        mainInscription();
    }
};