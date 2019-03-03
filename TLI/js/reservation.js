import { Customer } from './models/Customer.js';
import { Order } from './models/Order.js';
import { Voyage } from './Voyage.js';

// Formulaire
var formIsValid = false;

// Détails du voyage
var voyageTitle;
var voyagePrice;

// Nom
var champName;
var nameIsValid = false;

// Prenom
var champFirstName;
var firstNameIsValid = false;

// Email
var champEmail;
var emailIsValid = false;

// Numéro
var champPhoneNumber;

// Dates du séjour
var champDepart;
var champRetour;
var dateAreValid = false;

// Nombre d'adultes
var champAdultNumber;
var adultNumberIsValid = false;

// Nombre d'enfants
var champChildNumber;
var childNumberIsValid = false;

// petit-dej
var champBreakfast;

// demande spécial
var champDemande;

// Bouton submit
var submitBtn;

// Voyage selectionné
var selectedVoyage;
var champTotalPrice;

window.onload = function () {
    main();
};

function main() {

    champName = document.getElementById('name');
    champFirstName = document.getElementById('firstName');
    champEmail = document.getElementById('email');
    champPhoneNumber = document.getElementById('phoneNumber');
    champDepart = document.getElementById('depart');
    champRetour = document.getElementById('retour');
    champAdultNumber = document.getElementById('adultNumber');
    champChildNumber = document.getElementById('childNumber');
    champBreakfast = document.getElementById('breakfast');
    champDemande = document.getElementById('demande');

    champTotalPrice = document.getElementById('totalPrice');

    submitBtn = document.getElementById('submit');
    voyageTitle = document.getElementById("voyageTitle");
    voyagePrice = document.getElementById("voyagePrice");


    // On récupère l'id du voyage selectioné dans l'url
    let voyageId = new URLSearchParams(window.location.search).get("voyageId");
    if (voyageId === null) voyageId = 0;
    let voyageArray = Voyage.getVoyageArray();

    selectedVoyage = voyageArray[voyageId];

    // On met à jour les informations sur la page concernant le voyage selectioné
    voyageTitle.innerHTML = "Voyage selectionné: " + selectedVoyage.title;
    voyagePrice.innerHTML = "Prix par jour par adulte: " + selectedVoyage.price;

    champName.onchange = () => {
        champName.classList.remove("valid");
        champName.classList.remove("invalid");
        // Regex alphanumeric
        nameIsValid = champName.value.match(/^[a-zA-Z]+$/) !== null;
        nameIsValid ? champName.classList.add("valid") : champName.classList.add("invalid");
        testFormValidity();
    }

    champFirstName.onchange = () => {
        champFirstName.classList.remove("valid");
        champFirstName.classList.remove("invalid");
        // Regex alphanumeric
        firstNameIsValid = champFirstName.value.match(/^[a-zA-Z]+$/) !== null;
        firstNameIsValid ? champFirstName.classList.add("valid") : champFirstName.classList.add("invalid");
        testFormValidity();
    }

    champEmail.onchange = () => {
        champEmail.classList.remove("valid");
        champEmail.classList.remove("invalid");
        // Regex de validation email simplifié
        emailIsValid = champEmail.value.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z]+$/) !== null;
        emailIsValid ? champEmail.classList.add("valid") : champEmail.classList.add("invalid");
        testFormValidity();
    }

    champDepart.onchange = () => {
        champDepart.classList.remove("valid");
        champDepart.classList.remove("invalid");
        testDepartRetourValidity();
        dateAreValid ? champDepart.classList.add("valid") : champDepart.classList.add("invalid");
        testFormValidity();
    }

    champRetour.onchange = () => {
        champDepart.dispatchEvent(new Event("change"))
        champRetour.classList.remove("valid");
        champRetour.classList.remove("invalid");
        testDepartRetourValidity();
        dateAreValid ? champRetour.classList.add("valid") : champRetour.classList.add("invalid");
        testFormValidity();
    }

    champAdultNumber.onchange = () => {
        champAdultNumber.classList.remove("valid");
        champAdultNumber.classList.remove("invalid");
        let adultCount = champAdultNumber.value;
        adultNumberIsValid = (adultCount != "" && adultCount > 0)
        adultNumberIsValid ? champAdultNumber.classList.add("valid") : champAdultNumber.classList.add("invalid");
        testFormValidity();
    }

    champChildNumber.onchange = () => {
        champChildNumber.classList.remove("valid");
        champChildNumber.classList.remove("invalid");
        let childCount = champChildNumber.value;
        childNumberIsValid = (childCount != "")
        childNumberIsValid ? champChildNumber.classList.add("valid") : champChildNumber.classList.add("invalid");
        testFormValidity();
    }

    submitBtn.onclick = function () {
        if(formIsValid) submitForm();
    }

    champBreakfast.onchange = testFormValidity;

    // On provoque une vérification au chargement au cas ou le navigateur pré-rempli des champs
    emitChangeOnFormElement()
}

// Test la date de départ et de retour
function testDepartRetourValidity() {
    dateAreValid = false;

    if (champDepart.value === "" || champRetour.value === "") {
        //Un des deux date n'a pas été saisie
        return;
    }

    let dateDepart = new Date(champDepart.value);
    let dateRetour = new Date(champRetour.value);

    if (dateDepart < new Date()) {
        //La date de départ est dans le passé
        return;
    }

    
    if (dateDepart > dateRetour) {
        // La date de départ est après la date de retour
        return;
    }

    if(differenceBetweenTwoDateInDays(dateDepart, dateRetour)==0){
        return;
    }

    dateAreValid = true;
}

function testFormValidity() {
    formIsValid = nameIsValid && firstNameIsValid && emailIsValid && adultNumberIsValid && childNumberIsValid && dateAreValid;

    submitBtn.disabled = !formIsValid;


    if(formIsValid){

        var dateDepart = new Date(champDepart.value);
        var dateRetour = new Date(champRetour.value);

        var adultNumber = champAdultNumber.value;
        var childNumber = champChildNumber.value;
        var breakfast = champBreakfast.checked;
    
        var days = differenceBetweenTwoDateInDays(dateDepart, dateRetour);
        var totalPrice = selectedVoyage.getTotalPrice(days, adultNumber, childNumber, breakfast);

        champTotalPrice.innerHTML = "Prix total: "+totalPrice;
    } else {
        champTotalPrice.innerHTML = "";
    }

}



function emitChangeOnFormElement() {
    // On provoque l'emission d'un event change manuellement sur certains champs
    // C'est utilise en cas de rechargement de page si le navigateur prérempli des champs
    let eventChange = new Event("change");
    champFirstName.dispatchEvent(eventChange);
    champName.dispatchEvent(eventChange);
    champDepart.dispatchEvent(eventChange);
    champRetour.dispatchEvent(eventChange);
    champAdultNumber.dispatchEvent(eventChange);
    champChildNumber.dispatchEvent(eventChange);
    champEmail.dispatchEvent(eventChange);
}

function submitForm(){

    let name = champName.value;
    let firstName = champFirstName.value;
    let email = champEmail.value;
    let phone = champPhoneNumber.value;

    let customer = new Customer(name, firstName, email, phone);

    var dateDepart = new Date(champDepart.value);
    var dateRetour = new Date(champRetour.value);
    var adultNumber = champAdultNumber.value;
    var childNumber = champChildNumber.value;
    var breakfast = champBreakfast.checked;

    var voyage = selectedVoyage;
    var days = differenceBetweenTwoDateInDays(dateDepart, dateRetour);
    var totalPrice = selectedVoyage.getTotalPrice(days, adultNumber, childNumber, breakfast);

    var request = champDemande.value;

    var order = new Order(voyage, customer, dateDepart, dateRetour, adultNumber, childNumber, breakfast, request, totalPrice);

    Order.addOrder(order);

    location.href = "recap.html";

}